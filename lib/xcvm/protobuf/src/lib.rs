#![no_std]

extern crate alloc;

mod xcvm;

use alloc::{
	collections::{BTreeMap, VecDeque},
	vec::Vec,
};
pub use prost::{DecodeError, EncodeError, Message};
use xcvm::*;
pub use xcvm_core::*;

#[derive(Clone, Debug)]
pub enum DecodingFailure {
	Protobuf(DecodeError),
	Isomorphism,
}

pub fn decode<
	TNetwork: From<u32>,
	TAbiEncoded: TryFrom<Vec<u8>>,
	TAccount: for<'a> TryFrom<&'a [u8]>,
	TAssets: From<BTreeMap<u32, xcvm_core::Amount>>,
>(
	buffer: &[u8],
) -> Result<
	XCVMProgram<VecDeque<XCVMInstruction<TNetwork, TAbiEncoded, TAccount, TAssets>>>,
	DecodingFailure,
> {
	Program::decode(buffer)
		.map_err(DecodingFailure::Protobuf)
		.and_then(|x| TryInto::try_into(x).map_err(|_| DecodingFailure::Isomorphism))
}

pub fn encode<
	TNetwork: Into<u32>,
	TAbiEncoded: Into<Vec<u8>>,
	TAccount: AsRef<[u8]>,
	TAssets: Into<BTreeMap<u32, xcvm_core::Amount>>,
>(
	program: XCVMProgram<VecDeque<XCVMInstruction<TNetwork, TAbiEncoded, TAccount, TAssets>>>,
) -> Vec<u8> {
	Program::encode_to_vec(&program.into())
}

impl From<u128> for U128 {
	fn from(x: u128) -> Self {
		U128 { encoded: x.to_le_bytes().to_vec() }
	}
}

impl TryInto<u128> for U128 {
	type Error = ();
	fn try_into(self) -> Result<u128, Self::Error> {
		Ok(u128::from_le_bytes(TryInto::<[u8; 16]>::try_into(self.encoded).map_err(|_| ())?))
	}
}

impl TryFrom<crate::xcvm::Amount> for xcvm_core::Amount {
	type Error = ();
	fn try_from(value: crate::xcvm::Amount) -> Result<Self, Self::Error> {
		match value.amount {
			Some(amount::Amount::Fixed(Fixed { amount: Some(x) })) => {
				Ok(xcvm_core::Amount::Fixed(xcvm_core::Displayed(x.try_into()?)))
			},
			Some(amount::Amount::Ratio(Ratio { value })) => Ok(xcvm_core::Amount::Ratio(value)),
			_ => Err(()),
		}
	}
}

impl From<xcvm_core::Amount> for crate::xcvm::Amount {
	fn from(amount: xcvm_core::Amount) -> Self {
		match amount {
			xcvm_core::Amount::Fixed(Displayed(x)) => crate::xcvm::Amount {
				amount: Some(amount::Amount::Fixed(crate::xcvm::Fixed { amount: Some(x.into()) })),
			},
			xcvm_core::Amount::Ratio(x) => crate::xcvm::Amount {
				amount: Some(amount::Amount::Ratio(crate::xcvm::Ratio { value: x })),
			},
		}
	}
}

impl<
		TNetwork: Into<u32>,
		TAbiEncoded: Into<Vec<u8>>,
		TAccount: AsRef<[u8]>,
		TAssets: Into<BTreeMap<u32, xcvm_core::Amount>>,
	> From<XCVMProgram<VecDeque<XCVMInstruction<TNetwork, TAbiEncoded, TAccount, TAssets>>>>
	for Program
{
	fn from(
		XCVMProgram { tag, instructions }: XCVMProgram<
			VecDeque<XCVMInstruction<TNetwork, TAbiEncoded, TAccount, TAssets>>,
		>,
	) -> Self {
		Program {
			tag: tag.unwrap_or_default(),
			instructions: Some(Instructions {
				instructions: instructions.into_iter().map(Into::<Instruction>::into).collect(),
			}),
		}
	}
}

impl<
		TNetwork: From<u32>,
		TAbiEncoded: TryFrom<Vec<u8>>,
		TAccount: for<'a> TryFrom<&'a [u8]>,
		TAssets: From<BTreeMap<u32, xcvm_core::Amount>>,
	> TryFrom<Program>
	for XCVMProgram<VecDeque<XCVMInstruction<TNetwork, TAbiEncoded, TAccount, TAssets>>>
{
	type Error = ();
	fn try_from(program: Program) -> Result<Self, Self::Error> {
		match program {
			Program { instructions: Some(Instructions { instructions }), tag } => {
				let tag = if tag.is_empty() { None } else { Some(tag) };

				Ok(XCVMProgram {
					tag,
					instructions: instructions
						.into_iter()
						.map(TryInto::<XCVMInstruction<_, _, _, _>>::try_into)
						.collect::<Result<VecDeque<_>, _>>()?,
				})
			},
			_ => Err(()),
		}
	}
}

