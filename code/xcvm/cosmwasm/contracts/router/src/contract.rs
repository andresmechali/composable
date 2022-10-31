use crate::{
	error::ContractError,
	msg::{ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg},
	state::{Config, Interpreter, UserId, ADMIN, BRIDGES, CONFIG, INTERPRETERS},
};
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
	from_binary, to_binary, wasm_execute, Addr, Binary, CosmosMsg, Deps, DepsMut, Env, Event,
	MessageInfo, Reply, Response, StdError, StdResult, SubMsg, WasmMsg, WasmQuery,
};
use cw2::set_contract_version;
use cw20::{Cw20Contract, Cw20ExecuteMsg};
use cw_utils::ensure_from_older_version;
use cw_xcvm_asset_registry::msg::{GetAssetContractResponse, QueryMsg as AssetRegistryQueryMsg};
use cw_xcvm_interpreter::msg::{
	ExecuteMsg as InterpreterExecuteMsg, InstantiateMsg as InterpreterInstantiateMsg,
};
use xcvm_core::{Bridge, BridgeSecurity, Displayed, Funds, NetworkId};

const CONTRACT_NAME: &str = "composable:xcvm-router";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
const INSTANTIATE_REPLY_ID: u64 = 1;
const EVENT_PREFIX: &str = "xcvm.router";

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
	deps: DepsMut,
	_env: Env,
	info: MessageInfo,
	msg: InstantiateMsg,
) -> Result<Response, ContractError> {
	set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
	let registry_address = deps.api.addr_validate(&msg.registry_address)?;
	// Admin, when called by the relayer will be the relayer. And relayers,
	// will be using only the routers that are called by themselves.
	ADMIN.save(deps.storage, &info.sender)?;
	CONFIG.save(
		deps.storage,
		&Config {
			registry_address,
			relayer_address: info.sender,
			interpreter_code_id: msg.interpreter_code_id,
			network_id: msg.network_id,
		},
	)?;
	Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
	deps: DepsMut,
	env: Env,
	info: MessageInfo,
	msg: ExecuteMsg,
) -> Result<Response, ContractError> {
	match msg {
		ExecuteMsg::Run { network_id, user_id, interpreter_execute_msg, funds, bridge } =>
			handle_run(deps, env, network_id, user_id, interpreter_execute_msg, funds, bridge),
		ExecuteMsg::SetInterpreterSecurity { network_id, user_id, bridge_security } => {
			ensure_admin(deps.as_ref(), &info.sender)?;
			set_interpreter_security(deps, network_id, user_id, bridge_security)?;
			// TODO(aeryz): see if we need an event here
			Ok(Response::default())
		},
		ExecuteMsg::RegisterBridge { bridge } => {
			ensure_admin(deps.as_ref(), &info.sender)?;
			register_bridge(deps, bridge)?;
			Ok(Response::default().add_event(
				Event::new(EVENT_PREFIX)
					.add_attribute("bridge_registered", format!("{:?}", bridge)),
			))
		},
		ExecuteMsg::UnregisterBridge { bridge } => {
			ensure_admin(deps.as_ref(), &info.sender)?;
			unregister_bridge(deps, bridge);
			Ok(Response::default().add_event(
				Event::new(EVENT_PREFIX)
					.add_attribute("bridge_unregistered", format!("{:?}", bridge)),
			))
		},
	}
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(deps: DepsMut, _env: Env, _msg: MigrateMsg) -> Result<Response, ContractError> {
	let _ = ensure_from_older_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
	Ok(Response::default())
}

fn register_bridge(deps: DepsMut, bridge: Bridge) -> Result<(), ContractError> {
	BRIDGES.save(deps.storage, bridge, &()).map_err(Into::into)
}

fn unregister_bridge(deps: DepsMut, bridge: Bridge) {
	BRIDGES.remove(deps.storage, bridge)
}

fn set_interpreter_security(
	deps: DepsMut,
	network_id: NetworkId,
	user_id: UserId,
	security: BridgeSecurity,
) -> Result<(), ContractError> {
	match INTERPRETERS.load(deps.storage, (network_id.0, user_id.clone())) {
		Ok(Interpreter { address, .. }) => INTERPRETERS.save(
			deps.storage,
			(network_id.0, user_id),
			&Interpreter { address, security },
		),
		Err(_) => INTERPRETERS.save(
			deps.storage,
			(network_id.0, user_id),
			&Interpreter { address: None, security },
		),
	}
	.map_err(Into::into)
}

fn handle_run(
	deps: DepsMut,
	env: Env,
	network_id: NetworkId,
	user_id: UserId,
	interpreter_execute_msg: InterpreterExecuteMsg,
	funds: Funds<Displayed<u128>>,
	bridge: Bridge,
) -> Result<Response, ContractError> {
	match INTERPRETERS.load(deps.storage, (network_id.0, user_id.clone())) {
		Ok(Interpreter { address: Some(interpreter_address), security }) => {
			// There is already an interpreter instance, so all we do is fund the interpreter, then
			// add a callback to it
			assert_bridge_security(bridge, security)?;
			let response =
				send_funds_to_interpreter(deps.as_ref(), interpreter_address.clone(), funds)?;
			let wasm_msg = wasm_execute(interpreter_address, &interpreter_execute_msg, vec![])?;
			Ok(response.add_message(wasm_msg))
		},
		_ => {
			let Config {
				registry_address,
				relayer_address,
				interpreter_code_id,
				network_id: router_network_id,
			} = CONFIG.load(deps.storage)?;
			// There is no interpreter, so the bridge security must be at least `Deterministic`
			// or the message should be coming from a local origin
			if network_id != router_network_id {
				assert_bridge_security(bridge, BridgeSecurity::Deterministic)?;
			}
			// First, add a callback to instantiate an interpreter (which we later get the result
			// and save it)
			let instantiate_msg: CosmosMsg = WasmMsg::Instantiate {
				// router is the default admin of a contract
				admin: Some(env.contract.address.clone().into_string()),
				code_id: interpreter_code_id,
				msg: to_binary(&InterpreterInstantiateMsg {
					registry_address: registry_address.into_string(),
					relayer_address: relayer_address.into_string(),
					network_id,
					user_id: user_id.clone(),
				})?,
				funds: vec![],
				label: format!("xcvm-interpreter-{}-{}", network_id.0, hex::encode(&user_id)),
			}
			.into();

			let interpreter_instantiate_submessage =
				SubMsg::reply_on_success(instantiate_msg, INSTANTIATE_REPLY_ID);
			// Secondly, call itself again with the same parameters, so that this functions goes
			// into `Ok` state and properly executes the interpreter
			let self_call_message: CosmosMsg = wasm_execute(
				env.contract.address,
				&ExecuteMsg::Run { network_id, user_id, interpreter_execute_msg, funds, bridge },
				vec![],
			)?
			.into();
			Ok(Response::new()
				.add_submessage(interpreter_instantiate_submessage)
				.add_message(self_call_message))
		},
	}
}

fn send_funds_to_interpreter(
	deps: Deps,
	interpreter_address: Addr,
	funds: Funds<Displayed<u128>>,
) -> StdResult<Response> {
	let mut response = Response::new();
	let registry_address = CONFIG.load(deps.storage)?.registry_address.into_string();
	let interpreter_address = interpreter_address.into_string();
	for (asset_id, amount) in funds.0 {
		// We ignore zero amounts
		if amount.0 == 0 {
			continue
		}
		let query_msg = AssetRegistryQueryMsg::GetAssetContract(asset_id.into());
		let cw20_address: GetAssetContractResponse = deps.querier.query(
			&WasmQuery::Smart {
				contract_addr: registry_address.clone(),
				msg: to_binary(&query_msg)?,
			}
			.into(),
		)?;
		let contract = Cw20Contract(cw20_address.addr.clone());
		// Adding callbacks to transfer funds to the interpreter prior to execution
		response = response.add_message(contract.call(Cw20ExecuteMsg::Transfer {
			recipient: interpreter_address.clone(),
			amount: amount.0.into(),
		})?);
	}
	Ok(response)
}

fn ensure_admin(deps: Deps, addr: &Addr) -> Result<(), ContractError> {
	if ADMIN.load(deps.storage)? == *addr {
		Ok(())
	} else {
		Err(ContractError::NotAuthorized)
	}
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn reply(deps: DepsMut, _env: Env, msg: Reply) -> StdResult<Response> {
	match msg.id {
		INSTANTIATE_REPLY_ID => handle_instantiate_reply(deps, msg),
		id => Err(StdError::generic_err(format!("Unknown reply id: {}", id))),
	}
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(_deps: Deps, _env: Env, _msg: QueryMsg) -> StdResult<Binary> {
	Err(StdError::generic_err("not implemented"))
}

fn handle_instantiate_reply(deps: DepsMut, msg: Reply) -> StdResult<Response> {
	let response = msg.result.into_result().map_err(StdError::generic_err)?;
	let interpreter_address = {
		// Catch the default `instantiate` event which contains `_contract_address` attribute that
		// has the instantiated contract's address
		let instantiate_event = response
			.events
			.iter()
			.find(|event| event.ty == "instantiate")
			.ok_or(StdError::not_found("instantiate event not found"))?;
		deps.api.addr_validate(
			&instantiate_event
				.attributes
				.iter()
				.find(|attr| &attr.key == "_contract_address")
				.ok_or(StdError::not_found("_contract_address attribute not found"))?
				.value,
		)?
	};

	let router_reply = {
		// Interpreter provides `user_id, network_id` pair as an event for the router to know which
		// pair is instantiated
		let interpreter_event = response
			.events
			.iter()
			.find(|event| event.ty == "wasm-xcvm.interpreter.instantiated")
			.ok_or(StdError::not_found("interpreter event not found"))?;

		// TODO(aeryz): This heavily depends on how the interpreter formats the data. This either be
		// a decoding function and a type in the interpreter contract or an encoding function in the
		// router. But the interpreter option seems to be better because other contracts might wanna
		// use this.
		from_binary::<(u8, UserId)>(&Binary::from_base64(
			interpreter_event
				.attributes
				.iter()
				.find(|attr| &attr.key == "data")
				.ok_or(StdError::not_found("no data is returned from 'xcvm_interpreter'"))?
				.value
				.as_str(),
		)?)?
	};

	match INTERPRETERS.load(deps.storage, (router_reply.0, router_reply.1.clone())) {
		Ok(Interpreter { security, .. }) => INTERPRETERS.save(
			deps.storage,
			(router_reply.0, router_reply.1),
			&Interpreter { address: Some(interpreter_address), security },
		)?,
		Err(_) => INTERPRETERS.save(
			deps.storage,
			(router_reply.0, router_reply.1),
			&Interpreter {
				security: BridgeSecurity::Deterministic,
				address: Some(interpreter_address),
			},
		)?,
	}

	Ok(Response::new())
}

fn assert_bridge_security(
	bridge: Bridge,
	expected_security: BridgeSecurity,
) -> Result<(), ContractError> {
	if bridge.security <= expected_security {
		Ok(())
	} else {
		Err(ContractError::InsufficientBridgeSecurity(expected_security, bridge.security))
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use cosmwasm_std::{
		testing::{mock_dependencies, mock_env, mock_info, MockQuerier, MOCK_CONTRACT_ADDR},
		wasm_execute, Addr, ContractResult, QuerierResult, SystemResult,
	};
	use prost::Message;
	use proto::{XCVMInstruction, XCVMProgram};
	use xcvm_core::{Amount, AssetId, BridgeProtocol, Destination, Picasso, ETH, PICA};
	use xcvm_proto as proto;

	const CW20_ADDR: &str = "cw20addr";
	const REGISTRY_ADDR: &str = "registryaddr";
	const RELAYER_ADDR: &str = "relayeraddr";

	#[test]
	fn proper_instantiation() {
		let mut deps = mock_dependencies();

		let msg = InstantiateMsg {
			registry_address: REGISTRY_ADDR.to_string(),
			interpreter_code_id: 1,
			network_id: Picasso.into(),
		};
		let info = mock_info(RELAYER_ADDR, &vec![]);

		let res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();
		assert_eq!(0, res.messages.len());

		// Make sure that the storage is empty
		assert_eq!(
			CONFIG.load(&deps.storage).unwrap(),
			Config {
				registry_address: Addr::unchecked(REGISTRY_ADDR),
				relayer_address: Addr::unchecked(RELAYER_ADDR),
				interpreter_code_id: 1,
				network_id: Picasso.into()
			}
		);
	}

	fn wasm_querier(query: &WasmQuery) -> QuerierResult {
		match query {
			WasmQuery::Smart { contract_addr, .. } if contract_addr.as_str() == CW20_ADDR =>
				SystemResult::Ok(ContractResult::Ok(
					to_binary(&cw20::BalanceResponse { balance: 100000_u128.into() }).unwrap(),
				)),
			WasmQuery::Smart { contract_addr, .. } if contract_addr.as_str() == REGISTRY_ADDR =>
				SystemResult::Ok(ContractResult::Ok(
					to_binary(&cw_xcvm_asset_registry::msg::GetAssetContractResponse {
						addr: Addr::unchecked(CW20_ADDR),
					})
					.unwrap(),
				))
				.into(),
			_ => panic!("Unhandled query"),
		}
	}

	fn encode_protobuf(program: proto::Program) -> Vec<u8> {
		let mut buf = Vec::new();
		buf.reserve(program.encoded_len());
		program.encode(&mut buf).unwrap();
		buf
	}

	#[test]
	fn execute_run_phase1() {
		let mut deps = mock_dependencies();
		let mut querier = MockQuerier::default();
		querier.update_wasm(wasm_querier);
		deps.querier = querier;

		let info = mock_info(RELAYER_ADDR, &vec![]);
		let _ = instantiate(
			deps.as_mut(),
			mock_env(),
			info.clone(),
			InstantiateMsg {
				registry_address: REGISTRY_ADDR.into(),
				interpreter_code_id: 1,
				network_id: Picasso.into(),
			},
		)
		.unwrap();

		let program = XCVMProgram {
			tag: vec![],
			instructions: vec![XCVMInstruction::Transfer {
				to: Destination::<Vec<u8>>::Relayer,
				assets: Funds::from([
					(Into::<AssetId>::into(PICA), Amount::absolute(1)),
					(ETH.into(), Amount::absolute(2)),
				]),
			}]
			.into(),
		};

		let interpreter_execute_msg =
			InterpreterExecuteMsg::Execute { program: encode_protobuf(program.into()) };

		let funds =
			Funds::<Displayed<u128>>::from([(Into::<AssetId>::into(PICA), Displayed(1000_u128))]);

		let run_msg = ExecuteMsg::Run {
			network_id: Picasso.into(),
			user_id: vec![1],
			interpreter_execute_msg,
			funds: funds.clone(),
			bridge: Bridge {
				security: BridgeSecurity::Deterministic,
				protocol: BridgeProtocol::IBC,
			},
		};

		let res = execute(deps.as_mut(), mock_env(), info.clone(), run_msg.clone()).unwrap();

		let instantiate_msg = WasmMsg::Instantiate {
			admin: Some(MOCK_CONTRACT_ADDR.to_string()),
			code_id: 1,
			msg: to_binary(&InterpreterInstantiateMsg {
				registry_address: REGISTRY_ADDR.to_string(),
				relayer_address: RELAYER_ADDR.to_string(),
				network_id: Picasso.into(),
				user_id: vec![1],
			})
			.unwrap(),
			funds: vec![],
			label: "xcvm-interpreter-1-01".to_string(),
		};

		let execute_msg = WasmMsg::Execute {
			contract_addr: MOCK_CONTRACT_ADDR.to_string(),
			msg: to_binary(&run_msg).unwrap(),
			funds: vec![],
		};

		assert_eq!(res.messages[0].msg, instantiate_msg.into());
		assert_eq!(res.messages[1].msg, execute_msg.into());
	}

	#[test]
	fn execute_run_phase2() {
		let mut deps = mock_dependencies();
		let mut querier = MockQuerier::default();
		querier.update_wasm(wasm_querier);
		deps.querier = querier;

		let info = mock_info("sender", &vec![]);
		let _ = instantiate(
			deps.as_mut(),
			mock_env(),
			info.clone(),
			InstantiateMsg {
				registry_address: REGISTRY_ADDR.into(),
				interpreter_code_id: 1,
				network_id: Picasso.into(),
			},
		)
		.unwrap();

		INTERPRETERS
			.save(
				&mut deps.storage,
				(Into::<NetworkId>::into(Picasso).0, vec![]),
				&Interpreter {
					address: Some(Addr::unchecked("interpreter")),
					security: BridgeSecurity::Deterministic,
				},
			)
			.unwrap();

		let program = XCVMProgram {
			tag: vec![],
			instructions: vec![XCVMInstruction::Transfer {
				to: Destination::<Vec<u8>>::Relayer,
				assets: Funds::from([
					(Into::<AssetId>::into(PICA), Amount::absolute(1)),
					(ETH.into(), Amount::absolute(2)),
				]),
			}]
			.into(),
		};
		let interpreter_execute_msg =
			InterpreterExecuteMsg::Execute { program: encode_protobuf(program.into()) };

		let funds = Funds::<Displayed<u128>>::from([
			(Into::<AssetId>::into(PICA), Displayed(1000_u128)),
			(Into::<AssetId>::into(ETH), Displayed(2000_u128)),
		]);

		let run_msg = ExecuteMsg::Run {
			network_id: Picasso.into(),
			user_id: vec![],
			interpreter_execute_msg: interpreter_execute_msg.clone(),
			funds: funds.clone(),
			bridge: Bridge {
				protocol: BridgeProtocol::IBC,
				security: BridgeSecurity::Deterministic,
			},
		};

		let res = execute(deps.as_mut(), mock_env(), info.clone(), run_msg.clone()).unwrap();

		let cw20_contract = Cw20Contract(Addr::unchecked(CW20_ADDR));
		let messages = vec![
			cw20_contract
				.call(Cw20ExecuteMsg::Transfer {
					recipient: "interpreter".into(),
					amount: 1000_u128.into(),
				})
				.unwrap(),
			cw20_contract
				.call(Cw20ExecuteMsg::Transfer {
					recipient: "interpreter".into(),
					amount: 2000_u128.into(),
				})
				.unwrap(),
			wasm_execute("interpreter", &interpreter_execute_msg, vec![]).unwrap().into(),
		];

		messages.into_iter().enumerate().for_each(|(i, msg)| {
			assert_eq!(res.messages[i].msg, msg);
		})
	}
}
