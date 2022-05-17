// This file is part of Substrate.

// Copyright (C) 2017-2022 Parity Technologies (UK) Ltd.
// SPDX-License-Identifier: Apache-2.0

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// 	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//! The tests for functionality concerning locking and lock-voting.

use super::*;
use frame_support::traits::{fungible::Mutate as FungibleMutet, fungibles::Mutate};

fn aye(x: u8, balance: u64) -> AccountVote<u64> {
	AccountVote::Standard {
		vote: Vote { aye: true, conviction: Conviction::try_from(x).unwrap() },
		balance,
	}
}

fn nay(x: u8, balance: u64) -> AccountVote<u64> {
	AccountVote::Standard {
		vote: Vote { aye: false, conviction: Conviction::try_from(x).unwrap() },
		balance,
	}
}

fn the_lock(amount: u64) -> BalanceLock<u64> {
	BalanceLock { id: DEMOCRACY_ID, amount, reasons: pallet_balances::Reasons::Misc }
}

proptest! {
	#![proptest_config(ProptestConfig::with_cases(1000))]

	#[test]
	fn no_locks_without_conviction_should_work(
	  asset_id in valid_asset_id(),
	  balance1 in valid_amounts_without_overflow_1()) {
		new_test_ext().execute_with(|| {
			System::set_block_number(0);
			Tokens::mint_into(asset_id, &1, balance1 / 10).expect("always can mint in test");
			let r = Democracy::inject_referendum(
				2,
				set_balance_proposal_hash_and_note_2(balance1, asset_id),
				VoteThreshold::SuperMajorityApprove,
				0,
			);
			assert_ok!(Democracy::vote(Origin::signed(1), r, aye(0, balance1 / 10)));

			fast_forward_to(2);

			assert_eq!(Balances::free_balance(42), balance1);
			assert_ok!(Democracy::remove_other_vote(Origin::signed(2), 1, asset_id, r));
			assert_ok!(Democracy::unlock(Origin::signed(2), 1, asset_id));
			assert_eq!(Balances::locks(1), vec![]);
		});
   }

   #[test]
	fn prior_lockvotes_should_be_enforced(
		asset_id in valid_asset_id(),
		balance1 in valid_amounts_without_overflow_1()) {
		new_test_ext().execute_with(|| {
			Tokens::mint_into(asset_id, &1, balance1 / 10).expect("always can mint in test");
			Tokens::mint_into(asset_id, &5, balance1 / 10).expect("always can mint in test");
			let r = setup_three_referenda_2(balance1 / 10,asset_id );
			// r.0 locked 10 until 2 + 8 * 3 = #26
			// r.1 locked 20 until 2 + 4 * 3 = #14
			// r.2 locked 50 until 2 + 2 * 3 = #8

			fast_forward_to(7);
			assert_noop!(
				Democracy::remove_other_vote(Origin::signed(1), 5, asset_id, r.2),
				Error::<Test>::NoPermission
			);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id)[0].amount, 50);
			fast_forward_to(8);
			assert_ok!(Democracy::remove_other_vote(Origin::signed(1), 5, asset_id, r.2));
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id)[0].amount, 20);
			fast_forward_to(13);
			assert_noop!(
				Democracy::remove_other_vote(Origin::signed(1), 5, asset_id, r.1),
				Error::<Test>::NoPermission
			);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id)[0].amount, 20);
			fast_forward_to(14);
			assert_ok!(Democracy::remove_other_vote(Origin::signed(1), 5, asset_id, r.1));
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id)[0].amount, 10);
			fast_forward_to(25);
			assert_noop!(
				Democracy::remove_other_vote(Origin::signed(1), 5, asset_id, r.0),
				Error::<Test>::NoPermission
			);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id)[0].amount, 10);
			fast_forward_to(26);
			assert_ok!(Democracy::remove_other_vote(Origin::signed(1), 5, asset_id, r.0));
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id).len(), 0);
		});
	}

	#[test]
	fn locks_should_persist_from_delegation_to_voting(
		asset_id in valid_asset_id(),
		balance1 in valid_amounts_without_overflow_1()) {
		new_test_ext().execute_with(|| {
			System::set_block_number(0);
			Tokens::mint_into(DEFAULT_ASSET, &1, balance1 / 2).expect("always can mint in test");
			Tokens::mint_into(DEFAULT_ASSET, &5, balance1 / 2).expect("always can mint in test");
			assert_ok!(Democracy::delegate(
				Origin::signed(5),
				1,
				DEFAULT_ASSET,
				Conviction::Locked5x,
				balance1 / 10
			));
			assert_ok!(Democracy::undelegate(Origin::signed(5), DEFAULT_ASSET));
			// locked 5 until 16 * 3 = #48

			let r = setup_three_referenda();
			// r.0 locked 10 until 2 + 8 * 3 = #26
			// r.1 locked 20 until 2 + 4 * 3 = #14
			// r.2 locked 50 until 2 + 2 * 3 = #8

			assert_ok!(Democracy::remove_vote(Origin::signed(5), DEFAULT_ASSET, r.2));
			assert_ok!(Democracy::remove_vote(Origin::signed(5), DEFAULT_ASSET, r.1));
			assert_ok!(Democracy::remove_vote(Origin::signed(5), DEFAULT_ASSET, r.0));

			fast_forward_to(8);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, DEFAULT_ASSET));
			assert!(Tokens::locks(&5, DEFAULT_ASSET)[0].amount >= 20);

			fast_forward_to(14);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, DEFAULT_ASSET));
			assert!(Tokens::locks(&5, DEFAULT_ASSET)[0].amount >= 10);

			fast_forward_to(26);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, DEFAULT_ASSET));
			assert!(Tokens::locks(&5, DEFAULT_ASSET)[0].amount >= 5);

			fast_forward_to(48);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, DEFAULT_ASSET));
			assert_eq!(Tokens::locks(&5, DEFAULT_ASSET).len(), 0);
		});
	}

	#[test]
	fn locks_should_persist_from_voting_to_delegation(
		asset_id in valid_asset_id(),
		balance1 in valid_amounts_without_overflow_1()) {
		new_test_ext().execute_with(|| {
			Balances::mint_into(&5, balance1 / 10).expect("always can mint in test");
			Tokens::mint_into(asset_id, &5, balance1 ).expect("always can mint in test");
			System::set_block_number(0);
			let r = Democracy::inject_referendum(
				2,
				set_balance_proposal_hash_and_note_2(balance1, asset_id),
				VoteThreshold::SimpleMajority,
				0,
			);
			assert_ok!(Democracy::vote(Origin::signed(5), r, aye(4, 10)));
			fast_forward_to(2);
			assert_ok!(Democracy::remove_vote(Origin::signed(5), asset_id, r));
			// locked 10 until #26.

			assert_ok!(Democracy::delegate(
				Origin::signed(5),
				1,
				asset_id,
				Conviction::Locked3x,
				balance1
			));
			// locked 20.
			assert_eq!(Tokens::locks(&5, asset_id)[0].amount, balance1 );

			assert_ok!(Democracy::undelegate(Origin::signed(5), asset_id));
			// locked 20 until #14

			fast_forward_to(13);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id)[0].amount, balance1);

			fast_forward_to(14);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert!(Tokens::locks(&5, asset_id)[0].amount >= 10);

			fast_forward_to(25);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert!(Tokens::locks(&5, asset_id)[0].amount >= 10);

			fast_forward_to(26);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id).len(), 0);
		});
	}

	#[test]
	fn multi_consolidation_of_lockvotes_should_be_conservative(
		asset_id in valid_asset_id(),
		balance1 in valid_amounts_without_overflow_1()) {
		new_test_ext().execute_with(|| {
			Balances::mint_into(&5, balance1 / 10).expect("always can mint in test");
			Tokens::mint_into(asset_id, &5, balance1 ).expect("always can mint in test");
			let r = setup_three_referenda_2(balance1, asset_id);
			// r.0 locked 10 until 2 + 8 * 3 = #26
			// r.1 locked 20 until 2 + 4 * 3 = #14
			// r.2 locked 50 until 2 + 2 * 3 = #8

			assert_ok!(Democracy::remove_vote(Origin::signed(5), asset_id, r.2));
			assert_ok!(Democracy::remove_vote(Origin::signed(5), asset_id, r.1));
			assert_ok!(Democracy::remove_vote(Origin::signed(5), asset_id, r.0));

			fast_forward_to(8);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert!(Tokens::locks(&5, asset_id)[0].amount >= 20);

			fast_forward_to(14);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert!(Tokens::locks(&5, asset_id)[0].amount >= 10);

			fast_forward_to(26);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id).len(), 0);
		});
	}


	#[test]
	fn single_consolidation_of_lockvotes_should_work_as_before(
		asset_id in valid_asset_id(),
		balance1 in valid_amounts_without_overflow_1()) {
		new_test_ext().execute_with(|| {
			Balances::mint_into(&5, balance1 / 10).expect("always can mint in test");
			Tokens::mint_into(asset_id, &5, balance1 ).expect("always can mint in test");
			let r = setup_three_referenda_2(balance1, asset_id);
			// r.0 locked 10 until 2 + 8 * 3 = #26
			// r.1 locked 20 until 2 + 4 * 3 = #14
			// r.2 locked 50 until 2 + 2 * 3 = #8

			fast_forward_to(7);
			assert_ok!(Democracy::remove_vote(Origin::signed(5), asset_id, r.2));
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id)[0].amount, 50);
			fast_forward_to(8);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id)[0].amount, 20);

			fast_forward_to(13);
			assert_ok!(Democracy::remove_vote(Origin::signed(5), asset_id, r.1));
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id)[0].amount, 20);
			fast_forward_to(14);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id)[0].amount, 10);

			fast_forward_to(25);
			assert_ok!(Democracy::remove_vote(Origin::signed(5), asset_id, r.0));
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id)[0].amount, 10);
			fast_forward_to(26);
			assert_ok!(Democracy::unlock(Origin::signed(5), 5, asset_id));
			assert_eq!(Tokens::locks(&5, asset_id).len(), 0);
		});
	}
}

