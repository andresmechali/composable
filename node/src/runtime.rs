use common::{AccountId, Balance, Index, OpaqueBlock as Block};
use primitives::currency::CurrencyId;
use sp_runtime::traits::BlakeTwo256;

use crate::runtime::{composable::ComposableHostRuntimeApis, dali::DaliHostRuntimeApis};

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

pub mod dali {
	use common::{AccountId, Balance, OpaqueBlock as Block};
	use primitives::currency::CurrencyId;

	#[cfg(feature = "dali")]
	pub trait DaliHostRuntimeApis:
		pallet_transaction_payment_rpc_runtime_api::TransactionPaymentApi<Block, Balance>
		+ assets_runtime_api::AssetsRuntimeApi<Block, CurrencyId, AccountId, Balance>
		+ crowdloan_rewards_runtime_api::CrowdloanRewardsRuntimeApi<Block, AccountId, Balance>
	{
	}

	#[cfg(feature = "dali")]
	impl<Api> DaliHostRuntimeApis for Api where
		Api: pallet_transaction_payment_rpc_runtime_api::TransactionPaymentApi<Block, Balance>
			+ assets_runtime_api::AssetsRuntimeApi<Block, CurrencyId, AccountId, Balance>
			+ crowdloan_rewards_runtime_api::CrowdloanRewardsRuntimeApi<Block, AccountId, Balance>
	{
	}
}

pub mod picasso {
	use common::{AccountId, Balance, OpaqueBlock as Block};
	use primitives::currency::CurrencyId;

	pub trait PicassoHostRuntimeApis:
		pallet_transaction_payment_rpc_runtime_api::TransactionPaymentApi<Block, Balance>
		+ assets_runtime_api::AssetsRuntimeApi<Block, CurrencyId, AccountId, Balance>
		+ crowdloan_rewards_runtime_api::CrowdloanRewardsRuntimeApi<Block, AccountId, Balance>
	{
	}

	impl<Api> PicassoHostRuntimeApis for Api where
		Api: pallet_transaction_payment_rpc_runtime_api::TransactionPaymentApi<Block, Balance>
			+ assets_runtime_api::AssetsRuntimeApi<Block, CurrencyId, AccountId, Balance>
			+ crowdloan_rewards_runtime_api::CrowdloanRewardsRuntimeApi<Block, AccountId, Balance>
	{
	}
}

mod composable {
	use common::{AccountId, Balance, OpaqueBlock as Block};
	use primitives::currency::CurrencyId;

	#[cfg(feature = "composable")]
	pub trait ComposableHostRuntimeApis:
		pallet_transaction_payment_rpc_runtime_api::TransactionPaymentApi<Block, Balance>
		+ assets_runtime_api::AssetsRuntimeApi<Block, CurrencyId, AccountId, Balance>
		+ crowdloan_rewards_runtime_api::CrowdloanRewardsRuntimeApi<Block, AccountId, Balance>
	{
	}

	#[cfg(feature = "composable")]
	impl<Api> ComposableHostRuntimeApis for Api where
		Api: pallet_transaction_payment_rpc_runtime_api::TransactionPaymentApi<Block, Balance>
			+ assets_runtime_api::AssetsRuntimeApi<Block, CurrencyId, AccountId, Balance>
			+ crowdloan_rewards_runtime_api::CrowdloanRewardsRuntimeApi<Block, AccountId, Balance>
	{
	}
}

impl<
		// only dali
		#[cfg(all(feature = "dali", not(feature = "composable")))] Api: DaliHostRuntimeApis,
		// only composable
		#[cfg(all(feature = "composable", not(feature = "dali")))] Api: ComposableHostRuntimeApis,
		// only picasso
		#[cfg(all(not(feature = "composable"), not(feature = "dali")))] Api,
		// all 3
		#[cfg(all(feature = "composable", feature = "dali"))] Api: DaliHostRuntimeApis + ComposableHostRuntimeApis,
	> BaseHostRuntimeApis for Api
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

macro_rules! trait_alias {
	($name:ident: $($super_trait:ty),+) => {
		pub trait $name where $(Self: $super_trait),+ {}

		impl<Api> $name for Api where $(Api: $super_trait),+ {}
	};
}

// only dali
#[cfg(all(feature = "dali", not(feature = "composable")))]
pub trait HostRuntimeApis: BaseHostRuntimeApis + DaliHostRuntimeApis {}
#[cfg(all(feature = "dali", not(feature = "composable")))]
impl<Api> HostRuntimeApis for Api
where
	Api: BaseHostRuntimeApis,
	Api: DaliHostRuntimeApis,
{
}
// only composable

#[cfg(all(feature = "composable", not(feature = "dali")))]
pub trait HostRuntimeApis: BaseHostRuntimeApis + ComposableHostRuntimeApis {}
#[cfg(all(feature = "composable", not(feature = "dali")))]
impl<Api> HostRuntimeApis for Api
where
	Api: BaseHostRuntimeApis,
	Api: ComposableHostRuntimeApis,
{
}
// only picasso

#[cfg(all(not(feature = "composable"), not(feature = "dali")))]
pub trait HostRuntimeApis: BaseHostRuntimeApis {}
#[cfg(all(not(feature = "composable"), not(feature = "dali")))]
impl<Api> HostRuntimeApis for Api where Api: BaseHostRuntimeApis {}

// all 3
#[cfg(all(feature = "composable", feature = "dali"))]
pub trait HostRuntimeApis
where
	Self: BaseHostRuntimeApis,
	Self: DaliHostRuntimeApis,
	Self: ComposableHostRuntimeApis,
{
}
#[cfg(all(feature = "composable", feature = "dali"))]
impl<Api> HostRuntimeApis for Api
where
	Api: BaseHostRuntimeApis,
	Api: DaliHostRuntimeApis,
	Api: ComposableHostRuntimeApis,
{
}
