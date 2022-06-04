/// Default interface used to interact with financial NFTs through a NFT provider.
/// 
/// Allows  allows to enter positions and sell it before position is left as NFT.
/// Allows to split financial positions.
/// 
/// # Design
/// There are 2 ways to integrate NFT and financial positions.
/// 
/// Store all metadata of position in NFT BLOB or store only reference in NFT.
/// 
/// In case of storing reference,
/// - NFT account produced from identity is set as owner of position
/// - protocol providing position implements trait which allow to work with it through NFT API
/// - position is stored in any way efficient for that
/// - NFT stores only reference to position in protocol, example pallet identifier and some monotonous identifier
/// - during XCMP transfer, owner of NFT become target parachain
/// - allow to build NFTs from lower level typed positions
/// 
/// So NFT is (class, id, position reference)
/// 
/// 
/// In case of storing all data in NFT, 
/// -  protocol calls NFT to read state 
/// - storage is not maximally efficient
/// - more risks of having serde issue and types
/// 
/// In both cases XCMP NFT state as whole requires protocol constraints, like immutability or protocol implementation on other side.   
/// In both cases RPC or shared library is required to interpret state offchain.




// ///
// /// The interface will always fully serialize/deserialize the NFT type with the NFT::Version as
// /// single attribute key.
// pub trait FinancialNftProtocol<AccountId: Eq> {
// 	/// Abstract type of a class id.
// 	type ClassId: FullCodec + TypeInfo;

// 	/// Abstract type of an instance id. Used to uniquely identify NFTs.
// 	type InstanceId: Copy + Eq + Debug + FullCodec + TypeInfo;

// 	/// Abstract type of a version. Used to migrate NFT when updating their content.
// 	/// Migration must be done by the protocol operating on the NFT type.
// 	type Version: FullCodec + TypeInfo;

// 	/// NFT provider from which we load/store NFT's.
// 	type NFTProvider: FinancialNftProvider<
// 		AccountId,
// 		ClassId = Self::ClassId,
// 		InstanceId = Self::InstanceId,
// 	>;

// 	/// Mint a new NFT into an account.
// 	///
// 	/// Arguments
// 	///
// 	/// * `owner` the owner of the minted NFT.
// 	/// * `nft` the initial value of the minted NFT.
// 	///
// 	/// Return the NFT instance id if successfull, otherwise the underlying NFT provider error.
// 	fn mint_protocol_nft<NFT>(
// 		owner: &AccountId,
// 		nft: &NFT,
// 	) -> Result<Self::InstanceId, DispatchError>
// 	where
// 		NFT: Get<Self::ClassId> + Get<Self::Version> + Encode,
// 	{
// 		Self::NFTProvider::mint_nft(&NFT::get(), owner, &<NFT as Get<Self::Version>>::get(), &nft)
// 	}

// 	/// Return an NFT identified by its instance id.
// 	///
// 	/// Arguments
// 	///
// 	/// * `instance_id` the NFT instance id.
// 	fn get_protocol_nft<NFT>(instance_id: &Self::InstanceId) -> Result<NFT, DispatchError>
// 	where
// 		NFT: Get<Self::ClassId> + Get<Self::Version> + Decode,
// 	{
// 		Self::NFTProvider::typed_attribute(
// 			&NFT::get(),
// 			instance_id,
// 			&<NFT as Get<Self::Version>>::get(),
// 		)
// 		.ok_or(DispatchError::Token(TokenError::UnknownAsset))
// 	}

// 	/// Mutate the NFT identified by `instance_id`.
// 	///
// 	/// Arguments
// 	///
// 	/// * `T` the callback return value.
// 	/// * `E` the callback error value.
// 	///
// 	/// * `instance_id` the NFT instance id.
// 	/// * `f` the callback in charge of mutating the NFT.
// 	///
// 	/// Returns the result of the callback, either `T` or `E`.
// 	fn try_mutate_protocol_nft<NFT, T, E>(
// 		instance_id: &Self::InstanceId,
// 		f: impl FnOnce(&mut NFT) -> Result<T, E>,
// 	) -> Result<T, E>
// 	where
// 		NFT: Get<Self::ClassId> + Get<Self::Version> + Encode + Decode,
// 		E: From<DispatchError>,
// 	{
// 		let mut nft = Self::get_protocol_nft(instance_id)?;
// 		let r = f(&mut nft)?;
// 		Self::NFTProvider::set_typed_attribute(
// 			&NFT::get(),
// 			instance_id,
// 			&<NFT as Get<Self::Version>>::get(),
// 			&nft,
// 		)?;
// 		Ok(r)
// 	}

// 	/// Destroy the given NFT. Irreversible operation.
// 	///
// 	/// Arguments
// 	///
// 	/// * `instance_id` the NFT instance to destroy.
// 	fn burn_protocol_nft<NFT>(instance_id: &Self::InstanceId) -> DispatchResult
// 	where
// 		NFT: Get<Self::ClassId>,
// 	{
// 		let owner = Self::NFTProvider::owner(&NFT::get(), instance_id);
// 		Self::NFTProvider::burn(&NFT::get(), instance_id, owner.as_ref())
// 	}
// }