#[test]
fn lock_voting_should_work_with_delegation() {
	new_test_ext().execute_with(|| {
		let r = Democracy::inject_referendum(
			2,
			set_balance_proposal_hash_and_note(2),
			VoteThreshold::SuperMajorityApprove,
			0,
		);
		assert_ok!(Democracy::vote(Origin::signed(1), r, nay(5, 10)));
		assert_ok!(Democracy::vote(Origin::signed(2), r, aye(4, 20)));
		assert_ok!(Democracy::vote(Origin::signed(3), r, aye(3, 30)));
		assert_ok!(Democracy::delegate(
			Origin::signed(4),
			2,
			DEFAULT_ASSET,
			Conviction::Locked2x,
			40
		));
		assert_ok!(Democracy::vote(Origin::signed(5), r, nay(1, 50)));

		assert_eq!(tally(r), Tally { ayes: 250, nays: 100, turnout: 150 });

		next_block();
		next_block();

		assert_eq!(Balances::free_balance(42), 2);
	});
}

#[test]
fn lock_voting_should_work() {
	new_test_ext().execute_with(|| {
		System::set_block_number(0);
		let r = Democracy::inject_referendum(
			2,
			set_balance_proposal_hash_and_note(2),
			VoteThreshold::SuperMajorityApprove,
			0,
		);
		assert_ok!(Democracy::vote(Origin::signed(1), r, nay(5, 10)));
		assert_ok!(Democracy::vote(Origin::signed(2), r, aye(4, 20)));
		assert_ok!(Democracy::vote(Origin::signed(3), r, aye(3, 30)));
		assert_ok!(Democracy::vote(Origin::signed(4), r, aye(2, 40)));
		assert_ok!(Democracy::vote(Origin::signed(5), r, nay(1, 50)));
		assert_eq!(tally(r), Tally { ayes: 250, nays: 100, turnout: 150 });

		// All balances are currently locked.
		for i in 1..=5 {
			assert_eq!(Tokens::locks(&i, DEFAULT_ASSET)[0].amount, i * 10);
		}

		fast_forward_to(2);

		// Referendum passed; 1 and 5 didn't get their way and can now reap and unlock.
		assert_ok!(Democracy::remove_vote(Origin::signed(1), DEFAULT_ASSET, r));
		assert_ok!(Democracy::unlock(Origin::signed(1), 1, DEFAULT_ASSET));
		// Anyone can reap and unlock anyone else's in this context.
		assert_ok!(Democracy::remove_other_vote(Origin::signed(2), 5, DEFAULT_ASSET, r));
		assert_ok!(Democracy::unlock(Origin::signed(2), 5, DEFAULT_ASSET));

		// 2, 3, 4 got their way with the vote, so they cannot be reaped by others.
		assert_noop!(
			Democracy::remove_other_vote(Origin::signed(1), 2, DEFAULT_ASSET, r),
			Error::<Test>::NoPermission
		);
		// However, they can be unvoted by the owner, though it will make no difference to the lock.
		assert_ok!(Democracy::remove_vote(Origin::signed(2), DEFAULT_ASSET, r));
		assert_ok!(Democracy::unlock(Origin::signed(2), 2, DEFAULT_ASSET));

		assert_eq!(Tokens::locks(&1, DEFAULT_ASSET).len(), 0);
		assert_eq!(Tokens::locks(&2, DEFAULT_ASSET)[0].amount, 20);
		assert_eq!(Tokens::locks(&3, DEFAULT_ASSET)[0].amount, 30);
		assert_eq!(Tokens::locks(&4, DEFAULT_ASSET)[0].amount, 40);
		assert_eq!(Tokens::locks(&5, DEFAULT_ASSET).len(), 0);
		assert_eq!(Balances::free_balance(&42), 2);

		fast_forward_to(7);
		// No change yet...
		assert_noop!(
			Democracy::remove_other_vote(Origin::signed(1), 4, DEFAULT_ASSET, r),
			Error::<Test>::NoPermission
		);
		assert_ok!(Democracy::unlock(Origin::signed(1), 4, DEFAULT_ASSET));
		assert_eq!(Tokens::locks(&4, DEFAULT_ASSET)[0].amount, 40);
		fast_forward_to(8);
		// 4 should now be able to reap and unlock
		assert_ok!(Democracy::remove_other_vote(Origin::signed(1), 4, DEFAULT_ASSET, r));
		assert_ok!(Democracy::unlock(Origin::signed(1), 4, DEFAULT_ASSET));
		assert_eq!(Tokens::locks(&4, DEFAULT_ASSET).len(), 0);

		fast_forward_to(13);
		assert_noop!(
			Democracy::remove_other_vote(Origin::signed(1), 3, DEFAULT_ASSET, r),
			Error::<Test>::NoPermission
		);
		assert_ok!(Democracy::unlock(Origin::signed(1), 3, DEFAULT_ASSET));
		assert_eq!(Tokens::locks(&3, DEFAULT_ASSET)[0].amount, 30);
		fast_forward_to(14);
		assert_ok!(Democracy::remove_other_vote(Origin::signed(1), 3, DEFAULT_ASSET, r));
		assert_ok!(Democracy::unlock(Origin::signed(1), 3, DEFAULT_ASSET));
		assert_eq!(Tokens::locks(&3, DEFAULT_ASSET).len(), 0);

		// 2 doesn't need to reap_vote here because it was already done before.
		fast_forward_to(25);
		assert_ok!(Democracy::unlock(Origin::signed(1), 2, DEFAULT_ASSET));
		assert_eq!(Tokens::locks(&2, DEFAULT_ASSET)[0].amount, 20);
		fast_forward_to(26);
		assert_ok!(Democracy::unlock(Origin::signed(1), 2));
		assert_eq!(Balances::locks(2), vec![]);
	});
}

fn setup_three_referenda() -> (u32, u32, u32) {
	setup_three_referenda_2(2, DEFAULT_ASSET)
}

fn setup_three_referenda_2(value: u64, asset_id: AssetId) -> (u32, u32, u32) {
	System::set_block_number(0);
	let r1 = Democracy::inject_referendum(
		2,
		set_balance_proposal_hash_and_note_2(value, asset_id),
		VoteThreshold::SimpleMajority,
		0,
	);
	assert_ok!(Democracy::vote(Origin::signed(5), r1, aye(4, 10)));

	let r2 = Democracy::inject_referendum(
		2,
		set_balance_proposal_hash_and_note_2(value, asset_id),
		VoteThreshold::SimpleMajority,
		0,
	);
	assert_ok!(Democracy::vote(Origin::signed(5), r2, aye(3, 20)));

	let r3 = Democracy::inject_referendum(
		2,
		set_balance_proposal_hash_and_note_2(value, asset_id),
		VoteThreshold::SimpleMajority,
		0,
	);
	assert_ok!(Democracy::vote(Origin::signed(5), r3, aye(2, 50)));

	fast_forward_to(2);

	(r1, r2, r3)
}
