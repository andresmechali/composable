
//! Autogenerated weights for `bonded_finance`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 4.0.0-dev
//! DATE: 2022-05-06, STEPS: `50`, REPEAT: 20, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! EXECUTION: Some(Wasm), WASM-EXECUTION: Compiled, CHAIN: Some("picasso-dev"), DB CACHE: 1024

// Executed Command:
// ./target/release/composable
// benchmark
// --chain=picasso-dev
// --execution=wasm
// --wasm-execution=compiled
// --pallet=*
// --extrinsic=*
// --steps=50
// --repeat=20
// --output=runtime/picasso/src/weights
// --log
// error

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]

use frame_support::{traits::Get, weights::Weight};
use sp_std::marker::PhantomData;

/// Weight functions for `bonded_finance`.
pub struct WeightInfo<T>(PhantomData<T>);
impl<T: frame_system::Config> bonded_finance::WeightInfo for WeightInfo<T> {
	// Storage: BondedFinance BondOfferCount (r:1 w:1)
	// Storage: System Account (r:2 w:2)
	// Storage: Tokens Accounts (r:2 w:2)
	// Storage: BondedFinance BondOffers (r:0 w:1)
	fn offer() -> Weight {
		(120_540_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(5 as Weight))
			.saturating_add(T::DbWeight::get().writes(6 as Weight))
	}
	// Storage: BondedFinance BondOffers (r:1 w:1)
	// Storage: Tokens Accounts (r:4 w:4)
	// Storage: System Account (r:2 w:2)
	// Storage: Vesting VestingSchedules (r:2 w:2)
	// Storage: Tokens Locks (r:2 w:2)
	fn bond() -> Weight {
		(243_639_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(11 as Weight))
			.saturating_add(T::DbWeight::get().writes(11 as Weight))
	}
	// Storage: BondedFinance BondOffers (r:1 w:1)
	// Storage: System Account (r:2 w:2)
	fn cancel() -> Weight {
		(72_375_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(3 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
}
