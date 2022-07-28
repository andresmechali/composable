
//! Autogenerated weights for `collective`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 4.0.0-dev
//! DATE: 2022-07-27, STEPS: `50`, REPEAT: 20, LOW RANGE: `[]`, HIGH RANGE: `[]`
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
// --output=runtime/dali/src/weights
// --log
// error

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]

use frame_support::{traits::Get, weights::Weight};
use sp_std::marker::PhantomData;

/// Weight functions for `collective`.
pub struct WeightInfo<T>(PhantomData<T>);
impl<T: frame_system::Config> collective::WeightInfo for WeightInfo<T> {
	// Storage: Council Members (r:1 w:1)
	// Storage: Council Proposals (r:1 w:0)
	// Storage: Council Voting (r:100 w:100)
	// Storage: Council Prime (r:0 w:1)
	fn set_members(m: u32, _n: u32, p: u32, ) -> Weight {
		(0 as Weight)
			// Standard Error: 46_000
			.saturating_add((20_262_000 as Weight).saturating_mul(m as Weight))
			// Standard Error: 46_000
			.saturating_add((26_780_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().reads((1 as Weight).saturating_mul(p as Weight)))
			.saturating_add(T::DbWeight::get().writes(2 as Weight))
			.saturating_add(T::DbWeight::get().writes((1 as Weight).saturating_mul(p as Weight)))
	}
	// Storage: Council Members (r:1 w:0)
	// Storage: CallFilter DisabledCalls (r:1 w:0)
	fn execute(b: u32, m: u32, ) -> Weight {
		(35_291_000 as Weight)
			// Standard Error: 0
			.saturating_add((3_000 as Weight).saturating_mul(b as Weight))
			// Standard Error: 3_000
			.saturating_add((52_000 as Weight).saturating_mul(m as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
	}
	// Storage: Council Members (r:1 w:0)
	// Storage: Council ProposalOf (r:1 w:0)
	// Storage: CallFilter DisabledCalls (r:1 w:0)
	fn propose_execute(b: u32, m: u32, ) -> Weight {
		(42_325_000 as Weight)
			// Standard Error: 0
			.saturating_add((2_000 as Weight).saturating_mul(b as Weight))
			// Standard Error: 4_000
			.saturating_add((86_000 as Weight).saturating_mul(m as Weight))
			.saturating_add(T::DbWeight::get().reads(3 as Weight))
	}
	// Storage: Council Members (r:1 w:0)
	// Storage: Council ProposalOf (r:1 w:1)
	// Storage: Council Proposals (r:1 w:1)
	// Storage: Council ProposalCount (r:1 w:1)
	// Storage: Council Voting (r:0 w:1)
	fn propose_proposed(b: u32, m: u32, p: u32, ) -> Weight {
		(34_961_000 as Weight)
			// Standard Error: 0
			.saturating_add((16_000 as Weight).saturating_mul(b as Weight))
			// Standard Error: 4_000
			.saturating_add((115_000 as Weight).saturating_mul(m as Weight))
			// Standard Error: 4_000
			.saturating_add((537_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(4 as Weight))
			.saturating_add(T::DbWeight::get().writes(4 as Weight))
	}
	// Storage: Council Members (r:1 w:0)
	// Storage: Council Voting (r:1 w:1)
	fn vote(m: u32, ) -> Weight {
		(66_596_000 as Weight)
			// Standard Error: 5_000
			.saturating_add((184_000 as Weight).saturating_mul(m as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Council Voting (r:1 w:1)
	// Storage: Council Members (r:1 w:0)
	// Storage: Council Proposals (r:1 w:1)
	// Storage: Council ProposalOf (r:0 w:1)
	fn close_early_disapproved(m: u32, p: u32, ) -> Weight {
		(59_570_000 as Weight)
			// Standard Error: 4_000
			.saturating_add((99_000 as Weight).saturating_mul(m as Weight))
			// Standard Error: 4_000
			.saturating_add((404_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(3 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	// Storage: Council Voting (r:1 w:1)
	// Storage: Council Members (r:1 w:0)
	// Storage: Council ProposalOf (r:1 w:1)
	// Storage: CallFilter DisabledCalls (r:1 w:0)
	// Storage: Council Proposals (r:1 w:1)
	fn close_early_approved(_b: u32, m: u32, p: u32, ) -> Weight {
		(97_889_000 as Weight)
			// Standard Error: 15_000
			.saturating_add((165_000 as Weight).saturating_mul(m as Weight))
			// Standard Error: 15_000
			.saturating_add((602_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(5 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	// Storage: Council Voting (r:1 w:1)
	// Storage: Council Members (r:1 w:0)
	// Storage: Council Prime (r:1 w:0)
	// Storage: Council Proposals (r:1 w:1)
	// Storage: Council ProposalOf (r:0 w:1)
	fn close_disapproved(m: u32, p: u32, ) -> Weight {
		(63_355_000 as Weight)
			// Standard Error: 5_000
			.saturating_add((134_000 as Weight).saturating_mul(m as Weight))
			// Standard Error: 4_000
			.saturating_add((425_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(4 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	// Storage: Council Voting (r:1 w:1)
	// Storage: Council Members (r:1 w:0)
	// Storage: Council Prime (r:1 w:0)
	// Storage: Council ProposalOf (r:1 w:1)
	// Storage: CallFilter DisabledCalls (r:1 w:0)
	// Storage: Council Proposals (r:1 w:1)
	fn close_approved(b: u32, m: u32, p: u32, ) -> Weight {
		(73_900_000 as Weight)
			// Standard Error: 0
			.saturating_add((14_000 as Weight).saturating_mul(b as Weight))
			// Standard Error: 5_000
			.saturating_add((159_000 as Weight).saturating_mul(m as Weight))
			// Standard Error: 5_000
			.saturating_add((609_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(6 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	// Storage: Council Proposals (r:1 w:1)
	// Storage: Council Voting (r:0 w:1)
	// Storage: Council ProposalOf (r:0 w:1)
	fn disapprove_proposal(p: u32, ) -> Weight {
		(34_007_000 as Weight)
			// Standard Error: 3_000
			.saturating_add((495_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
}
