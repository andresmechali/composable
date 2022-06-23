use super::block_producer::{BlockProducer, BlocksConfig, Run};
use crate::mock::{
	accounts::AccountId,
	runtime::{
		Balance, BlockNumber, MockRuntime, Moment, OptionId, Origin, System, Timestamp,
		TokenizedOptions,
	},
};
use proptest::prelude::{prop, prop_compose};
use sp_runtime::DispatchResult;
use std::ops::Range;

fn xxx(mut block_producer: BlockProducer<TokenizedOptionsBlocksConfig>) {
	while let Some(block) = block_producer.next_block() {
		drop(block);
	}
}

#[test]
fn test34738473497() {
	//
}

enum TokenizedOptionsBlocksConfig {}

impl BlocksConfig for TokenizedOptionsBlocksConfig {
	type Runtime = MockRuntime;
	type Hooked = TokenizedOptions;
	type Extrinsic = TokenizedOptionsExtrinsic;
}

#[allow(clippy::enum_variant_names)]
#[derive(Clone, Debug)]
enum TokenizedOptionsExtrinsic {
	SellOption { account_id: AccountId, option_amount: Balance, option_id: OptionId },
	DeleteSellOption { account_id: AccountId, option_amount: Balance, option_id: OptionId },
	BuyOption { account_id: AccountId, option_amount: Balance, option_id: OptionId },
}

impl Run for TokenizedOptionsExtrinsic {
	fn run(&self) -> DispatchResult {
		match self {
			TokenizedOptionsExtrinsic::SellOption { account_id, option_amount, option_id } => {
				TokenizedOptions::sell_option(
					Origin::signed(*account_id),
					*option_amount,
					*option_id,
				)
			},
			TokenizedOptionsExtrinsic::DeleteSellOption {
				account_id,
				option_amount,
				option_id,
			} => TokenizedOptions::delete_sell_option(
				Origin::signed(*account_id),
				*option_amount,
				*option_id,
			),
			TokenizedOptionsExtrinsic::BuyOption { account_id, option_amount, option_id } => {
				TokenizedOptions::buy_option(
					Origin::signed(*account_id),
					*option_amount,
					*option_id,
				)
			},
		}
	}
}

impl TokenizedOptionsExtrinsic {
	prop_compose! {
		fn generate(
			account_ids: Vec<AccountId>,
			option_amount_range: Range<Balance>,
			option_ids: Vec<OptionId>,
		)(
			extrinsic_type in 0..3,
			account_id in prop::sample::select(account_ids),
			option_amount in option_amount_range,
			option_id in prop::sample::select(option_ids),
		) -> Self {
			match extrinsic_type {
				0 => TokenizedOptionsExtrinsic::SellOption { account_id, option_amount, option_id },
				1 => TokenizedOptionsExtrinsic::DeleteSellOption { account_id, option_amount, option_id },
				_ => TokenizedOptionsExtrinsic::BuyOption { account_id, option_amount, option_id },
			}
		}
	}
}
