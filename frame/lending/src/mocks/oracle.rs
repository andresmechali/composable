pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
	use codec::Codec;
	use composable_traits::{
		currency::PriceableAsset,
		oracle::{Oracle, Price},
		vault::Vault,
	};
	use frame_support::pallet_prelude::*;
	use sp_runtime::{helpers_128bit::multiply_by_rational, ArithmeticError, FixedPointNumber};
	use sp_std::fmt::Debug;

	use crate::mocks::{Balance, MockCurrencyId};

	#[pallet::config]
	pub trait Config: frame_system::Config {
		type VaultId: Clone + Codec + Debug + PartialEq + Default + Parameter;
		type Vault: Vault<AssetId = MockCurrencyId, VaultId = Self::VaultId, Balance = Balance>;
	}

	#[pallet::pallet]
	#[pallet::generate_store(pub(super) trait Store)]
	pub struct Pallet<T>(_);

	#[pallet::storage]
	#[pallet::getter(fn btc_value)]
	pub type BTCValue<T: Config> = StorageValue<_, u128, ValueQuery>;

	impl<T: Config> Pallet<T> {
		pub fn get_price(
			asset: MockCurrencyId,
			amount: Balance,
		) -> Result<Price<Balance, ()>, DispatchError> {
			<Self as Oracle>::get_price(asset, amount)
		}
		pub fn set_btc_price(price: u128) {
			BTCValue::<T>::set(price)
		}
	}

	impl<T: Config> Oracle for Pallet<T> {
		type AssetId = MockCurrencyId;
		type Balance = Balance;
		type Timestamp = ();

		fn get_price(
			asset: Self::AssetId,
			amount: Balance,
		) -> Result<Price<Self::Balance, Self::Timestamp>, DispatchError> {
			let derive_price = |p: u128, a: u128| {
				let e = 10u128
					.checked_pow(asset.smallest_unit_exponent())
					.ok_or(DispatchError::Arithmetic(ArithmeticError::Overflow))?;
				let price = multiply_by_rational(p, a, e)
					.map_err(|_| DispatchError::Arithmetic(ArithmeticError::Overflow))?;
				Ok(Price { price, block: () })
			};
			match asset {
				/* NOTE(hussein-aitlahcen)
					Ideally we would have all the static currency quoted against USD cents on chain.
					So that we would be able to derive LP tokens price.
				*/
				MockCurrencyId::USDT => Ok(Price { price: amount, block: () }),
				MockCurrencyId::PICA => derive_price(10_00, amount),
				MockCurrencyId::BTC => derive_price(Self::btc_value(), amount),
				MockCurrencyId::ETH => derive_price(3400_00, amount),
				MockCurrencyId::LTC => derive_price(180_00, amount),

				/* NOTE(hussein-aitlahcen)
					If we want users to be able to consider LP tokens as currency,
					the oracle should know the whole currency system in order to
					recursively resolve the price of an LP token generated by an
					arbitrary level of vaults.

					The base asset represented by the level 0 (out of LpToken case)
					should have a price defined.

					One exception can occur if the LP token hasn't been generated by a vault.
				*/
				x @ MockCurrencyId::LpToken(_) => {
					let vault = T::Vault::token_vault(x)?;
					let base = T::Vault::asset_id(&vault)?;
					let Price { price, block } = Self::get_price(base, amount)?;
					let rate = T::Vault::stock_dilution_rate(&vault)?;
					let derived = rate
						.checked_mul_int(price)
						.ok_or(DispatchError::Arithmetic(ArithmeticError::Overflow))?;
					Ok(Price { price: derived, block })
				},
			}
		}

		fn get_twap(
			_of: Self::AssetId,
			_weights: Vec<u128>,
		) -> Result<Self::Balance, DispatchError> {
			Ok(0u32.into())
		}
	}
}
