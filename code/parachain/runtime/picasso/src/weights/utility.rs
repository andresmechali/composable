
//! Autogenerated weights for `utility`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 4.0.0-dev
//! DATE: 2023-02-14, STEPS: `50`, REPEAT: 10, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! HOSTNAME: `657e6acf5e95`, CPU: `Intel(R) Xeon(R) CPU @ 3.10GHz`
//! EXECUTION: Some(Wasm), WASM-EXECUTION: Compiled, CHAIN: Some("picasso-dev"), DB CACHE: 1024

// Executed Command:
// /nix/store/7as5b27dws6pfhhpjrs68qfvfx2ldcli-composable/bin/composable
// benchmark
// pallet
// --chain=picasso-dev
// --execution=wasm
// --wasm-execution=compiled
// --pallet=*
// --extrinsic=*
// --steps=50
// --repeat=10
// --output=code/parachain/runtime/picasso/src/weights

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]

use frame_support::{traits::Get, weights::Weight};
use sp_std::marker::PhantomData;

/// Weight functions for `utility`.
pub struct WeightInfo<T>(PhantomData<T>);
impl<T: frame_system::Config> utility::WeightInfo for WeightInfo<T> {
	// Storage: CallFilter DisabledCalls (r:1 w:0)
	/// The range of component `c` is `[0, 1000]`.
	fn batch(c: u32, ) -> Weight {
		// Minimum execution time: 21_327 nanoseconds.
		Weight::from_ref_time(35_895_414)
			// Standard Error: 4_029
			.saturating_add(Weight::from_ref_time(9_752_755).saturating_mul(c.into()))
			.saturating_add(T::DbWeight::get().reads(1))
	}
	// Storage: CallFilter DisabledCalls (r:1 w:0)
	fn as_derivative() -> Weight {
		// Minimum execution time: 17_495 nanoseconds.
		Weight::from_ref_time(18_525_000)
			.saturating_add(T::DbWeight::get().reads(1))
	}
	// Storage: CallFilter DisabledCalls (r:1 w:0)
	/// The range of component `c` is `[0, 1000]`.
	fn batch_all(c: u32, ) -> Weight {
		// Minimum execution time: 21_534 nanoseconds.
		Weight::from_ref_time(33_373_641)
			// Standard Error: 5_015
			.saturating_add(Weight::from_ref_time(10_234_410).saturating_mul(c.into()))
			.saturating_add(T::DbWeight::get().reads(1))
	}
	fn dispatch_as() -> Weight {
		// Minimum execution time: 25_471 nanoseconds.
		Weight::from_ref_time(26_793_000)
	}
	// Storage: CallFilter DisabledCalls (r:1 w:0)
	/// The range of component `c` is `[0, 1000]`.
	fn force_batch(c: u32, ) -> Weight {
		// Minimum execution time: 21_731 nanoseconds.
		Weight::from_ref_time(35_088_929)
			// Standard Error: 5_007
			.saturating_add(Weight::from_ref_time(9_785_112).saturating_mul(c.into()))
			.saturating_add(T::DbWeight::get().reads(1))
	}
}