impl<
		TNetwork: Into<u32>,
		TAbiEncoded: Into<Vec<u8>>,
		TAccount: AsRef<[u8]>,
		TAssets: Into<BTreeMap<u32, xcvm_core::Amount>>,
	> From<XCVMInstruction<TNetwork, TAbiEncoded, TAccount, TAssets>> for Instruction
{
	fn from(instruction: XCVMInstruction<TNetwork, TAbiEncoded, TAccount, TAssets>) -> Self {
		Instruction {
			instruction: Some(match instruction {
				XCVMInstruction::Transfer { to: destination, assets } => {
					instruction::Instruction::Transfer(Transfer {
						destination: Some(Account { encoded: destination.as_ref().to_vec() }),
						assets: assets
							.into()
							.into_iter()
							.map(|(asset, amount)| (asset, amount.into()))
							.collect(),
					})
				},
				XCVMInstruction::Call { encoded } => {
					instruction::Instruction::Call(Call { encoded: encoded.into() })
				},
				XCVMInstruction::Spawn { network, salt, assets, program } => {
					instruction::Instruction::Spawn(Spawn {
						network: network.into(),
						salt,
						assets: assets
							.into()
							.into_iter()
							.map(|(asset, amount)| (asset, amount.into()))
							.collect(),
						program: Some(program.into()),
					})
				},
			}),
		}
	}
}

