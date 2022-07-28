
//! Autogenerated weights for `utility`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 4.0.0-dev
//! DATE: 2022-07-27, STEPS: `50`, REPEAT: 20, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! EXECUTION: Some(Wasm), WASM-EXECUTION: Compiled, CHAIN: Some("composable-dev"), DB CACHE: 1024

// Executed Command:
// ./target/release/composable
// benchmark
// pallet
// --chain=composable-dev
// --execution=wasm
// --wasm-execution=compiled
// --wasm-instantiation-strategy=legacy-instance-reuse
// --pallet=*
// --extrinsic=*
// --steps=50
// --repeat=20
// --output=runtime/composable/src/weights
// --log
// error

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]

use frame_support::{traits::Get, weights::Weight};
use sp_std::marker::PhantomData;

/// Weight functions for `utility`.
pub struct WeightInfo<T>(PhantomData<T>);
impl<T: frame_system::Config> utility::WeightInfo for WeightInfo<T> {
	fn batch(c: u32, ) -> Weight {
		(31_927_000 as Weight)
			// Standard Error: 7_000
			.saturating_add((7_149_000 as Weight).saturating_mul(c as Weight))
	}
	fn as_derivative() -> Weight {
		(4_201_000 as Weight)
	}
	fn batch_all(c: u32, ) -> Weight {
		(35_296_000 as Weight)
			// Standard Error: 5_000
			.saturating_add((7_787_000 as Weight).saturating_mul(c as Weight))
	}
	fn dispatch_as() -> Weight {
		(19_253_000 as Weight)
	}
	fn force_batch(c: u32, ) -> Weight {
		(26_499_000 as Weight)
			// Standard Error: 4_000
			.saturating_add((7_137_000 as Weight).saturating_mul(c as Weight))
	}
}
