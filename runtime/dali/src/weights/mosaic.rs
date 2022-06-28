
//! Autogenerated weights for `mosaic`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 4.0.0-dev
//! DATE: 2022-06-28, STEPS: `50`, REPEAT: 20, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! EXECUTION: Some(Wasm), WASM-EXECUTION: Compiled, CHAIN: Some("dali-dev"), DB CACHE: 1024

// Executed Command:
// ./target/release/composable
// benchmark
// pallet
// --chain=dali-dev
// --execution=wasm
// --wasm-execution=compiled
// --pallet=*
// --extrinsic=*
// --steps=50
// --repeat=20
// --output=runtime/dali/src/weights
// --log
// error

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]

use frame_support::{traits::Get, weights::Weight};
use sp_std::marker::PhantomData;

/// Weight functions for `mosaic`.
pub struct WeightInfo<T>(PhantomData<T>);
impl<T: frame_system::Config> mosaic::WeightInfo for WeightInfo<T> {
	// Storage: Mosaic Relayer (r:0 w:1)
	fn set_relayer() -> Weight {
		(20_799_000 as Weight)
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Mosaic Relayer (r:1 w:1)
	fn rotate_relayer() -> Weight {
		(27_215_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Mosaic Relayer (r:1 w:0)
	// Storage: Mosaic NetworkInfos (r:0 w:1)
	fn set_network() -> Weight {
		(28_284_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: unknown [0x3a7472616e73616374696f6e5f6c6576656c3a] (r:1 w:1)
	// Storage: Mosaic AssetsInfo (r:1 w:1)
	fn set_budget() -> Weight {
		(33_340_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().writes(2 as Weight))
	}
	// Storage: unknown [0x3a7472616e73616374696f6e5f6c6576656c3a] (r:1 w:1)
	// Storage: Mosaic AssetsInfo (r:1 w:0)
	// Storage: Mosaic LocalToRemoteAsset (r:1 w:0)
	// Storage: Mosaic NetworkInfos (r:1 w:0)
	// Storage: System Account (r:2 w:2)
	// Storage: Mosaic TimeLockPeriod (r:1 w:0)
	// Storage: Mosaic OutgoingTransactions (r:1 w:1)
	// Storage: Mosaic Nonce (r:1 w:1)
	fn transfer_to() -> Weight {
		(127_274_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(9 as Weight))
			.saturating_add(T::DbWeight::get().writes(5 as Weight))
	}
	// Storage: unknown [0x3a7472616e73616374696f6e5f6c6576656c3a] (r:1 w:1)
	// Storage: Mosaic Relayer (r:1 w:0)
	// Storage: Mosaic RemoteToLocalAsset (r:1 w:0)
	// Storage: Mosaic OutgoingTransactions (r:1 w:1)
	// Storage: System Account (r:1 w:1)
	fn accept_transfer() -> Weight {
		(88_840_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(5 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	// Storage: unknown [0x3a7472616e73616374696f6e5f6c6576656c3a] (r:1 w:1)
	// Storage: Mosaic OutgoingTransactions (r:1 w:1)
	// Storage: System Account (r:2 w:2)
	fn claim_stale_to() -> Weight {
		(99_993_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(4 as Weight))
			.saturating_add(T::DbWeight::get().writes(4 as Weight))
	}
	// Storage: Mosaic Relayer (r:1 w:0)
	// Storage: Mosaic RemoteToLocalAsset (r:1 w:0)
	// Storage: Mosaic AssetsInfo (r:1 w:1)
	// Storage: System Account (r:1 w:1)
	// Storage: Mosaic IncomingTransactions (r:1 w:1)
	fn timelocked_mint() -> Weight {
		(92_878_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(5 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	// Storage: Mosaic TimeLockPeriod (r:0 w:1)
	fn set_timelock_duration() -> Weight {
		(3_073_000 as Weight)
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: unknown [0x3a7472616e73616374696f6e5f6c6576656c3a] (r:1 w:1)
	// Storage: Mosaic Relayer (r:1 w:0)
	// Storage: Mosaic RemoteToLocalAsset (r:1 w:0)
	// Storage: Mosaic IncomingTransactions (r:1 w:1)
	// Storage: System Account (r:1 w:1)
	fn rescind_timelocked_mint() -> Weight {
		(87_014_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(5 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	// Storage: Mosaic IncomingTransactions (r:1 w:1)
	// Storage: System Account (r:2 w:2)
	fn claim_to() -> Weight {
		(90_159_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(3 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	// Storage: Mosaic NetworkInfos (r:1 w:0)
	// Storage: Mosaic LocalToRemoteAsset (r:1 w:1)
	// Storage: Mosaic RemoteToLocalAsset (r:0 w:1)
	fn update_asset_mapping() -> Weight {
		(37_145_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().writes(2 as Weight))
	}
}
