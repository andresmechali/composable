
//! Autogenerated weights for `collective`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 4.0.0-dev
//! DATE: 2022-05-24, STEPS: `50`, REPEAT: 20, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! EXECUTION: Some(Wasm), WASM-EXECUTION: Compiled, CHAIN: Some("composable-dev"), DB CACHE: 1024

// Executed Command:
// ./target/release/composable
// benchmark
// pallet
// --chain=composable-dev
// --execution=wasm
// --wasm-execution=compiled
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

/// Weight functions for `collective`.
pub struct WeightInfo<T>(PhantomData<T>);
impl<T: frame_system::Config> collective::WeightInfo for WeightInfo<T> {
	// Storage: Council Members (r:1 w:1)
	// Storage: Council Proposals (r:1 w:0)
	// Storage: Council Voting (r:100 w:100)
	// Storage: Council Prime (r:0 w:1)
	fn set_members(m: u32, n: u32, p: u32, ) -> Weight {
		(0 as Weight)
			// Standard Error: 89_000
			.saturating_add((19_953_000 as Weight).saturating_mul(m as Weight))
			// Standard Error: 89_000
			.saturating_add((130_000 as Weight).saturating_mul(n as Weight))
			// Standard Error: 89_000
			.saturating_add((26_342_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().reads((1 as Weight).saturating_mul(p as Weight)))
			.saturating_add(T::DbWeight::get().writes(2 as Weight))
			.saturating_add(T::DbWeight::get().writes((1 as Weight).saturating_mul(p as Weight)))
	}
	// Storage: Council Members (r:1 w:0)
	fn execute(b: u32, m: u32, ) -> Weight {
		(25_654_000 as Weight)
			// Standard Error: 0
			.saturating_add((4_000 as Weight).saturating_mul(b as Weight))
			// Standard Error: 0
			.saturating_add((55_000 as Weight).saturating_mul(m as Weight))
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
	}
	// Storage: Council Members (r:1 w:0)
	// Storage: Council ProposalOf (r:1 w:0)
	fn propose_execute(b: u32, m: u32, ) -> Weight {
		(29_349_000 as Weight)
			// Standard Error: 0
			.saturating_add((5_000 as Weight).saturating_mul(b as Weight))
			// Standard Error: 0
			.saturating_add((106_000 as Weight).saturating_mul(m as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
	}
	// Storage: Council Members (r:1 w:0)
	// Storage: Council ProposalOf (r:1 w:1)
	// Storage: Council Proposals (r:1 w:1)
	// Storage: Council ProposalCount (r:1 w:1)
	// Storage: Council Voting (r:0 w:1)
	fn propose_proposed(b: u32, m: u32, p: u32, ) -> Weight {
		(38_590_000 as Weight)
			// Standard Error: 0
			.saturating_add((15_000 as Weight).saturating_mul(b as Weight))
			// Standard Error: 3_000
			.saturating_add((73_000 as Weight).saturating_mul(m as Weight))
			// Standard Error: 2_000
			.saturating_add((431_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(4 as Weight))
			.saturating_add(T::DbWeight::get().writes(4 as Weight))
	}
	// Storage: Council Members (r:1 w:0)
	// Storage: Council Voting (r:1 w:1)
	fn vote(m: u32, ) -> Weight {
		(55_904_000 as Weight)
			// Standard Error: 3_000
			.saturating_add((192_000 as Weight).saturating_mul(m as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Council Voting (r:1 w:1)
	// Storage: Council Members (r:1 w:0)
	// Storage: Council Proposals (r:1 w:1)
	// Storage: Council ProposalOf (r:0 w:1)
	fn close_early_disapproved(m: u32, p: u32, ) -> Weight {
		(52_922_000 as Weight)
			// Standard Error: 2_000
			.saturating_add((104_000 as Weight).saturating_mul(m as Weight))
			// Standard Error: 2_000
			.saturating_add((349_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(3 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	// Storage: Council Voting (r:1 w:1)
	// Storage: Council Members (r:1 w:0)
	// Storage: Council ProposalOf (r:1 w:1)
	// Storage: Council Proposals (r:1 w:1)
	fn close_early_approved(b: u32, m: u32, p: u32, ) -> Weight {
		(54_834_000 as Weight)
			// Standard Error: 0
			.saturating_add((14_000 as Weight).saturating_mul(b as Weight))
			// Standard Error: 3_000
			.saturating_add((157_000 as Weight).saturating_mul(m as Weight))
			// Standard Error: 3_000
			.saturating_add((470_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(4 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	// Storage: Council Voting (r:1 w:1)
	// Storage: Council Members (r:1 w:0)
	// Storage: Council Prime (r:1 w:0)
	// Storage: Council Proposals (r:1 w:1)
	// Storage: Council ProposalOf (r:0 w:1)
	fn close_disapproved(m: u32, p: u32, ) -> Weight {
		(55_102_000 as Weight)
			// Standard Error: 3_000
			.saturating_add((146_000 as Weight).saturating_mul(m as Weight))
			// Standard Error: 3_000
			.saturating_add((359_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(4 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	// Storage: Council Voting (r:1 w:1)
	// Storage: Council Members (r:1 w:0)
	// Storage: Council Prime (r:1 w:0)
	// Storage: Council ProposalOf (r:1 w:1)
	// Storage: Council Proposals (r:1 w:1)
	fn close_approved(b: u32, m: u32, p: u32, ) -> Weight {
		(69_267_000 as Weight)
			// Standard Error: 15_000
			.saturating_add((488_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(5 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	// Storage: Council Proposals (r:1 w:1)
	// Storage: Council Voting (r:0 w:1)
	// Storage: Council ProposalOf (r:0 w:1)
	fn disapprove_proposal(p: u32, ) -> Weight {
		(30_973_000 as Weight)
			// Standard Error: 1_000
			.saturating_add((416_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
}