impl<
		TNetwork: From<u32>,
		TAbiEncoded: TryFrom<Vec<u8>>,
		TAccount: for<'a> TryFrom<&'a [u8]>,
		TAssets: From<BTreeMap<u32, xcvm_core::Amount>>,
	> TryFrom<Instruction> for XCVMInstruction<TNetwork, TAbiEncoded, TAccount, TAssets>
{
	type Error = ();
	fn try_from(Instruction { instruction }: Instruction) -> Result<Self, Self::Error> {
		instruction
			.map(|instruction| match instruction {
				instruction::Instruction::Transfer(Transfer {
					destination: Some(Account { encoded }),
					assets,
				}) => Ok(XCVMInstruction::Transfer {
					to: (&encoded[..]).try_into().map_err(|_| ())?,
					assets: assets
						.into_iter()
						.map(|(asset, amount)| Ok((asset, amount.try_into()?)))
						.collect::<Result<BTreeMap<u32, xcvm_core::Amount>, ()>>()?
						.into(),
				}),
				instruction::Instruction::Call(Call { encoded }) => {
					Ok(XCVMInstruction::Call { encoded: encoded.try_into().map_err(|_| ())? })
				},
				instruction::Instruction::Spawn(Spawn {
					network,
					salt,
					assets,
					program: Some(program),
				}) => Ok(XCVMInstruction::Spawn {
					network: network.into(),
					salt,
					assets: assets
						.into_iter()
						.map(|(asset, amount)| Ok((asset, amount.try_into()?)))
						.collect::<Result<BTreeMap<u32, xcvm_core::Amount>, ()>>()?
						.into(),
					program: program.try_into().map_err(|_| ())?,
				}),
				instruction::Instruction::Transfer(Transfer { destination: None, .. }) => Err(()),
				instruction::Instruction::Spawn(Spawn { program: None, .. }) => Err(()),
			})
			.unwrap_or(Err(()))
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use alloc::vec;
	use xcvm_core::{XCVMNetwork, XCVMProgramBuilder, XCVMProtocol};

	#[test]
	fn type_isomorphism() {
		struct DummyProtocol;
		impl XCVMProtocol<XCVMNetwork> for DummyProtocol {
			type Error = ();
			fn serialize(&self, network: XCVMNetwork) -> Result<Vec<u8>, ()> {
				match network {
					XCVMNetwork::PICASSO => Ok(vec![0xCA, 0xFE, 0xBA, 0xBE]),
					XCVMNetwork::ETHEREUM => Ok(vec![0xDE, 0xAD, 0xC0, 0xDE]),
					_ => Err(()),
				}
			}
		}

		let program = || -> Result<_, ()> {
			XCVMProgramBuilder::<
				XCVMNetwork,
				XCVMInstruction<XCVMNetwork, _, Vec<u8>, BTreeMap<u32, xcvm_core::Amount>>,
			>::from(None, XCVMNetwork::PICASSO)
			.call(DummyProtocol)?
			.spawn(
				None,
				XCVMNetwork::ETHEREUM,
				Vec::new(),
				BTreeMap::from([(0x1337, 20_000.into())]),
				|child| {
					Ok(child
						.call(DummyProtocol)?
						.transfer(vec![0xBE, 0xEF], BTreeMap::from([(0, 10_000.into())])))
				},
			)
		}()
		.expect("valid program");

		// f^-1 . f = id
		assert_eq!(
			Ok(program.instructions.clone()),
			program
				.instructions
				.into_iter()
				.map(Into::<Instruction>::into)
				.map(TryFrom::<Instruction>::try_from)
				.collect::<Result<VecDeque<_>, _>>()
		);
	}

	#[test]
	fn encoding_isomorphism() {
		let program = || -> Result<_, ()> {
			Ok(XCVMProgramBuilder::<
				XCVMNetwork,
				XCVMInstruction<XCVMNetwork, _, Vec<u8>, BTreeMap<u32, xcvm_core::Amount>>,
			>::from(Some("test tag".as_bytes().to_vec()), XCVMNetwork::PICASSO)
			.spawn::<_, ()>(
				Some("test tag 2".as_bytes().to_vec()),
				XCVMNetwork::ETHEREUM,
				Vec::new(),
				BTreeMap::from([(0x1337, 20_000.into())]),
				|child| Ok(child.transfer(vec![0xBE, 0xEF], BTreeMap::from([(0, 10_000.into())]))),
			)?
			.build())
		}()
		.expect("valid program");
		assert_eq!(program.clone(), decode(&encode(program)).expect("must decode"));
	}

	#[test]
	fn test_program() {
		// Transfer to Alice/Bob and redispatch the same program from itself, without the redispatch
		let program = || -> Result<_, ()> {
			Ok(XCVMProgramBuilder::<
				XCVMNetwork,
				XCVMInstruction<XCVMNetwork, _, Vec<u8>, BTreeMap<u32, xcvm_core::Amount>>,
			>::from(Some("test tag".as_bytes().to_vec()), XCVMNetwork::PICASSO)
			.transfer(
				hex::decode("d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d")
					.expect("valid"),
				BTreeMap::from([(XCVMAsset::PICA.into(), 1337000000000000.into())]),
			)
			.transfer(
				hex::decode("8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48")
					.expect("valid"),
				BTreeMap::from([(XCVMAsset::PICA.into(), 1336000000000000.into())]),
			)
			.build())
		}()
		.expect("valid program");
		assert_eq!(
      "0a88010a420a400a220a20d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d121a080112160a140a120a1000901092febf040000000000000000000a420a400a220a208eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48121a080112160a140a120a1000806bbd15bf0400000000000000000012087465737420746167",
      hex::encode(encode(program))
    );
	}

	#[test]
	fn test_cross_chain_program() {
		// Transfer to Alice/Bob and redispatch
		let program = || -> Result<_, ()> {
			Ok(XCVMProgramBuilder::<
				XCVMNetwork,
				XCVMInstruction<XCVMNetwork, _, Vec<u8>, BTreeMap<u32, xcvm_core::Amount>>,
			>::from(Some("test tag".as_bytes().to_vec()), XCVMNetwork::PICASSO)
			.transfer(
				hex::decode("d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d")
					.expect("valid"),
				BTreeMap::from([(XCVMAsset::PICA.into(), 1337000000000000.into())]),
			)
			.transfer(
				hex::decode("8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48")
					.expect("valid"),
				BTreeMap::from([(XCVMAsset::PICA.into(), 1336000000000000.into())]),
			)
			.spawn::<_, ()>(
				Some("test tag 2".as_bytes().to_vec()),
				XCVMNetwork::ETHEREUM,
				Vec::new(),
				BTreeMap::from([(XCVMAsset::PICA.into(), 1000000000000.into())]),
				|child| {
					Ok(child.transfer(
						vec![1u8; 20],
						BTreeMap::from([(XCVMAsset::PICA.into(), 1000000000000.into())]),
					))
				},
			)?
			.build())
		}()
		.expect("valid program");
		assert_eq!(
      "0af2010a420a400a220a20d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d121a080112160a140a120a1000901092febf040000000000000000000a420a400a220a208eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48121a080112160a140a120a1000806bbd15bf040000000000000000000a681a6608021a1a080112160a140a120a100010a5d4e8000000000000000000000022460a380a360a340a160a140101010101010101010101010101010101010101121a080112160a140a120a100010a5d4e80000000000000000000000120a7465737420746167203212087465737420746167",
      hex::encode(encode(program))
    );
	}
}