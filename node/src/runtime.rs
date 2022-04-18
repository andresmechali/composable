use common::{AccountId, Balance, Index, OpaqueBlock as Block};
use primitives::currency::CurrencyId;
use sp_runtime::traits::BlakeTwo256;

/// Consider this a trait alias.
pub trait BaseHostRuntimeApis:
	sp_transaction_pool::runtime_api::TaggedTransactionQueue<Block>
	+ sp_api::ApiExt<Block>
	+ sp_block_builder::BlockBuilder<Block>
	+ substrate_frame_rpc_system::AccountNonceApi<Block, AccountId, Index>
	+ sp_api::Metadata<Block>
	+ sp_consensus_aura::AuraApi<Block, sp_consensus_aura::sr25519::AuthorityId>
	+ sp_offchain::OffchainWorkerApi<Block>
	+ sp_session::SessionKeys<Block>
	+ cumulus_primitives_core::CollectCollationInfo<Block>
	+ pallet_transaction_payment_rpc::TransactionPaymentRuntimeApi<Block, Balance>
where
	<Self as sp_api::ApiExt<Block>>::StateBackend: sp_api::StateBackend<BlakeTwo256>,
{
}

impl<Api> BaseHostRuntimeApis for Api
where
	Api: sp_transaction_pool::runtime_api::TaggedTransactionQueue<Block>
		+ sp_api::ApiExt<Block>
		+ sp_block_builder::BlockBuilder<Block>
		+ substrate_frame_rpc_system::AccountNonceApi<Block, AccountId, Index>
		+ sp_api::Metadata<Block>
		+ sp_consensus_aura::AuraApi<Block, sp_consensus_aura::sr25519::AuthorityId>
		+ sp_offchain::OffchainWorkerApi<Block>
		+ sp_session::SessionKeys<Block>
		+ cumulus_primitives_core::CollectCollationInfo<Block>
		+ pallet_transaction_payment_rpc::TransactionPaymentRuntimeApi<Block, Balance>,
	<Self as sp_api::ApiExt<Block>>::StateBackend: sp_api::StateBackend<BlakeTwo256>,
{
}

#[cfg(feature = "dali")]
pub trait DaliHostRuntimeApis:
	pallet_transaction_payment_rpc_runtime_api::TransactionPaymentApi<Block, Balance>
	+ assets_runtime_api::AssetsRuntimeApi<Block, CurrencyId, AccountId, Balance>
	+ crowdloan_rewards_runtime_api::CrowdloanRewardsRuntimeApi<Block, AccountId, Balance>
{
}

pub trait PicassoHostRuntimeApis:
	pallet_transaction_payment_rpc_runtime_api::TransactionPaymentApi<Block, Balance>
	+ assets_runtime_api::AssetsRuntimeApi<Block, CurrencyId, AccountId, Balance>
	+ crowdloan_rewards_runtime_api::CrowdloanRewardsRuntimeApi<Block, AccountId, Balance>
{
}

#[cfg(feature = "composable")]
pub trait ComposableHostRuntimeApis:
	pallet_transaction_payment_rpc_runtime_api::TransactionPaymentApi<Block, Balance>
	+ assets_runtime_api::AssetsRuntimeApi<Block, CurrencyId, AccountId, Balance>
	+ crowdloan_rewards_runtime_api::CrowdloanRewardsRuntimeApi<Block, AccountId, Balance>
{
}
