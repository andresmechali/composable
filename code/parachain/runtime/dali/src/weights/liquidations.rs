
//! Autogenerated weights for `liquidations`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 4.0.0-dev
//! DATE: 2022-10-02, STEPS: `50`, REPEAT: 20, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! HOSTNAME: `0687d2a2bb90`, CPU: `Intel(R) Xeon(R) CPU @ 2.20GHz`
//! EXECUTION: Some(Wasm), WASM-EXECUTION: Compiled, CHAIN: Some("dali-dev"), DB CACHE: 1024

// Executed Command:
// ./target/release/composable
// benchmark
// pallet
// --chain=dali-dev
// --execution=wasm
// --wasm-execution=compiled
// --wasm-instantiation-strategy=legacy-instance-reuse
// --pallet=*
// --extrinsic=*
// --steps=50
// --repeat=20
// --output=parachain/runtime/dali/src/weights
// --log
// error

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]

use frame_support::{traits::Get, weights::Weight};
use sp_std::marker::PhantomData;

/// Weight functions for `liquidations`.
pub struct WeightInfo<T>(PhantomData<T>);
impl<T: frame_system::Config> liquidations::WeightInfo for WeightInfo<T> {
	// Storage: Liquidations StrategyIndex (r:1 w:1)
	// Storage: Liquidations Strategies (r:0 w:1)
	fn add_liquidation_strategy() -> Weight {
		(17_360_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(2 as Weight))
	}
	// Storage: Liquidations Strategies (r:2 w:0)
	// Storage: DutchAuction OrdersIndex (r:1 w:1)
	// Storage: System Account (r:1 w:1)
	// Storage: Timestamp Now (r:1 w:0)
	// Storage: Tokens Accounts (r:1 w:1)
	// Storage: DutchAuction SellOrders (r:0 w:1)
	/// The range of component `x` is `[1, 9]`.
	fn sell(x: u32, ) -> Weight {
		(142_739_000 as Weight)
			// Standard Error: 116_000
			.saturating_add((4_405_000 as Weight).saturating_mul(x as Weight))
			.saturating_add(T::DbWeight::get().reads(5 as Weight))
			.saturating_add(T::DbWeight::get().reads((1 as Weight).saturating_mul(x as Weight)))
			.saturating_add(T::DbWeight::get().writes(4 as Weight))
	}
}
