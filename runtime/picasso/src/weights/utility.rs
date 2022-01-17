
//! Autogenerated weights for `utility`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 4.0.0-dev
//! DATE: 2022-01-17, STEPS: `50`, REPEAT: 20, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! EXECUTION: Some(Wasm), WASM-EXECUTION: Compiled, CHAIN: Some("picasso-dev"), DB CACHE: 128

// Executed Command:
// ./target/release/composable
// benchmark
// --chain=picasso-dev
// --execution=wasm
// --wasm-execution=compiled
// --pallet=utility
// --extrinsic=*
// --steps=50
// --repeat=20
// --raw
// --output=runtime/picasso/src/weights

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]

use frame_support::{traits::Get, weights::Weight};
use sp_std::marker::PhantomData;

/// Weight functions for `utility`.
pub struct WeightInfo<T>(PhantomData<T>);
impl<T: frame_system::Config> utility::WeightInfo for WeightInfo<T> {
	fn batch(c: u32, ) -> Weight {
		(7_954_000 as Weight)
			// Standard Error: 9_000
			.saturating_add((3_659_000 as Weight).saturating_mul(c as Weight))
	}
	fn as_derivative() -> Weight {
		(2_000_000 as Weight)
	}
	fn batch_all(c: u32, ) -> Weight {
		(26_086_000 as Weight)
			// Standard Error: 8_000
			.saturating_add((3_831_000 as Weight).saturating_mul(c as Weight))
	}
	fn dispatch_as() -> Weight {
		(9_000_000 as Weight)
	}
}
