// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Asset } from "@/defi/polkadot/interfaces/assets";
import type {
  AssetsBalance,
  ComposableTraitsDefiCurrencyPairCurrencyId,
  ComposableTraitsDefiSellCurrencyId,
  ComposableTraitsXcmCumulusMethodId,
  ComposableTraitsXcmXcmSellRequest,
  CurrencyId,
  CustomRpcBalance,
  CustomRpcCurrencyId,
  SafeRpcWrapper
} from "@/defi/polkadot/interfaces/common";
import type {
  CommonMosaicRemoteAssetId,
  ComposableSupportEthereumAddress,
  ComposableTraitsAssetsBasicAssetMetadata,
  ComposableTraitsAssetsXcmAssetLocation,
  ComposableTraitsAuctionAuctionStepFunction,
  ComposableTraitsBondedFinanceBondDuration,
  ComposableTraitsBondedFinanceBondOffer,
  ComposableTraitsBondedFinanceBondOfferReward,
  ComposableTraitsCallFilterCallFilterEntry,
  ComposableTraitsDefiSell,
  ComposableTraitsDefiTake,
  ComposableTraitsDexConsantProductPoolInfo,
  ComposableTraitsDexConstantProductPoolInfo,
  ComposableTraitsDexDexRoute,
  ComposableTraitsDexStableSwapPoolInfo,
  ComposableTraitsGovernanceSignedRawOrigin,
  ComposableTraitsLendingCreateInput,
  ComposableTraitsLendingMarketConfig,
  ComposableTraitsLendingRepayStrategy,
  ComposableTraitsLendingUpdateInput,
  ComposableTraitsOraclePrice,
  ComposableTraitsTimeTimeReleaseFunction,
  ComposableTraitsVaultVaultConfig,
  ComposableTraitsVestingVestingSchedule,
  ComposableTraitsXcmAssetsForeignMetadata,
  ComposableTraitsXcmAssetsXcmAssetLocation,
  CumulusPalletDmpQueueConfigData,
  CumulusPalletDmpQueuePageIndexData,
  CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot,
  CumulusPalletXcmpQueueInboundChannelDetails,
  CumulusPalletXcmpQueueInboundStatus,
  CumulusPalletXcmpQueueOutboundChannelDetails,
  CumulusPalletXcmpQueueOutboundStatus,
  CumulusPalletXcmpQueueQueueConfigData,
  CumulusPrimitivesParachainInherentParachainInherentData,
  DaliRuntimeOpaqueSessionKeys,
  DaliRuntimeOriginCaller,
  FrameSupportScheduleLookupError,
  FrameSupportScheduleMaybeHashed,
  OrmlTokensAccountData,
  OrmlTokensBalanceLock,
  PalletAssetsRegistryCandidateStatus,
  PalletAssetsRegistryForeignMetadata,
  PalletCollatorSelectionCandidateInfo,
  PalletCrowdloanRewardsModelsEcdsaSignature,
  PalletCrowdloanRewardsModelsProof,
  PalletCrowdloanRewardsModelsRemoteAccount,
  PalletCrowdloanRewardsModelsReward,
  PalletCrowdloanRewardsReward,
  PalletCurrencyFactoryRanges,
  PalletCurrencyFactoryRangesRange,
  PalletDemocracyConviction,
  PalletDemocracyPreimageStatus,
  PalletDemocracyReferendumInfo,
  PalletDemocracyReleases,
  PalletDemocracyVoteAccountVote,
  PalletDemocracyVoteThreshold,
  PalletDemocracyVoteVoting,
  PalletDutchAuctionSellOrder,
  PalletDutchAuctionTakeOrder,
  PalletIdentityBitFlags,
  PalletIdentityIdentityInfo,
  PalletIdentityJudgement,
  PalletIdentityRegistrarInfo,
  PalletIdentityRegistration,
  PalletLiquidationsLiquidationStrategyConfiguration,
  PalletLiquidityBootstrappingPool,
  PalletMosaicAssetInfo,
  PalletMosaicDecayBudgetPenaltyDecayer,
  PalletMosaicNetworkInfo,
  PalletMosaicRelayerStaleRelayer,
  PalletOracleAssetInfo,
  PalletOraclePrePrice,
  PalletOraclePrice,
  PalletOracleWithdraw,
  PalletPreimageRequestStatus,
  PalletSchedulerReleases,
  PalletSchedulerScheduledV2,
  PalletSchedulerScheduledV3,
  PalletTreasuryProposal,
  PalletVaultModelsStrategyOverview,
  PalletVaultModelsVaultInfo,
  PolkadotParachainPrimitivesXcmpMessageFormat,
  PolkadotPrimitivesV1AbridgedHostConfiguration,
  PolkadotPrimitivesV1PersistedValidationData,
  SpConsensusAuraSr25519AppSr25519Public,
  SpTrieStorageProof,
  XcmVersionedMultiAsset
} from "@/defi/polkadot/interfaces/crowdloanRewards";
import type {
  ComposableTraitsDexFee,
  PalletPabloPoolConfiguration,
  PalletPabloPoolId,
  PalletPabloPoolInitConfiguration,
  PalletPabloPriceAggregate,
  PalletPabloPriceCumulative,
  PalletPabloTimeWeightedAveragePrice
} from "@/defi/polkadot/interfaces/pablo";
import type { Data, StorageKey } from "@polkadot/types";
import type {
  BitVec,
  Bool,
  Bytes,
  I128,
  I16,
  I256,
  I32,
  I64,
  I8,
  Json,
  Null,
  Raw,
  Text,
  Type,
  U128,
  U16,
  U256,
  U32,
  U64,
  U8,
  USize,
  bool,
  i128,
  i16,
  i256,
  i32,
  i64,
  i8,
  u128,
  u16,
  u256,
  u32,
  u64,
  u8,
  usize
} from "@polkadot/types-codec";
import type { BlockAttestations, IncludedBlocks, MoreAttestations } from "@polkadot/types/interfaces/attestations";
import type { RawAuraPreDigest } from "@polkadot/types/interfaces/aura";
import type { ExtrinsicOrHash, ExtrinsicStatus } from "@polkadot/types/interfaces/author";
import type { UncleEntryItem } from "@polkadot/types/interfaces/authorship";
import type {
  AllowedSlots,
  BabeAuthorityWeight,
  BabeBlockWeight,
  BabeEpochConfiguration,
  BabeEquivocationProof,
  BabeWeight,
  EpochAuthorship,
  MaybeRandomness,
  MaybeVrf,
  NextConfigDescriptor,
  NextConfigDescriptorV1,
  Randomness,
  RawBabePreDigest,
  RawBabePreDigestCompat,
  RawBabePreDigestPrimary,
  RawBabePreDigestPrimaryTo159,
  RawBabePreDigestSecondaryPlain,
  RawBabePreDigestSecondaryTo159,
  RawBabePreDigestSecondaryVRF,
  RawBabePreDigestTo159,
  SlotNumber,
  VrfData,
  VrfOutput,
  VrfProof
} from "@polkadot/types/interfaces/babe";
import type {
  AccountData,
  BalanceLock,
  BalanceLockTo212,
  BalanceStatus,
  Reasons,
  ReserveData,
  ReserveIdentifier,
  VestingSchedule,
  WithdrawReasons
} from "@polkadot/types/interfaces/balances";
import type {
  BeefyCommitment,
  BeefyId,
  BeefyNextAuthoritySet,
  BeefyPayload,
  BeefySignedCommitment,
  MmrRootHash,
  ValidatorSetId
} from "@polkadot/types/interfaces/beefy";
import type {
  BridgeMessageId,
  BridgedBlockHash,
  BridgedBlockNumber,
  BridgedHeader,
  CallOrigin,
  ChainId,
  DeliveredMessages,
  DispatchFeePayment,
  InboundLaneData,
  InboundRelayer,
  InitializationData,
  LaneId,
  MessageData,
  MessageKey,
  MessageNonce,
  MessagesDeliveryProofOf,
  MessagesProofOf,
  OperatingMode,
  OutboundLaneData,
  OutboundMessageFee,
  OutboundPayload,
  Parameter,
  RelayerId,
  UnrewardedRelayer,
  UnrewardedRelayersState
} from "@polkadot/types/interfaces/bridges";
import type { BlockHash } from "@polkadot/types/interfaces/chain";
import type { PrefixedStorageKey } from "@polkadot/types/interfaces/childstate";
import type { StatementKind } from "@polkadot/types/interfaces/claims";
import type {
  CollectiveOrigin,
  MemberCount,
  ProposalIndex,
  Votes,
  VotesTo230
} from "@polkadot/types/interfaces/collective";
import type { AuthorityId, RawVRFOutput } from "@polkadot/types/interfaces/consensus";
import type {
  AliveContractInfo,
  CodeHash,
  CodeSource,
  CodeUploadRequest,
  CodeUploadResult,
  CodeUploadResultValue,
  ContractCallFlags,
  ContractCallRequest,
  ContractExecResult,
  ContractExecResultOk,
  ContractExecResultResult,
  ContractExecResultSuccessTo255,
  ContractExecResultSuccessTo260,
  ContractExecResultTo255,
  ContractExecResultTo260,
  ContractExecResultTo267,
  ContractInfo,
  ContractInstantiateResult,
  ContractInstantiateResultTo267,
  ContractInstantiateResultTo299,
  ContractReturnFlags,
  ContractStorageKey,
  DeletedContract,
  ExecReturnValue,
  Gas,
  HostFnWeights,
  HostFnWeightsTo264,
  InstantiateRequest,
  InstantiateRequestV1,
  InstantiateRequestV2,
  InstantiateReturnValue,
  InstantiateReturnValueOk,
  InstantiateReturnValueTo267,
  InstructionWeights,
  Limits,
  LimitsTo264,
  PrefabWasmModule,
  RentProjection,
  Schedule,
  ScheduleTo212,
  ScheduleTo258,
  ScheduleTo264,
  SeedOf,
  StorageDeposit,
  TombstoneContractInfo,
  TrieId
} from "@polkadot/types/interfaces/contracts";
import type {
  ContractConstructorSpecLatest,
  ContractConstructorSpecV0,
  ContractConstructorSpecV1,
  ContractConstructorSpecV2,
  ContractConstructorSpecV3,
  ContractContractSpecV0,
  ContractContractSpecV1,
  ContractContractSpecV2,
  ContractContractSpecV3,
  ContractCryptoHasher,
  ContractDiscriminant,
  ContractDisplayName,
  ContractEventParamSpecLatest,
  ContractEventParamSpecV0,
  ContractEventParamSpecV2,
  ContractEventSpecLatest,
  ContractEventSpecV0,
  ContractEventSpecV1,
  ContractEventSpecV2,
  ContractLayoutArray,
  ContractLayoutCell,
  ContractLayoutEnum,
  ContractLayoutHash,
  ContractLayoutHashingStrategy,
  ContractLayoutKey,
  ContractLayoutStruct,
  ContractLayoutStructField,
  ContractMessageParamSpecLatest,
  ContractMessageParamSpecV0,
  ContractMessageParamSpecV2,
  ContractMessageSpecLatest,
  ContractMessageSpecV0,
  ContractMessageSpecV1,
  ContractMessageSpecV2,
  ContractMetadata,
  ContractMetadataLatest,
  ContractMetadataV0,
  ContractMetadataV1,
  ContractMetadataV2,
  ContractMetadataV3,
  ContractProject,
  ContractProjectContract,
  ContractProjectInfo,
  ContractProjectSource,
  ContractProjectV0,
  ContractSelector,
  ContractStorageLayout,
  ContractTypeSpec
} from "@polkadot/types/interfaces/contractsAbi";
import type { FundIndex, FundInfo, LastContribution, TrieIndex } from "@polkadot/types/interfaces/crowdloan";
import type {
  ConfigData,
  MessageId,
  OverweightIndex,
  PageCounter,
  PageIndexData
} from "@polkadot/types/interfaces/cumulus";
import type {
  AccountVote,
  AccountVoteSplit,
  AccountVoteStandard,
  Conviction,
  Delegations,
  PreimageStatus,
  PreimageStatusAvailable,
  PriorLock,
  PropIndex,
  Proposal,
  ProxyState,
  ReferendumIndex,
  ReferendumInfo,
  ReferendumInfoFinished,
  ReferendumInfoTo239,
  ReferendumStatus,
  Tally,
  Voting,
  VotingDelegating,
  VotingDirect,
  VotingDirectVote
} from "@polkadot/types/interfaces/democracy";
import type {
  ApprovalFlag,
  DefunctVoter,
  Renouncing,
  SetIndex,
  Vote,
  VoteIndex,
  VoteThreshold,
  VoterInfo
} from "@polkadot/types/interfaces/elections";
import type { CreatedBlock, ImportedAux } from "@polkadot/types/interfaces/engine";
import type {
  BlockV0,
  BlockV1,
  BlockV2,
  EIP1559Transaction,
  EIP2930Transaction,
  EthAccessList,
  EthAccessListItem,
  EthAccount,
  EthAddress,
  EthBlock,
  EthBloom,
  EthCallRequest,
  EthFilter,
  EthFilterAddress,
  EthFilterChanges,
  EthFilterTopic,
  EthFilterTopicEntry,
  EthFilterTopicInner,
  EthHeader,
  EthLog,
  EthReceipt,
  EthRichBlock,
  EthRichHeader,
  EthStorageProof,
  EthSubKind,
  EthSubParams,
  EthSubResult,
  EthSyncInfo,
  EthSyncStatus,
  EthTransaction,
  EthTransactionAction,
  EthTransactionCondition,
  EthTransactionRequest,
  EthTransactionSignature,
  EthTransactionStatus,
  EthWork,
  EthereumAccountId,
  EthereumAddress,
  EthereumLookupSource,
  EthereumSignature,
  LegacyTransaction,
  TransactionV0,
  TransactionV1,
  TransactionV2
} from "@polkadot/types/interfaces/eth";
import type {
  EvmAccount,
  EvmLog,
  EvmVicinity,
  ExitError,
  ExitFatal,
  ExitReason,
  ExitRevert,
  ExitSucceed
} from "@polkadot/types/interfaces/evm";
import type {
  AnySignature,
  EcdsaSignature,
  Ed25519Signature,
  Era,
  Extrinsic,
  ExtrinsicEra,
  ExtrinsicPayload,
  ExtrinsicPayloadUnknown,
  ExtrinsicPayloadV4,
  ExtrinsicSignature,
  ExtrinsicSignatureV4,
  ExtrinsicUnknown,
  ExtrinsicV4,
  ImmortalEra,
  MortalEra,
  MultiSignature,
  Signature,
  SignerPayload,
  Sr25519Signature
} from "@polkadot/types/interfaces/extrinsics";
import type {
  AssetOptions,
  Owner,
  PermissionLatest,
  PermissionVersions,
  PermissionsV1
} from "@polkadot/types/interfaces/genericAsset";
import type { ActiveGilt, ActiveGiltsTotal, ActiveIndex, GiltBid } from "@polkadot/types/interfaces/gilt";
import type {
  AuthorityIndex,
  AuthorityList,
  AuthoritySet,
  AuthoritySetChange,
  AuthoritySetChanges,
  AuthorityWeight,
  DelayKind,
  DelayKindBest,
  EncodedFinalityProofs,
  ForkTreePendingChange,
  ForkTreePendingChangeNode,
  GrandpaCommit,
  GrandpaEquivocation,
  GrandpaEquivocationProof,
  GrandpaEquivocationValue,
  GrandpaJustification,
  GrandpaPrecommit,
  GrandpaPrevote,
  GrandpaSignedPrecommit,
  JustificationNotification,
  KeyOwnerProof,
  NextAuthority,
  PendingChange,
  PendingPause,
  PendingResume,
  Precommits,
  Prevotes,
  ReportedRoundStates,
  RoundState,
  SetId,
  StoredPendingChange,
  StoredState
} from "@polkadot/types/interfaces/grandpa";
import type {
  IdentityFields,
  IdentityInfo,
  IdentityInfoAdditional,
  IdentityInfoTo198,
  IdentityJudgement,
  RegistrarIndex,
  RegistrarInfo,
  Registration,
  RegistrationJudgement,
  RegistrationTo198
} from "@polkadot/types/interfaces/identity";
import type {
  AuthIndex,
  AuthoritySignature,
  Heartbeat,
  HeartbeatTo244,
  OpaqueMultiaddr,
  OpaqueNetworkState,
  OpaquePeerId
} from "@polkadot/types/interfaces/imOnline";
import type { CallIndex, LotteryConfig } from "@polkadot/types/interfaces/lottery";
import type {
  ErrorMetadataLatest,
  ErrorMetadataV10,
  ErrorMetadataV11,
  ErrorMetadataV12,
  ErrorMetadataV13,
  ErrorMetadataV14,
  ErrorMetadataV9,
  EventMetadataLatest,
  EventMetadataV10,
  EventMetadataV11,
  EventMetadataV12,
  EventMetadataV13,
  EventMetadataV14,
  EventMetadataV9,
  ExtrinsicMetadataLatest,
  ExtrinsicMetadataV11,
  ExtrinsicMetadataV12,
  ExtrinsicMetadataV13,
  ExtrinsicMetadataV14,
  FunctionArgumentMetadataLatest,
  FunctionArgumentMetadataV10,
  FunctionArgumentMetadataV11,
  FunctionArgumentMetadataV12,
  FunctionArgumentMetadataV13,
  FunctionArgumentMetadataV14,
  FunctionArgumentMetadataV9,
  FunctionMetadataLatest,
  FunctionMetadataV10,
  FunctionMetadataV11,
  FunctionMetadataV12,
  FunctionMetadataV13,
  FunctionMetadataV14,
  FunctionMetadataV9,
  MetadataAll,
  MetadataLatest,
  MetadataV10,
  MetadataV11,
  MetadataV12,
  MetadataV13,
  MetadataV14,
  MetadataV9,
  ModuleConstantMetadataV10,
  ModuleConstantMetadataV11,
  ModuleConstantMetadataV12,
  ModuleConstantMetadataV13,
  ModuleConstantMetadataV9,
  ModuleMetadataV10,
  ModuleMetadataV11,
  ModuleMetadataV12,
  ModuleMetadataV13,
  ModuleMetadataV9,
  PalletCallMetadataLatest,
  PalletCallMetadataV14,
  PalletConstantMetadataLatest,
  PalletConstantMetadataV14,
  PalletErrorMetadataLatest,
  PalletErrorMetadataV14,
  PalletEventMetadataLatest,
  PalletEventMetadataV14,
  PalletMetadataLatest,
  PalletMetadataV14,
  PalletStorageMetadataLatest,
  PalletStorageMetadataV14,
  PortableType,
  PortableTypeV14,
  SignedExtensionMetadataLatest,
  SignedExtensionMetadataV14,
  StorageEntryMetadataLatest,
  StorageEntryMetadataV10,
  StorageEntryMetadataV11,
  StorageEntryMetadataV12,
  StorageEntryMetadataV13,
  StorageEntryMetadataV14,
  StorageEntryMetadataV9,
  StorageEntryModifierLatest,
  StorageEntryModifierV10,
  StorageEntryModifierV11,
  StorageEntryModifierV12,
  StorageEntryModifierV13,
  StorageEntryModifierV14,
  StorageEntryModifierV9,
  StorageEntryTypeLatest,
  StorageEntryTypeV10,
  StorageEntryTypeV11,
  StorageEntryTypeV12,
  StorageEntryTypeV13,
  StorageEntryTypeV14,
  StorageEntryTypeV9,
  StorageHasher,
  StorageHasherV10,
  StorageHasherV11,
  StorageHasherV12,
  StorageHasherV13,
  StorageHasherV14,
  StorageHasherV9,
  StorageMetadataV10,
  StorageMetadataV11,
  StorageMetadataV12,
  StorageMetadataV13,
  StorageMetadataV9
} from "@polkadot/types/interfaces/metadata";
import type { MmrLeafProof } from "@polkadot/types/interfaces/mmr";
import type { StorageKind } from "@polkadot/types/interfaces/offchain";
import type {
  DeferredOffenceOf,
  Kind,
  OffenceDetails,
  Offender,
  OpaqueTimeSlot,
  ReportIdOf,
  Reporter
} from "@polkadot/types/interfaces/offences";
import type {
  AbridgedCandidateReceipt,
  AbridgedHostConfiguration,
  AbridgedHrmpChannel,
  AssignmentId,
  AssignmentKind,
  AttestedCandidate,
  AuctionIndex,
  AuthorityDiscoveryId,
  AvailabilityBitfield,
  AvailabilityBitfieldRecord,
  BackedCandidate,
  Bidder,
  BufferedSessionChange,
  CandidateCommitments,
  CandidateDescriptor,
  CandidateHash,
  CandidateInfo,
  CandidatePendingAvailability,
  CandidateReceipt,
  CollatorId,
  CollatorSignature,
  CommittedCandidateReceipt,
  CoreAssignment,
  CoreIndex,
  CoreOccupied,
  DisputeLocation,
  DisputeResult,
  DisputeState,
  DisputeStatement,
  DisputeStatementSet,
  DoubleVoteReport,
  DownwardMessage,
  ExplicitDisputeStatement,
  GlobalValidationData,
  GlobalValidationSchedule,
  GroupIndex,
  HeadData,
  HostConfiguration,
  HrmpChannel,
  HrmpChannelId,
  HrmpOpenChannelRequest,
  InboundDownwardMessage,
  InboundHrmpMessage,
  InboundHrmpMessages,
  IncomingParachain,
  IncomingParachainDeploy,
  IncomingParachainFixed,
  InvalidDisputeStatementKind,
  LeasePeriod,
  LeasePeriodOf,
  LocalValidationData,
  MessageIngestionType,
  MessageQueueChain,
  MessagingStateSnapshot,
  MessagingStateSnapshotEgressEntry,
  MultiDisputeStatementSet,
  NewBidder,
  OutboundHrmpMessage,
  ParaGenesisArgs,
  ParaId,
  ParaInfo,
  ParaLifecycle,
  ParaPastCodeMeta,
  ParaScheduling,
  ParaValidatorIndex,
  ParachainDispatchOrigin,
  ParachainInherentData,
  ParachainProposal,
  ParachainsInherentData,
  ParathreadClaim,
  ParathreadClaimQueue,
  ParathreadEntry,
  PersistedValidationData,
  QueuedParathread,
  RegisteredParachainInfo,
  RelayBlockNumber,
  RelayChainBlockNumber,
  RelayChainHash,
  RelayHash,
  Remark,
  ReplacementTimes,
  Retriable,
  Scheduling,
  ServiceQuality,
  SessionInfo,
  SessionInfoValidatorGroup,
  SignedAvailabilityBitfield,
  SignedAvailabilityBitfields,
  SigningContext,
  SlotRange,
  SlotRange10,
  Statement,
  SubId,
  SystemInherentData,
  TransientValidationData,
  UpgradeGoAhead,
  UpgradeRestriction,
  UpwardMessage,
  ValidDisputeStatementKind,
  ValidationCode,
  ValidationCodeHash,
  ValidationData,
  ValidationDataType,
  ValidationFunctionParams,
  ValidatorSignature,
  ValidityAttestation,
  VecInboundHrmpMessage,
  WinnersData,
  WinnersData10,
  WinnersDataTuple,
  WinnersDataTuple10,
  WinningData,
  WinningData10,
  WinningDataEntry
} from "@polkadot/types/interfaces/parachains";
import type { FeeDetails, InclusionFee, RuntimeDispatchInfo } from "@polkadot/types/interfaces/payment";
import type { Approvals } from "@polkadot/types/interfaces/poll";
import type { ProxyAnnouncement, ProxyDefinition, ProxyType } from "@polkadot/types/interfaces/proxy";
import type { AccountStatus, AccountValidity } from "@polkadot/types/interfaces/purchase";
import type { ActiveRecovery, RecoveryConfig } from "@polkadot/types/interfaces/recovery";
import type { RpcMethods } from "@polkadot/types/interfaces/rpc";
import type {
  AccountId,
  AccountId20,
  AccountId32,
  AccountIdOf,
  AccountIndex,
  Address,
  AssetId,
  Balance,
  BalanceOf,
  Block,
  BlockNumber,
  BlockNumberFor,
  BlockNumberOf,
  Call,
  CallHash,
  CallHashOf,
  ChangesTrieConfiguration,
  ChangesTrieSignal,
  CodecHash,
  Consensus,
  ConsensusEngineId,
  CrateVersion,
  Digest,
  DigestItem,
  EncodedJustification,
  ExtrinsicsWeight,
  Fixed128,
  Fixed64,
  FixedI128,
  FixedI64,
  FixedU128,
  FixedU64,
  H1024,
  H128,
  H160,
  H2048,
  H256,
  H32,
  H512,
  H64,
  Hash,
  Header,
  HeaderPartial,
  I32F32,
  Index,
  IndicesLookupSource,
  Justification,
  Justifications,
  KeyTypeId,
  KeyValue,
  LockIdentifier,
  LookupSource,
  LookupTarget,
  ModuleId,
  Moment,
  MultiAddress,
  MultiSigner,
  OpaqueCall,
  Origin,
  OriginCaller,
  PalletId,
  PalletVersion,
  PalletsOrigin,
  Pays,
  PerU16,
  Perbill,
  Percent,
  Permill,
  Perquintill,
  Phantom,
  PhantomData,
  PreRuntime,
  Releases,
  RuntimeDbWeight,
  Seal,
  SealV0,
  SignedBlock,
  SignedBlockWithJustification,
  SignedBlockWithJustifications,
  Slot,
  StorageData,
  StorageProof,
  TransactionInfo,
  TransactionPriority,
  TransactionStorageProof,
  U32F32,
  ValidatorId,
  ValidatorIdOf,
  Weight,
  WeightMultiplier
} from "@polkadot/types/interfaces/runtime";
import type {
  Si0Field,
  Si0LookupTypeId,
  Si0Path,
  Si0Type,
  Si0TypeDef,
  Si0TypeDefArray,
  Si0TypeDefBitSequence,
  Si0TypeDefCompact,
  Si0TypeDefComposite,
  Si0TypeDefPhantom,
  Si0TypeDefPrimitive,
  Si0TypeDefSequence,
  Si0TypeDefTuple,
  Si0TypeDefVariant,
  Si0TypeParameter,
  Si0Variant,
  Si1Field,
  Si1LookupTypeId,
  Si1Path,
  Si1Type,
  Si1TypeDef,
  Si1TypeDefArray,
  Si1TypeDefBitSequence,
  Si1TypeDefCompact,
  Si1TypeDefComposite,
  Si1TypeDefPrimitive,
  Si1TypeDefSequence,
  Si1TypeDefTuple,
  Si1TypeDefVariant,
  Si1TypeParameter,
  Si1Variant,
  SiField,
  SiLookupTypeId,
  SiPath,
  SiType,
  SiTypeDef,
  SiTypeDefArray,
  SiTypeDefBitSequence,
  SiTypeDefCompact,
  SiTypeDefComposite,
  SiTypeDefPrimitive,
  SiTypeDefSequence,
  SiTypeDefTuple,
  SiTypeDefVariant,
  SiTypeParameter,
  SiVariant
} from "@polkadot/types/interfaces/scaleInfo";
import type {
  Period,
  Priority,
  SchedulePeriod,
  SchedulePriority,
  Scheduled,
  ScheduledTo254,
  TaskAddress
} from "@polkadot/types/interfaces/scheduler";
import type {
  BeefyKey,
  FullIdentification,
  IdentificationTuple,
  Keys,
  MembershipProof,
  SessionIndex,
  SessionKeys1,
  SessionKeys10,
  SessionKeys10B,
  SessionKeys2,
  SessionKeys3,
  SessionKeys4,
  SessionKeys5,
  SessionKeys6,
  SessionKeys6B,
  SessionKeys7,
  SessionKeys7B,
  SessionKeys8,
  SessionKeys8B,
  SessionKeys9,
  SessionKeys9B,
  ValidatorCount
} from "@polkadot/types/interfaces/session";
import type {
  Bid,
  BidKind,
  SocietyJudgement,
  SocietyVote,
  StrikeCount,
  VouchingStatus
} from "@polkadot/types/interfaces/society";
import type {
  ActiveEraInfo,
  CompactAssignments,
  CompactAssignmentsTo257,
  CompactAssignmentsTo265,
  CompactAssignmentsWith16,
  CompactAssignmentsWith24,
  CompactScore,
  CompactScoreCompact,
  ElectionCompute,
  ElectionPhase,
  ElectionResult,
  ElectionScore,
  ElectionSize,
  ElectionStatus,
  EraIndex,
  EraPoints,
  EraRewardPoints,
  EraRewards,
  Exposure,
  ExtendedBalance,
  Forcing,
  IndividualExposure,
  KeyType,
  MomentOf,
  Nominations,
  NominatorIndex,
  NominatorIndexCompact,
  OffchainAccuracy,
  OffchainAccuracyCompact,
  PhragmenScore,
  Points,
  RawSolution,
  RawSolutionTo265,
  RawSolutionWith16,
  RawSolutionWith24,
  ReadySolution,
  RewardDestination,
  RewardPoint,
  RoundSnapshot,
  SeatHolder,
  SignedSubmission,
  SignedSubmissionOf,
  SignedSubmissionTo276,
  SlashJournalEntry,
  SlashingSpans,
  SlashingSpansTo204,
  SolutionOrSnapshotSize,
  SolutionSupport,
  SolutionSupports,
  SpanIndex,
  SpanRecord,
  StakingLedger,
  StakingLedgerTo223,
  StakingLedgerTo240,
  SubmissionIndicesOf,
  Supports,
  UnappliedSlash,
  UnappliedSlashOther,
  UnlockChunk,
  ValidatorIndex,
  ValidatorIndexCompact,
  ValidatorPrefs,
  ValidatorPrefsTo145,
  ValidatorPrefsTo196,
  ValidatorPrefsWithBlocked,
  ValidatorPrefsWithCommission,
  VoteWeight,
  Voter
} from "@polkadot/types/interfaces/staking";
import type {
  ApiId,
  BlockTrace,
  BlockTraceEvent,
  BlockTraceEventData,
  BlockTraceSpan,
  KeyValueOption,
  ReadProof,
  RuntimeVersion,
  RuntimeVersionApi,
  RuntimeVersionPartial,
  SpecVersion,
  StorageChangeSet,
  TraceBlockResponse,
  TraceError
} from "@polkadot/types/interfaces/state";
import type { WeightToFeeCoefficient } from "@polkadot/types/interfaces/support";
import type {
  AccountInfo,
  AccountInfoWithDualRefCount,
  AccountInfoWithProviders,
  AccountInfoWithRefCount,
  AccountInfoWithRefCountU8,
  AccountInfoWithTripleRefCount,
  ApplyExtrinsicResult,
  ArithmeticError,
  BlockLength,
  BlockWeights,
  ChainProperties,
  ChainType,
  ConsumedWeight,
  DigestOf,
  DispatchClass,
  DispatchError,
  DispatchErrorModule,
  DispatchErrorTo198,
  DispatchInfo,
  DispatchInfoTo190,
  DispatchInfoTo244,
  DispatchOutcome,
  DispatchResult,
  DispatchResultOf,
  DispatchResultTo198,
  Event,
  EventId,
  EventIndex,
  EventRecord,
  Health,
  InvalidTransaction,
  Key,
  LastRuntimeUpgradeInfo,
  NetworkState,
  NetworkStatePeerset,
  NetworkStatePeersetInfo,
  NodeRole,
  NotConnectedPeer,
  Peer,
  PeerEndpoint,
  PeerEndpointAddr,
  PeerInfo,
  PeerPing,
  PerDispatchClassU32,
  PerDispatchClassWeight,
  PerDispatchClassWeightsPerClass,
  Phase,
  RawOrigin,
  RefCount,
  RefCountTo259,
  SyncState,
  SystemOrigin,
  TokenError,
  TransactionValidityError,
  UnknownTransaction,
  WeightPerClass
} from "@polkadot/types/interfaces/system";
import type {
  Bounty,
  BountyIndex,
  BountyStatus,
  BountyStatusActive,
  BountyStatusCuratorProposed,
  BountyStatusPendingPayout,
  OpenTip,
  OpenTipFinderTo225,
  OpenTipTip,
  OpenTipTo225,
  TreasuryProposal
} from "@polkadot/types/interfaces/treasury";
import type { Multiplier } from "@polkadot/types/interfaces/txpayment";
import type {
  ClassDetails,
  ClassId,
  ClassMetadata,
  DepositBalance,
  DepositBalanceOf,
  DestroyWitness,
  InstanceDetails,
  InstanceId,
  InstanceMetadata
} from "@polkadot/types/interfaces/uniques";
import type { Multisig, Timepoint } from "@polkadot/types/interfaces/utility";
import type { VestingInfo } from "@polkadot/types/interfaces/vesting";
import type {
  AssetInstance,
  AssetInstanceV0,
  AssetInstanceV1,
  AssetInstanceV2,
  BodyId,
  BodyPart,
  DoubleEncodedCall,
  Fungibility,
  FungibilityV0,
  FungibilityV1,
  FungibilityV2,
  InboundStatus,
  InstructionV2,
  InteriorMultiLocation,
  Junction,
  JunctionV0,
  JunctionV1,
  JunctionV2,
  Junctions,
  JunctionsV1,
  JunctionsV2,
  MultiAsset,
  MultiAssetFilter,
  MultiAssetFilterV1,
  MultiAssetFilterV2,
  MultiAssetV0,
  MultiAssetV1,
  MultiAssetV2,
  MultiAssets,
  MultiAssetsV1,
  MultiAssetsV2,
  MultiLocation,
  MultiLocationV0,
  MultiLocationV1,
  MultiLocationV2,
  NetworkId,
  OriginKindV0,
  OriginKindV1,
  OriginKindV2,
  OutboundStatus,
  Outcome,
  QueryId,
  QueryStatus,
  QueueConfigData,
  Response,
  ResponseV0,
  ResponseV1,
  ResponseV2,
  ResponseV2Error,
  ResponseV2Result,
  VersionMigrationStage,
  VersionedMultiAsset,
  VersionedMultiAssets,
  VersionedMultiLocation,
  VersionedResponse,
  VersionedXcm,
  WeightLimitV2,
  WildFungibility,
  WildFungibilityV0,
  WildFungibilityV1,
  WildFungibilityV2,
  WildMultiAsset,
  WildMultiAssetV1,
  WildMultiAssetV2,
  Xcm,
  XcmAssetId,
  XcmError,
  XcmErrorV0,
  XcmErrorV1,
  XcmErrorV2,
  XcmOrder,
  XcmOrderV0,
  XcmOrderV1,
  XcmOrderV2,
  XcmOrigin,
  XcmOriginKind,
  XcmV0,
  XcmV1,
  XcmV2,
  XcmVersion,
  XcmpMessageFormat
} from "@polkadot/types/interfaces/xcm";

declare module "@polkadot/types/types/registry" {
  export interface InterfaceTypes {
    AbridgedCandidateReceipt: AbridgedCandidateReceipt;
    AbridgedHostConfiguration: AbridgedHostConfiguration;
    AbridgedHrmpChannel: AbridgedHrmpChannel;
    AccountData: AccountData;
    AccountId: AccountId;
    AccountId20: AccountId20;
    AccountId32: AccountId32;
    AccountIdOf: AccountIdOf;
    AccountIndex: AccountIndex;
    AccountInfo: AccountInfo;
    AccountInfoWithDualRefCount: AccountInfoWithDualRefCount;
    AccountInfoWithProviders: AccountInfoWithProviders;
    AccountInfoWithRefCount: AccountInfoWithRefCount;
    AccountInfoWithRefCountU8: AccountInfoWithRefCountU8;
    AccountInfoWithTripleRefCount: AccountInfoWithTripleRefCount;
    AccountStatus: AccountStatus;
    AccountValidity: AccountValidity;
    AccountVote: AccountVote;
    AccountVoteSplit: AccountVoteSplit;
    AccountVoteStandard: AccountVoteStandard;
    ActiveEraInfo: ActiveEraInfo;
    ActiveGilt: ActiveGilt;
    ActiveGiltsTotal: ActiveGiltsTotal;
    ActiveIndex: ActiveIndex;
    ActiveRecovery: ActiveRecovery;
    Address: Address;
    AliveContractInfo: AliveContractInfo;
    AllowedSlots: AllowedSlots;
    AnySignature: AnySignature;
    ApiId: ApiId;
    ApplyExtrinsicResult: ApplyExtrinsicResult;
    ApprovalFlag: ApprovalFlag;
    Approvals: Approvals;
    ArithmeticError: ArithmeticError;
    Asset: Asset;
    AssetId: AssetId;
    AssetInstance: AssetInstance;
    AssetInstanceV0: AssetInstanceV0;
    AssetInstanceV1: AssetInstanceV1;
    AssetInstanceV2: AssetInstanceV2;
    AssetOptions: AssetOptions;
    AssetsBalance: AssetsBalance;
    AssignmentId: AssignmentId;
    AssignmentKind: AssignmentKind;
    AttestedCandidate: AttestedCandidate;
    AuctionIndex: AuctionIndex;
    AuthIndex: AuthIndex;
    AuthorityDiscoveryId: AuthorityDiscoveryId;
    AuthorityId: AuthorityId;
    AuthorityIndex: AuthorityIndex;
    AuthorityList: AuthorityList;
    AuthoritySet: AuthoritySet;
    AuthoritySetChange: AuthoritySetChange;
    AuthoritySetChanges: AuthoritySetChanges;
    AuthoritySignature: AuthoritySignature;
    AuthorityWeight: AuthorityWeight;
    AvailabilityBitfield: AvailabilityBitfield;
    AvailabilityBitfieldRecord: AvailabilityBitfieldRecord;
    BabeAuthorityWeight: BabeAuthorityWeight;
    BabeBlockWeight: BabeBlockWeight;
    BabeEpochConfiguration: BabeEpochConfiguration;
    BabeEquivocationProof: BabeEquivocationProof;
    BabeWeight: BabeWeight;
    BackedCandidate: BackedCandidate;
    Balance: Balance;
    BalanceLock: BalanceLock;
    BalanceLockTo212: BalanceLockTo212;
    BalanceOf: BalanceOf;
    BalanceStatus: BalanceStatus;
    BeefyCommitment: BeefyCommitment;
    BeefyId: BeefyId;
    BeefyKey: BeefyKey;
    BeefyNextAuthoritySet: BeefyNextAuthoritySet;
    BeefyPayload: BeefyPayload;
    BeefySignedCommitment: BeefySignedCommitment;
    Bid: Bid;
    Bidder: Bidder;
    BidKind: BidKind;
    BitVec: BitVec;
    Block: Block;
    BlockAttestations: BlockAttestations;
    BlockHash: BlockHash;
    BlockLength: BlockLength;
    BlockNumber: BlockNumber;
    BlockNumberFor: BlockNumberFor;
    BlockNumberOf: BlockNumberOf;
    BlockTrace: BlockTrace;
    BlockTraceEvent: BlockTraceEvent;
    BlockTraceEventData: BlockTraceEventData;
    BlockTraceSpan: BlockTraceSpan;
    BlockV0: BlockV0;
    BlockV1: BlockV1;
    BlockV2: BlockV2;
    BlockWeights: BlockWeights;
    BodyId: BodyId;
    BodyPart: BodyPart;
    bool: bool;
    Bool: Bool;
    Bounty: Bounty;
    BountyIndex: BountyIndex;
    BountyStatus: BountyStatus;
    BountyStatusActive: BountyStatusActive;
    BountyStatusCuratorProposed: BountyStatusCuratorProposed;
    BountyStatusPendingPayout: BountyStatusPendingPayout;
    BridgedBlockHash: BridgedBlockHash;
    BridgedBlockNumber: BridgedBlockNumber;
    BridgedHeader: BridgedHeader;
    BridgeMessageId: BridgeMessageId;
    BufferedSessionChange: BufferedSessionChange;
    Bytes: Bytes;
    Call: Call;
    CallHash: CallHash;
    CallHashOf: CallHashOf;
    CallIndex: CallIndex;
    CallOrigin: CallOrigin;
    CandidateCommitments: CandidateCommitments;
    CandidateDescriptor: CandidateDescriptor;
    CandidateHash: CandidateHash;
    CandidateInfo: CandidateInfo;
    CandidatePendingAvailability: CandidatePendingAvailability;
    CandidateReceipt: CandidateReceipt;
    ChainId: ChainId;
    ChainProperties: ChainProperties;
    ChainType: ChainType;
    ChangesTrieConfiguration: ChangesTrieConfiguration;
    ChangesTrieSignal: ChangesTrieSignal;
    ClassDetails: ClassDetails;
    ClassId: ClassId;
    ClassMetadata: ClassMetadata;
    CodecHash: CodecHash;
    CodeHash: CodeHash;
    CodeSource: CodeSource;
    CodeUploadRequest: CodeUploadRequest;
    CodeUploadResult: CodeUploadResult;
    CodeUploadResultValue: CodeUploadResultValue;
    CollatorId: CollatorId;
    CollatorSignature: CollatorSignature;
    CollectiveOrigin: CollectiveOrigin;
    CommittedCandidateReceipt: CommittedCandidateReceipt;
    CommonMosaicRemoteAssetId: CommonMosaicRemoteAssetId;
    CompactAssignments: CompactAssignments;
    CompactAssignmentsTo257: CompactAssignmentsTo257;
    CompactAssignmentsTo265: CompactAssignmentsTo265;
    CompactAssignmentsWith16: CompactAssignmentsWith16;
    CompactAssignmentsWith24: CompactAssignmentsWith24;
    CompactScore: CompactScore;
    CompactScoreCompact: CompactScoreCompact;
    ComposableSupportEthereumAddress: ComposableSupportEthereumAddress;
    ComposableTraitsAssetsBasicAssetMetadata: ComposableTraitsAssetsBasicAssetMetadata;
    ComposableTraitsAssetsXcmAssetLocation: ComposableTraitsAssetsXcmAssetLocation;
    ComposableTraitsAuctionAuctionStepFunction: ComposableTraitsAuctionAuctionStepFunction;
    ComposableTraitsBondedFinanceBondDuration: ComposableTraitsBondedFinanceBondDuration;
    ComposableTraitsBondedFinanceBondOffer: ComposableTraitsBondedFinanceBondOffer;
    ComposableTraitsBondedFinanceBondOfferReward: ComposableTraitsBondedFinanceBondOfferReward;
    ComposableTraitsCallFilterCallFilterEntry: ComposableTraitsCallFilterCallFilterEntry;
    ComposableTraitsDefiCurrencyPairCurrencyId: ComposableTraitsDefiCurrencyPairCurrencyId;
    ComposableTraitsDefiSell: ComposableTraitsDefiSell;
    ComposableTraitsDefiSellCurrencyId: ComposableTraitsDefiSellCurrencyId;
    ComposableTraitsDefiTake: ComposableTraitsDefiTake;
    ComposableTraitsDexConsantProductPoolInfo: ComposableTraitsDexConsantProductPoolInfo;
    ComposableTraitsDexConstantProductPoolInfo: ComposableTraitsDexConstantProductPoolInfo;
    ComposableTraitsDexDexRoute: ComposableTraitsDexDexRoute;
    ComposableTraitsDexFee: ComposableTraitsDexFee;
    ComposableTraitsDexStableSwapPoolInfo: ComposableTraitsDexStableSwapPoolInfo;
    ComposableTraitsGovernanceSignedRawOrigin: ComposableTraitsGovernanceSignedRawOrigin;
    ComposableTraitsLendingCreateInput: ComposableTraitsLendingCreateInput;
    ComposableTraitsLendingMarketConfig: ComposableTraitsLendingMarketConfig;
    ComposableTraitsLendingRepayStrategy: ComposableTraitsLendingRepayStrategy;
    ComposableTraitsLendingUpdateInput: ComposableTraitsLendingUpdateInput;
    ComposableTraitsOraclePrice: ComposableTraitsOraclePrice;
    ComposableTraitsTimeTimeReleaseFunction: ComposableTraitsTimeTimeReleaseFunction;
    ComposableTraitsVaultVaultConfig: ComposableTraitsVaultVaultConfig;
    ComposableTraitsVestingVestingSchedule: ComposableTraitsVestingVestingSchedule;
    ComposableTraitsXcmAssetsForeignMetadata: ComposableTraitsXcmAssetsForeignMetadata;
    ComposableTraitsXcmAssetsXcmAssetLocation: ComposableTraitsXcmAssetsXcmAssetLocation;
    ComposableTraitsXcmCumulusMethodId: ComposableTraitsXcmCumulusMethodId;
    ComposableTraitsXcmXcmSellRequest: ComposableTraitsXcmXcmSellRequest;
    ConfigData: ConfigData;
    Consensus: Consensus;
    ConsensusEngineId: ConsensusEngineId;
    ConsumedWeight: ConsumedWeight;
    ContractCallFlags: ContractCallFlags;
    ContractCallRequest: ContractCallRequest;
    ContractConstructorSpecLatest: ContractConstructorSpecLatest;
    ContractConstructorSpecV0: ContractConstructorSpecV0;
    ContractConstructorSpecV1: ContractConstructorSpecV1;
    ContractConstructorSpecV2: ContractConstructorSpecV2;
    ContractConstructorSpecV3: ContractConstructorSpecV3;
    ContractContractSpecV0: ContractContractSpecV0;
    ContractContractSpecV1: ContractContractSpecV1;
    ContractContractSpecV2: ContractContractSpecV2;
    ContractContractSpecV3: ContractContractSpecV3;
    ContractCryptoHasher: ContractCryptoHasher;
    ContractDiscriminant: ContractDiscriminant;
    ContractDisplayName: ContractDisplayName;
    ContractEventParamSpecLatest: ContractEventParamSpecLatest;
    ContractEventParamSpecV0: ContractEventParamSpecV0;
    ContractEventParamSpecV2: ContractEventParamSpecV2;
    ContractEventSpecLatest: ContractEventSpecLatest;
    ContractEventSpecV0: ContractEventSpecV0;
    ContractEventSpecV1: ContractEventSpecV1;
    ContractEventSpecV2: ContractEventSpecV2;
    ContractExecResult: ContractExecResult;
    ContractExecResultOk: ContractExecResultOk;
    ContractExecResultResult: ContractExecResultResult;
    ContractExecResultSuccessTo255: ContractExecResultSuccessTo255;
    ContractExecResultSuccessTo260: ContractExecResultSuccessTo260;
    ContractExecResultTo255: ContractExecResultTo255;
    ContractExecResultTo260: ContractExecResultTo260;
    ContractExecResultTo267: ContractExecResultTo267;
    ContractInfo: ContractInfo;
    ContractInstantiateResult: ContractInstantiateResult;
    ContractInstantiateResultTo267: ContractInstantiateResultTo267;
    ContractInstantiateResultTo299: ContractInstantiateResultTo299;
    ContractLayoutArray: ContractLayoutArray;
    ContractLayoutCell: ContractLayoutCell;
    ContractLayoutEnum: ContractLayoutEnum;
    ContractLayoutHash: ContractLayoutHash;
    ContractLayoutHashingStrategy: ContractLayoutHashingStrategy;
    ContractLayoutKey: ContractLayoutKey;
    ContractLayoutStruct: ContractLayoutStruct;
    ContractLayoutStructField: ContractLayoutStructField;
    ContractMessageParamSpecLatest: ContractMessageParamSpecLatest;
    ContractMessageParamSpecV0: ContractMessageParamSpecV0;
    ContractMessageParamSpecV2: ContractMessageParamSpecV2;
    ContractMessageSpecLatest: ContractMessageSpecLatest;
    ContractMessageSpecV0: ContractMessageSpecV0;
    ContractMessageSpecV1: ContractMessageSpecV1;
    ContractMessageSpecV2: ContractMessageSpecV2;
    ContractMetadata: ContractMetadata;
    ContractMetadataLatest: ContractMetadataLatest;
    ContractMetadataV0: ContractMetadataV0;
    ContractMetadataV1: ContractMetadataV1;
    ContractMetadataV2: ContractMetadataV2;
    ContractMetadataV3: ContractMetadataV3;
    ContractProject: ContractProject;
    ContractProjectContract: ContractProjectContract;
    ContractProjectInfo: ContractProjectInfo;
    ContractProjectSource: ContractProjectSource;
    ContractProjectV0: ContractProjectV0;
    ContractReturnFlags: ContractReturnFlags;
    ContractSelector: ContractSelector;
    ContractStorageKey: ContractStorageKey;
    ContractStorageLayout: ContractStorageLayout;
    ContractTypeSpec: ContractTypeSpec;
    Conviction: Conviction;
    CoreAssignment: CoreAssignment;
    CoreIndex: CoreIndex;
    CoreOccupied: CoreOccupied;
    CrateVersion: CrateVersion;
    CreatedBlock: CreatedBlock;
    CumulusPalletDmpQueueConfigData: CumulusPalletDmpQueueConfigData;
    CumulusPalletDmpQueuePageIndexData: CumulusPalletDmpQueuePageIndexData;
    CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot: CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot;
    CumulusPalletXcmpQueueInboundChannelDetails: CumulusPalletXcmpQueueInboundChannelDetails;
    CumulusPalletXcmpQueueInboundStatus: CumulusPalletXcmpQueueInboundStatus;
    CumulusPalletXcmpQueueOutboundChannelDetails: CumulusPalletXcmpQueueOutboundChannelDetails;
    CumulusPalletXcmpQueueOutboundStatus: CumulusPalletXcmpQueueOutboundStatus;
    CumulusPalletXcmpQueueQueueConfigData: CumulusPalletXcmpQueueQueueConfigData;
    CumulusPrimitivesParachainInherentParachainInherentData: CumulusPrimitivesParachainInherentParachainInherentData;
    CurrencyId: CurrencyId;
    CustomRpcBalance: CustomRpcBalance;
    CustomRpcCurrencyId: CustomRpcCurrencyId;
    DaliRuntimeOpaqueSessionKeys: DaliRuntimeOpaqueSessionKeys;
    DaliRuntimeOriginCaller: DaliRuntimeOriginCaller;
    Data: Data;
    DeferredOffenceOf: DeferredOffenceOf;
    DefunctVoter: DefunctVoter;
    DelayKind: DelayKind;
    DelayKindBest: DelayKindBest;
    Delegations: Delegations;
    DeletedContract: DeletedContract;
    DeliveredMessages: DeliveredMessages;
    DepositBalance: DepositBalance;
    DepositBalanceOf: DepositBalanceOf;
    DestroyWitness: DestroyWitness;
    Digest: Digest;
    DigestItem: DigestItem;
    DigestOf: DigestOf;
    DispatchClass: DispatchClass;
    DispatchError: DispatchError;
    DispatchErrorModule: DispatchErrorModule;
    DispatchErrorTo198: DispatchErrorTo198;
    DispatchFeePayment: DispatchFeePayment;
    DispatchInfo: DispatchInfo;
    DispatchInfoTo190: DispatchInfoTo190;
    DispatchInfoTo244: DispatchInfoTo244;
    DispatchOutcome: DispatchOutcome;
    DispatchResult: DispatchResult;
    DispatchResultOf: DispatchResultOf;
    DispatchResultTo198: DispatchResultTo198;
    DisputeLocation: DisputeLocation;
    DisputeResult: DisputeResult;
    DisputeState: DisputeState;
    DisputeStatement: DisputeStatement;
    DisputeStatementSet: DisputeStatementSet;
    DoubleEncodedCall: DoubleEncodedCall;
    DoubleVoteReport: DoubleVoteReport;
    DownwardMessage: DownwardMessage;
    EcdsaSignature: EcdsaSignature;
    Ed25519Signature: Ed25519Signature;
    EIP1559Transaction: EIP1559Transaction;
    EIP2930Transaction: EIP2930Transaction;
    ElectionCompute: ElectionCompute;
    ElectionPhase: ElectionPhase;
    ElectionResult: ElectionResult;
    ElectionScore: ElectionScore;
    ElectionSize: ElectionSize;
    ElectionStatus: ElectionStatus;
    EncodedFinalityProofs: EncodedFinalityProofs;
    EncodedJustification: EncodedJustification;
    EpochAuthorship: EpochAuthorship;
    Era: Era;
    EraIndex: EraIndex;
    EraPoints: EraPoints;
    EraRewardPoints: EraRewardPoints;
    EraRewards: EraRewards;
    ErrorMetadataLatest: ErrorMetadataLatest;
    ErrorMetadataV10: ErrorMetadataV10;
    ErrorMetadataV11: ErrorMetadataV11;
    ErrorMetadataV12: ErrorMetadataV12;
    ErrorMetadataV13: ErrorMetadataV13;
    ErrorMetadataV14: ErrorMetadataV14;
    ErrorMetadataV9: ErrorMetadataV9;
    EthAccessList: EthAccessList;
    EthAccessListItem: EthAccessListItem;
    EthAccount: EthAccount;
    EthAddress: EthAddress;
    EthBlock: EthBlock;
    EthBloom: EthBloom;
    EthCallRequest: EthCallRequest;
    EthereumAccountId: EthereumAccountId;
    EthereumAddress: EthereumAddress;
    EthereumLookupSource: EthereumLookupSource;
    EthereumSignature: EthereumSignature;
    EthFilter: EthFilter;
    EthFilterAddress: EthFilterAddress;
    EthFilterChanges: EthFilterChanges;
    EthFilterTopic: EthFilterTopic;
    EthFilterTopicEntry: EthFilterTopicEntry;
    EthFilterTopicInner: EthFilterTopicInner;
    EthHeader: EthHeader;
    EthLog: EthLog;
    EthReceipt: EthReceipt;
    EthRichBlock: EthRichBlock;
    EthRichHeader: EthRichHeader;
    EthStorageProof: EthStorageProof;
    EthSubKind: EthSubKind;
    EthSubParams: EthSubParams;
    EthSubResult: EthSubResult;
    EthSyncInfo: EthSyncInfo;
    EthSyncStatus: EthSyncStatus;
    EthTransaction: EthTransaction;
    EthTransactionAction: EthTransactionAction;
    EthTransactionCondition: EthTransactionCondition;
    EthTransactionRequest: EthTransactionRequest;
    EthTransactionSignature: EthTransactionSignature;
    EthTransactionStatus: EthTransactionStatus;
    EthWork: EthWork;
    Event: Event;
    EventId: EventId;
    EventIndex: EventIndex;
    EventMetadataLatest: EventMetadataLatest;
    EventMetadataV10: EventMetadataV10;
    EventMetadataV11: EventMetadataV11;
    EventMetadataV12: EventMetadataV12;
    EventMetadataV13: EventMetadataV13;
    EventMetadataV14: EventMetadataV14;
    EventMetadataV9: EventMetadataV9;
    EventRecord: EventRecord;
    EvmAccount: EvmAccount;
    EvmLog: EvmLog;
    EvmVicinity: EvmVicinity;
    ExecReturnValue: ExecReturnValue;
    ExitError: ExitError;
    ExitFatal: ExitFatal;
    ExitReason: ExitReason;
    ExitRevert: ExitRevert;
    ExitSucceed: ExitSucceed;
    ExplicitDisputeStatement: ExplicitDisputeStatement;
    Exposure: Exposure;
    ExtendedBalance: ExtendedBalance;
    Extrinsic: Extrinsic;
    ExtrinsicEra: ExtrinsicEra;
    ExtrinsicMetadataLatest: ExtrinsicMetadataLatest;
    ExtrinsicMetadataV11: ExtrinsicMetadataV11;
    ExtrinsicMetadataV12: ExtrinsicMetadataV12;
    ExtrinsicMetadataV13: ExtrinsicMetadataV13;
    ExtrinsicMetadataV14: ExtrinsicMetadataV14;
    ExtrinsicOrHash: ExtrinsicOrHash;
    ExtrinsicPayload: ExtrinsicPayload;
    ExtrinsicPayloadUnknown: ExtrinsicPayloadUnknown;
    ExtrinsicPayloadV4: ExtrinsicPayloadV4;
    ExtrinsicSignature: ExtrinsicSignature;
    ExtrinsicSignatureV4: ExtrinsicSignatureV4;
    ExtrinsicStatus: ExtrinsicStatus;
    ExtrinsicsWeight: ExtrinsicsWeight;
    ExtrinsicUnknown: ExtrinsicUnknown;
    ExtrinsicV4: ExtrinsicV4;
    FeeDetails: FeeDetails;
    Fixed128: Fixed128;
    Fixed64: Fixed64;
    FixedI128: FixedI128;
    FixedI64: FixedI64;
    FixedU128: FixedU128;
    FixedU64: FixedU64;
    Forcing: Forcing;
    ForkTreePendingChange: ForkTreePendingChange;
    ForkTreePendingChangeNode: ForkTreePendingChangeNode;
    FrameSupportScheduleLookupError: FrameSupportScheduleLookupError;
    FrameSupportScheduleMaybeHashed: FrameSupportScheduleMaybeHashed;
    FullIdentification: FullIdentification;
    FunctionArgumentMetadataLatest: FunctionArgumentMetadataLatest;
    FunctionArgumentMetadataV10: FunctionArgumentMetadataV10;
    FunctionArgumentMetadataV11: FunctionArgumentMetadataV11;
    FunctionArgumentMetadataV12: FunctionArgumentMetadataV12;
    FunctionArgumentMetadataV13: FunctionArgumentMetadataV13;
    FunctionArgumentMetadataV14: FunctionArgumentMetadataV14;
    FunctionArgumentMetadataV9: FunctionArgumentMetadataV9;
    FunctionMetadataLatest: FunctionMetadataLatest;
    FunctionMetadataV10: FunctionMetadataV10;
    FunctionMetadataV11: FunctionMetadataV11;
    FunctionMetadataV12: FunctionMetadataV12;
    FunctionMetadataV13: FunctionMetadataV13;
    FunctionMetadataV14: FunctionMetadataV14;
    FunctionMetadataV9: FunctionMetadataV9;
    FundIndex: FundIndex;
    FundInfo: FundInfo;
    Fungibility: Fungibility;
    FungibilityV0: FungibilityV0;
    FungibilityV1: FungibilityV1;
    FungibilityV2: FungibilityV2;
    Gas: Gas;
    GiltBid: GiltBid;
    GlobalValidationData: GlobalValidationData;
    GlobalValidationSchedule: GlobalValidationSchedule;
    GrandpaCommit: GrandpaCommit;
    GrandpaEquivocation: GrandpaEquivocation;
    GrandpaEquivocationProof: GrandpaEquivocationProof;
    GrandpaEquivocationValue: GrandpaEquivocationValue;
    GrandpaJustification: GrandpaJustification;
    GrandpaPrecommit: GrandpaPrecommit;
    GrandpaPrevote: GrandpaPrevote;
    GrandpaSignedPrecommit: GrandpaSignedPrecommit;
    GroupIndex: GroupIndex;
    H1024: H1024;
    H128: H128;
    H160: H160;
    H2048: H2048;
    H256: H256;
    H32: H32;
    H512: H512;
    H64: H64;
    Hash: Hash;
    HeadData: HeadData;
    Header: Header;
    HeaderPartial: HeaderPartial;
    Health: Health;
    Heartbeat: Heartbeat;
    HeartbeatTo244: HeartbeatTo244;
    HostConfiguration: HostConfiguration;
    HostFnWeights: HostFnWeights;
    HostFnWeightsTo264: HostFnWeightsTo264;
    HrmpChannel: HrmpChannel;
    HrmpChannelId: HrmpChannelId;
    HrmpOpenChannelRequest: HrmpOpenChannelRequest;
    i128: i128;
    I128: I128;
    i16: i16;
    I16: I16;
    i256: i256;
    I256: I256;
    i32: i32;
    I32: I32;
    I32F32: I32F32;
    i64: i64;
    I64: I64;
    i8: i8;
    I8: I8;
    IdentificationTuple: IdentificationTuple;
    IdentityFields: IdentityFields;
    IdentityInfo: IdentityInfo;
    IdentityInfoAdditional: IdentityInfoAdditional;
    IdentityInfoTo198: IdentityInfoTo198;
    IdentityJudgement: IdentityJudgement;
    ImmortalEra: ImmortalEra;
    ImportedAux: ImportedAux;
    InboundDownwardMessage: InboundDownwardMessage;
    InboundHrmpMessage: InboundHrmpMessage;
    InboundHrmpMessages: InboundHrmpMessages;
    InboundLaneData: InboundLaneData;
    InboundRelayer: InboundRelayer;
    InboundStatus: InboundStatus;
    IncludedBlocks: IncludedBlocks;
    InclusionFee: InclusionFee;
    IncomingParachain: IncomingParachain;
    IncomingParachainDeploy: IncomingParachainDeploy;
    IncomingParachainFixed: IncomingParachainFixed;
    Index: Index;
    IndicesLookupSource: IndicesLookupSource;
    IndividualExposure: IndividualExposure;
    InitializationData: InitializationData;
    InstanceDetails: InstanceDetails;
    InstanceId: InstanceId;
    InstanceMetadata: InstanceMetadata;
    InstantiateRequest: InstantiateRequest;
    InstantiateRequestV1: InstantiateRequestV1;
    InstantiateRequestV2: InstantiateRequestV2;
    InstantiateReturnValue: InstantiateReturnValue;
    InstantiateReturnValueOk: InstantiateReturnValueOk;
    InstantiateReturnValueTo267: InstantiateReturnValueTo267;
    InstructionV2: InstructionV2;
    InstructionWeights: InstructionWeights;
    InteriorMultiLocation: InteriorMultiLocation;
    InvalidDisputeStatementKind: InvalidDisputeStatementKind;
    InvalidTransaction: InvalidTransaction;
    Json: Json;
    Junction: Junction;
    Junctions: Junctions;
    JunctionsV1: JunctionsV1;
    JunctionsV2: JunctionsV2;
    JunctionV0: JunctionV0;
    JunctionV1: JunctionV1;
    JunctionV2: JunctionV2;
    Justification: Justification;
    JustificationNotification: JustificationNotification;
    Justifications: Justifications;
    Key: Key;
    KeyOwnerProof: KeyOwnerProof;
    Keys: Keys;
    KeyType: KeyType;
    KeyTypeId: KeyTypeId;
    KeyValue: KeyValue;
    KeyValueOption: KeyValueOption;
    Kind: Kind;
    LaneId: LaneId;
    LastContribution: LastContribution;
    LastRuntimeUpgradeInfo: LastRuntimeUpgradeInfo;
    LeasePeriod: LeasePeriod;
    LeasePeriodOf: LeasePeriodOf;
    LegacyTransaction: LegacyTransaction;
    Limits: Limits;
    LimitsTo264: LimitsTo264;
    LocalValidationData: LocalValidationData;
    LockIdentifier: LockIdentifier;
    LookupSource: LookupSource;
    LookupTarget: LookupTarget;
    LotteryConfig: LotteryConfig;
    MaybeRandomness: MaybeRandomness;
    MaybeVrf: MaybeVrf;
    MemberCount: MemberCount;
    MembershipProof: MembershipProof;
    MessageData: MessageData;
    MessageId: MessageId;
    MessageIngestionType: MessageIngestionType;
    MessageKey: MessageKey;
    MessageNonce: MessageNonce;
    MessageQueueChain: MessageQueueChain;
    MessagesDeliveryProofOf: MessagesDeliveryProofOf;
    MessagesProofOf: MessagesProofOf;
    MessagingStateSnapshot: MessagingStateSnapshot;
    MessagingStateSnapshotEgressEntry: MessagingStateSnapshotEgressEntry;
    MetadataAll: MetadataAll;
    MetadataLatest: MetadataLatest;
    MetadataV10: MetadataV10;
    MetadataV11: MetadataV11;
    MetadataV12: MetadataV12;
    MetadataV13: MetadataV13;
    MetadataV14: MetadataV14;
    MetadataV9: MetadataV9;
    MmrLeafProof: MmrLeafProof;
    MmrRootHash: MmrRootHash;
    ModuleConstantMetadataV10: ModuleConstantMetadataV10;
    ModuleConstantMetadataV11: ModuleConstantMetadataV11;
    ModuleConstantMetadataV12: ModuleConstantMetadataV12;
    ModuleConstantMetadataV13: ModuleConstantMetadataV13;
    ModuleConstantMetadataV9: ModuleConstantMetadataV9;
    ModuleId: ModuleId;
    ModuleMetadataV10: ModuleMetadataV10;
    ModuleMetadataV11: ModuleMetadataV11;
    ModuleMetadataV12: ModuleMetadataV12;
    ModuleMetadataV13: ModuleMetadataV13;
    ModuleMetadataV9: ModuleMetadataV9;
    Moment: Moment;
    MomentOf: MomentOf;
    MoreAttestations: MoreAttestations;
    MortalEra: MortalEra;
    MultiAddress: MultiAddress;
    MultiAsset: MultiAsset;
    MultiAssetFilter: MultiAssetFilter;
    MultiAssetFilterV1: MultiAssetFilterV1;
    MultiAssetFilterV2: MultiAssetFilterV2;
    MultiAssets: MultiAssets;
    MultiAssetsV1: MultiAssetsV1;
    MultiAssetsV2: MultiAssetsV2;
    MultiAssetV0: MultiAssetV0;
    MultiAssetV1: MultiAssetV1;
    MultiAssetV2: MultiAssetV2;
    MultiDisputeStatementSet: MultiDisputeStatementSet;
    MultiLocation: MultiLocation;
    MultiLocationV0: MultiLocationV0;
    MultiLocationV1: MultiLocationV1;
    MultiLocationV2: MultiLocationV2;
    Multiplier: Multiplier;
    Multisig: Multisig;
    MultiSignature: MultiSignature;
    MultiSigner: MultiSigner;
    NetworkId: NetworkId;
    NetworkState: NetworkState;
    NetworkStatePeerset: NetworkStatePeerset;
    NetworkStatePeersetInfo: NetworkStatePeersetInfo;
    NewBidder: NewBidder;
    NextAuthority: NextAuthority;
    NextConfigDescriptor: NextConfigDescriptor;
    NextConfigDescriptorV1: NextConfigDescriptorV1;
    NodeRole: NodeRole;
    Nominations: Nominations;
    NominatorIndex: NominatorIndex;
    NominatorIndexCompact: NominatorIndexCompact;
    NotConnectedPeer: NotConnectedPeer;
    Null: Null;
    OffchainAccuracy: OffchainAccuracy;
    OffchainAccuracyCompact: OffchainAccuracyCompact;
    OffenceDetails: OffenceDetails;
    Offender: Offender;
    OpaqueCall: OpaqueCall;
    OpaqueMultiaddr: OpaqueMultiaddr;
    OpaqueNetworkState: OpaqueNetworkState;
    OpaquePeerId: OpaquePeerId;
    OpaqueTimeSlot: OpaqueTimeSlot;
    OpenTip: OpenTip;
    OpenTipFinderTo225: OpenTipFinderTo225;
    OpenTipTip: OpenTipTip;
    OpenTipTo225: OpenTipTo225;
    OperatingMode: OperatingMode;
    Origin: Origin;
    OriginCaller: OriginCaller;
    OriginKindV0: OriginKindV0;
    OriginKindV1: OriginKindV1;
    OriginKindV2: OriginKindV2;
    OrmlTokensAccountData: OrmlTokensAccountData;
    OrmlTokensBalanceLock: OrmlTokensBalanceLock;
    OutboundHrmpMessage: OutboundHrmpMessage;
    OutboundLaneData: OutboundLaneData;
    OutboundMessageFee: OutboundMessageFee;
    OutboundPayload: OutboundPayload;
    OutboundStatus: OutboundStatus;
    Outcome: Outcome;
    OverweightIndex: OverweightIndex;
    Owner: Owner;
    PageCounter: PageCounter;
    PageIndexData: PageIndexData;
    PalletAssetsRegistryCandidateStatus: PalletAssetsRegistryCandidateStatus;
    PalletAssetsRegistryForeignMetadata: PalletAssetsRegistryForeignMetadata;
    PalletCallMetadataLatest: PalletCallMetadataLatest;
    PalletCallMetadataV14: PalletCallMetadataV14;
    PalletCollatorSelectionCandidateInfo: PalletCollatorSelectionCandidateInfo;
    PalletConstantMetadataLatest: PalletConstantMetadataLatest;
    PalletConstantMetadataV14: PalletConstantMetadataV14;
    PalletCrowdloanRewardsModelsEcdsaSignature: PalletCrowdloanRewardsModelsEcdsaSignature;
    PalletCrowdloanRewardsModelsProof: PalletCrowdloanRewardsModelsProof;
    PalletCrowdloanRewardsModelsRemoteAccount: PalletCrowdloanRewardsModelsRemoteAccount;
    PalletCrowdloanRewardsModelsReward: PalletCrowdloanRewardsModelsReward;
    PalletCrowdloanRewardsReward: PalletCrowdloanRewardsReward;
    PalletCurrencyFactoryRanges: PalletCurrencyFactoryRanges;
    PalletCurrencyFactoryRangesRange: PalletCurrencyFactoryRangesRange;
    PalletDemocracyConviction: PalletDemocracyConviction;
    PalletDemocracyPreimageStatus: PalletDemocracyPreimageStatus;
    PalletDemocracyReferendumInfo: PalletDemocracyReferendumInfo;
    PalletDemocracyReleases: PalletDemocracyReleases;
    PalletDemocracyVoteAccountVote: PalletDemocracyVoteAccountVote;
    PalletDemocracyVoteThreshold: PalletDemocracyVoteThreshold;
    PalletDemocracyVoteVoting: PalletDemocracyVoteVoting;
    PalletDutchAuctionSellOrder: PalletDutchAuctionSellOrder;
    PalletDutchAuctionTakeOrder: PalletDutchAuctionTakeOrder;
    PalletErrorMetadataLatest: PalletErrorMetadataLatest;
    PalletErrorMetadataV14: PalletErrorMetadataV14;
    PalletEventMetadataLatest: PalletEventMetadataLatest;
    PalletEventMetadataV14: PalletEventMetadataV14;
    PalletId: PalletId;
    PalletIdentityBitFlags: PalletIdentityBitFlags;
    PalletIdentityIdentityInfo: PalletIdentityIdentityInfo;
    PalletIdentityJudgement: PalletIdentityJudgement;
    PalletIdentityRegistrarInfo: PalletIdentityRegistrarInfo;
    PalletIdentityRegistration: PalletIdentityRegistration;
    PalletLiquidationsLiquidationStrategyConfiguration: PalletLiquidationsLiquidationStrategyConfiguration;
    PalletLiquidityBootstrappingPool: PalletLiquidityBootstrappingPool;
    PalletMetadataLatest: PalletMetadataLatest;
    PalletMetadataV14: PalletMetadataV14;
    PalletMosaicAssetInfo: PalletMosaicAssetInfo;
    PalletMosaicDecayBudgetPenaltyDecayer: PalletMosaicDecayBudgetPenaltyDecayer;
    PalletMosaicNetworkInfo: PalletMosaicNetworkInfo;
    PalletMosaicRelayerStaleRelayer: PalletMosaicRelayerStaleRelayer;
    PalletOracleAssetInfo: PalletOracleAssetInfo;
    PalletOraclePrePrice: PalletOraclePrePrice;
    PalletOraclePrice: PalletOraclePrice;
    PalletOracleWithdraw: PalletOracleWithdraw;
    PalletPabloPoolConfiguration: PalletPabloPoolConfiguration;
    PalletPabloPoolId: PalletPabloPoolId;
    PalletPabloPoolInitConfiguration: PalletPabloPoolInitConfiguration;
    PalletPabloPriceAggregate: PalletPabloPriceAggregate;
    PalletPabloPriceCumulative: PalletPabloPriceCumulative;
    PalletPabloTimeWeightedAveragePrice: PalletPabloTimeWeightedAveragePrice;
    PalletPreimageRequestStatus: PalletPreimageRequestStatus;
    PalletSchedulerReleases: PalletSchedulerReleases;
    PalletSchedulerScheduledV2: PalletSchedulerScheduledV2;
    PalletSchedulerScheduledV3: PalletSchedulerScheduledV3;
    PalletsOrigin: PalletsOrigin;
    PalletStorageMetadataLatest: PalletStorageMetadataLatest;
    PalletStorageMetadataV14: PalletStorageMetadataV14;
    PalletTreasuryProposal: PalletTreasuryProposal;
    PalletVaultModelsStrategyOverview: PalletVaultModelsStrategyOverview;
    PalletVaultModelsVaultInfo: PalletVaultModelsVaultInfo;
    PalletVersion: PalletVersion;
    ParachainDispatchOrigin: ParachainDispatchOrigin;
    ParachainInherentData: ParachainInherentData;
    ParachainProposal: ParachainProposal;
    ParachainsInherentData: ParachainsInherentData;
    ParaGenesisArgs: ParaGenesisArgs;
    ParaId: ParaId;
    ParaInfo: ParaInfo;
    ParaLifecycle: ParaLifecycle;
    Parameter: Parameter;
    ParaPastCodeMeta: ParaPastCodeMeta;
    ParaScheduling: ParaScheduling;
    ParathreadClaim: ParathreadClaim;
    ParathreadClaimQueue: ParathreadClaimQueue;
    ParathreadEntry: ParathreadEntry;
    ParaValidatorIndex: ParaValidatorIndex;
    Pays: Pays;
    Peer: Peer;
    PeerEndpoint: PeerEndpoint;
    PeerEndpointAddr: PeerEndpointAddr;
    PeerInfo: PeerInfo;
    PeerPing: PeerPing;
    PendingChange: PendingChange;
    PendingPause: PendingPause;
    PendingResume: PendingResume;
    Perbill: Perbill;
    Percent: Percent;
    PerDispatchClassU32: PerDispatchClassU32;
    PerDispatchClassWeight: PerDispatchClassWeight;
    PerDispatchClassWeightsPerClass: PerDispatchClassWeightsPerClass;
    Period: Period;
    Permill: Permill;
    PermissionLatest: PermissionLatest;
    PermissionsV1: PermissionsV1;
    PermissionVersions: PermissionVersions;
    Perquintill: Perquintill;
    PersistedValidationData: PersistedValidationData;
    PerU16: PerU16;
    Phantom: Phantom;
    PhantomData: PhantomData;
    Phase: Phase;
    PhragmenScore: PhragmenScore;
    Points: Points;
    PolkadotParachainPrimitivesXcmpMessageFormat: PolkadotParachainPrimitivesXcmpMessageFormat;
    PolkadotPrimitivesV1AbridgedHostConfiguration: PolkadotPrimitivesV1AbridgedHostConfiguration;
    PolkadotPrimitivesV1PersistedValidationData: PolkadotPrimitivesV1PersistedValidationData;
    PortableType: PortableType;
    PortableTypeV14: PortableTypeV14;
    Precommits: Precommits;
    PrefabWasmModule: PrefabWasmModule;
    PrefixedStorageKey: PrefixedStorageKey;
    PreimageStatus: PreimageStatus;
    PreimageStatusAvailable: PreimageStatusAvailable;
    PreRuntime: PreRuntime;
    Prevotes: Prevotes;
    Priority: Priority;
    PriorLock: PriorLock;
    PropIndex: PropIndex;
    Proposal: Proposal;
    ProposalIndex: ProposalIndex;
    ProxyAnnouncement: ProxyAnnouncement;
    ProxyDefinition: ProxyDefinition;
    ProxyState: ProxyState;
    ProxyType: ProxyType;
    QueryId: QueryId;
    QueryStatus: QueryStatus;
    QueueConfigData: QueueConfigData;
    QueuedParathread: QueuedParathread;
    Randomness: Randomness;
    Raw: Raw;
    RawAuraPreDigest: RawAuraPreDigest;
    RawBabePreDigest: RawBabePreDigest;
    RawBabePreDigestCompat: RawBabePreDigestCompat;
    RawBabePreDigestPrimary: RawBabePreDigestPrimary;
    RawBabePreDigestPrimaryTo159: RawBabePreDigestPrimaryTo159;
    RawBabePreDigestSecondaryPlain: RawBabePreDigestSecondaryPlain;
    RawBabePreDigestSecondaryTo159: RawBabePreDigestSecondaryTo159;
    RawBabePreDigestSecondaryVRF: RawBabePreDigestSecondaryVRF;
    RawBabePreDigestTo159: RawBabePreDigestTo159;
    RawOrigin: RawOrigin;
    RawSolution: RawSolution;
    RawSolutionTo265: RawSolutionTo265;
    RawSolutionWith16: RawSolutionWith16;
    RawSolutionWith24: RawSolutionWith24;
    RawVRFOutput: RawVRFOutput;
    ReadProof: ReadProof;
    ReadySolution: ReadySolution;
    Reasons: Reasons;
    RecoveryConfig: RecoveryConfig;
    RefCount: RefCount;
    RefCountTo259: RefCountTo259;
    ReferendumIndex: ReferendumIndex;
    ReferendumInfo: ReferendumInfo;
    ReferendumInfoFinished: ReferendumInfoFinished;
    ReferendumInfoTo239: ReferendumInfoTo239;
    ReferendumStatus: ReferendumStatus;
    RegisteredParachainInfo: RegisteredParachainInfo;
    RegistrarIndex: RegistrarIndex;
    RegistrarInfo: RegistrarInfo;
    Registration: Registration;
    RegistrationJudgement: RegistrationJudgement;
    RegistrationTo198: RegistrationTo198;
    RelayBlockNumber: RelayBlockNumber;
    RelayChainBlockNumber: RelayChainBlockNumber;
    RelayChainHash: RelayChainHash;
    RelayerId: RelayerId;
    RelayHash: RelayHash;
    Releases: Releases;
    Remark: Remark;
    Renouncing: Renouncing;
    RentProjection: RentProjection;
    ReplacementTimes: ReplacementTimes;
    ReportedRoundStates: ReportedRoundStates;
    Reporter: Reporter;
    ReportIdOf: ReportIdOf;
    ReserveData: ReserveData;
    ReserveIdentifier: ReserveIdentifier;
    Response: Response;
    ResponseV0: ResponseV0;
    ResponseV1: ResponseV1;
    ResponseV2: ResponseV2;
    ResponseV2Error: ResponseV2Error;
    ResponseV2Result: ResponseV2Result;
    Retriable: Retriable;
    RewardDestination: RewardDestination;
    RewardPoint: RewardPoint;
    RoundSnapshot: RoundSnapshot;
    RoundState: RoundState;
    RpcMethods: RpcMethods;
    RuntimeDbWeight: RuntimeDbWeight;
    RuntimeDispatchInfo: RuntimeDispatchInfo;
    RuntimeVersion: RuntimeVersion;
    RuntimeVersionApi: RuntimeVersionApi;
    RuntimeVersionPartial: RuntimeVersionPartial;
    SafeRpcWrapper: SafeRpcWrapper;
    Schedule: Schedule;
    Scheduled: Scheduled;
    ScheduledTo254: ScheduledTo254;
    SchedulePeriod: SchedulePeriod;
    SchedulePriority: SchedulePriority;
    ScheduleTo212: ScheduleTo212;
    ScheduleTo258: ScheduleTo258;
    ScheduleTo264: ScheduleTo264;
    Scheduling: Scheduling;
    Seal: Seal;
    SealV0: SealV0;
    SeatHolder: SeatHolder;
    SeedOf: SeedOf;
    ServiceQuality: ServiceQuality;
    SessionIndex: SessionIndex;
    SessionInfo: SessionInfo;
    SessionInfoValidatorGroup: SessionInfoValidatorGroup;
    SessionKeys1: SessionKeys1;
    SessionKeys10: SessionKeys10;
    SessionKeys10B: SessionKeys10B;
    SessionKeys2: SessionKeys2;
    SessionKeys3: SessionKeys3;
    SessionKeys4: SessionKeys4;
    SessionKeys5: SessionKeys5;
    SessionKeys6: SessionKeys6;
    SessionKeys6B: SessionKeys6B;
    SessionKeys7: SessionKeys7;
    SessionKeys7B: SessionKeys7B;
    SessionKeys8: SessionKeys8;
    SessionKeys8B: SessionKeys8B;
    SessionKeys9: SessionKeys9;
    SessionKeys9B: SessionKeys9B;
    SetId: SetId;
    SetIndex: SetIndex;
    Si0Field: Si0Field;
    Si0LookupTypeId: Si0LookupTypeId;
    Si0Path: Si0Path;
    Si0Type: Si0Type;
    Si0TypeDef: Si0TypeDef;
    Si0TypeDefArray: Si0TypeDefArray;
    Si0TypeDefBitSequence: Si0TypeDefBitSequence;
    Si0TypeDefCompact: Si0TypeDefCompact;
    Si0TypeDefComposite: Si0TypeDefComposite;
    Si0TypeDefPhantom: Si0TypeDefPhantom;
    Si0TypeDefPrimitive: Si0TypeDefPrimitive;
    Si0TypeDefSequence: Si0TypeDefSequence;
    Si0TypeDefTuple: Si0TypeDefTuple;
    Si0TypeDefVariant: Si0TypeDefVariant;
    Si0TypeParameter: Si0TypeParameter;
    Si0Variant: Si0Variant;
    Si1Field: Si1Field;
    Si1LookupTypeId: Si1LookupTypeId;
    Si1Path: Si1Path;
    Si1Type: Si1Type;
    Si1TypeDef: Si1TypeDef;
    Si1TypeDefArray: Si1TypeDefArray;
    Si1TypeDefBitSequence: Si1TypeDefBitSequence;
    Si1TypeDefCompact: Si1TypeDefCompact;
    Si1TypeDefComposite: Si1TypeDefComposite;
    Si1TypeDefPrimitive: Si1TypeDefPrimitive;
    Si1TypeDefSequence: Si1TypeDefSequence;
    Si1TypeDefTuple: Si1TypeDefTuple;
    Si1TypeDefVariant: Si1TypeDefVariant;
    Si1TypeParameter: Si1TypeParameter;
    Si1Variant: Si1Variant;
    SiField: SiField;
    Signature: Signature;
    SignedAvailabilityBitfield: SignedAvailabilityBitfield;
    SignedAvailabilityBitfields: SignedAvailabilityBitfields;
    SignedBlock: SignedBlock;
    SignedBlockWithJustification: SignedBlockWithJustification;
    SignedBlockWithJustifications: SignedBlockWithJustifications;
    SignedExtensionMetadataLatest: SignedExtensionMetadataLatest;
    SignedExtensionMetadataV14: SignedExtensionMetadataV14;
    SignedSubmission: SignedSubmission;
    SignedSubmissionOf: SignedSubmissionOf;
    SignedSubmissionTo276: SignedSubmissionTo276;
    SignerPayload: SignerPayload;
    SigningContext: SigningContext;
    SiLookupTypeId: SiLookupTypeId;
    SiPath: SiPath;
    SiType: SiType;
    SiTypeDef: SiTypeDef;
    SiTypeDefArray: SiTypeDefArray;
    SiTypeDefBitSequence: SiTypeDefBitSequence;
    SiTypeDefCompact: SiTypeDefCompact;
    SiTypeDefComposite: SiTypeDefComposite;
    SiTypeDefPrimitive: SiTypeDefPrimitive;
    SiTypeDefSequence: SiTypeDefSequence;
    SiTypeDefTuple: SiTypeDefTuple;
    SiTypeDefVariant: SiTypeDefVariant;
    SiTypeParameter: SiTypeParameter;
    SiVariant: SiVariant;
    SlashingSpans: SlashingSpans;
    SlashingSpansTo204: SlashingSpansTo204;
    SlashJournalEntry: SlashJournalEntry;
    Slot: Slot;
    SlotNumber: SlotNumber;
    SlotRange: SlotRange;
    SlotRange10: SlotRange10;
    SocietyJudgement: SocietyJudgement;
    SocietyVote: SocietyVote;
    SolutionOrSnapshotSize: SolutionOrSnapshotSize;
    SolutionSupport: SolutionSupport;
    SolutionSupports: SolutionSupports;
    SpanIndex: SpanIndex;
    SpanRecord: SpanRecord;
    SpConsensusAuraSr25519AppSr25519Public: SpConsensusAuraSr25519AppSr25519Public;
    SpecVersion: SpecVersion;
    SpTrieStorageProof: SpTrieStorageProof;
    Sr25519Signature: Sr25519Signature;
    StakingLedger: StakingLedger;
    StakingLedgerTo223: StakingLedgerTo223;
    StakingLedgerTo240: StakingLedgerTo240;
    Statement: Statement;
    StatementKind: StatementKind;
    StorageChangeSet: StorageChangeSet;
    StorageData: StorageData;
    StorageDeposit: StorageDeposit;
    StorageEntryMetadataLatest: StorageEntryMetadataLatest;
    StorageEntryMetadataV10: StorageEntryMetadataV10;
    StorageEntryMetadataV11: StorageEntryMetadataV11;
    StorageEntryMetadataV12: StorageEntryMetadataV12;
    StorageEntryMetadataV13: StorageEntryMetadataV13;
    StorageEntryMetadataV14: StorageEntryMetadataV14;
    StorageEntryMetadataV9: StorageEntryMetadataV9;
    StorageEntryModifierLatest: StorageEntryModifierLatest;
    StorageEntryModifierV10: StorageEntryModifierV10;
    StorageEntryModifierV11: StorageEntryModifierV11;
    StorageEntryModifierV12: StorageEntryModifierV12;
    StorageEntryModifierV13: StorageEntryModifierV13;
    StorageEntryModifierV14: StorageEntryModifierV14;
    StorageEntryModifierV9: StorageEntryModifierV9;
    StorageEntryTypeLatest: StorageEntryTypeLatest;
    StorageEntryTypeV10: StorageEntryTypeV10;
    StorageEntryTypeV11: StorageEntryTypeV11;
    StorageEntryTypeV12: StorageEntryTypeV12;
    StorageEntryTypeV13: StorageEntryTypeV13;
    StorageEntryTypeV14: StorageEntryTypeV14;
    StorageEntryTypeV9: StorageEntryTypeV9;
    StorageHasher: StorageHasher;
    StorageHasherV10: StorageHasherV10;
    StorageHasherV11: StorageHasherV11;
    StorageHasherV12: StorageHasherV12;
    StorageHasherV13: StorageHasherV13;
    StorageHasherV14: StorageHasherV14;
    StorageHasherV9: StorageHasherV9;
    StorageKey: StorageKey;
    StorageKind: StorageKind;
    StorageMetadataV10: StorageMetadataV10;
    StorageMetadataV11: StorageMetadataV11;
    StorageMetadataV12: StorageMetadataV12;
    StorageMetadataV13: StorageMetadataV13;
    StorageMetadataV9: StorageMetadataV9;
    StorageProof: StorageProof;
    StoredPendingChange: StoredPendingChange;
    StoredState: StoredState;
    StrikeCount: StrikeCount;
    SubId: SubId;
    SubmissionIndicesOf: SubmissionIndicesOf;
    Supports: Supports;
    SyncState: SyncState;
    SystemInherentData: SystemInherentData;
    SystemOrigin: SystemOrigin;
    Tally: Tally;
    TaskAddress: TaskAddress;
    Text: Text;
    Timepoint: Timepoint;
    TokenError: TokenError;
    TombstoneContractInfo: TombstoneContractInfo;
    TraceBlockResponse: TraceBlockResponse;
    TraceError: TraceError;
    TransactionInfo: TransactionInfo;
    TransactionPriority: TransactionPriority;
    TransactionStorageProof: TransactionStorageProof;
    TransactionV0: TransactionV0;
    TransactionV1: TransactionV1;
    TransactionV2: TransactionV2;
    TransactionValidityError: TransactionValidityError;
    TransientValidationData: TransientValidationData;
    TreasuryProposal: TreasuryProposal;
    TrieId: TrieId;
    TrieIndex: TrieIndex;
    Type: Type;
    u128: u128;
    U128: U128;
    u16: u16;
    U16: U16;
    u256: u256;
    U256: U256;
    u32: u32;
    U32: U32;
    U32F32: U32F32;
    u64: u64;
    U64: U64;
    u8: u8;
    U8: U8;
    UnappliedSlash: UnappliedSlash;
    UnappliedSlashOther: UnappliedSlashOther;
    UncleEntryItem: UncleEntryItem;
    UnknownTransaction: UnknownTransaction;
    UnlockChunk: UnlockChunk;
    UnrewardedRelayer: UnrewardedRelayer;
    UnrewardedRelayersState: UnrewardedRelayersState;
    UpgradeGoAhead: UpgradeGoAhead;
    UpgradeRestriction: UpgradeRestriction;
    UpwardMessage: UpwardMessage;
    usize: usize;
    USize: USize;
    ValidationCode: ValidationCode;
    ValidationCodeHash: ValidationCodeHash;
    ValidationData: ValidationData;
    ValidationDataType: ValidationDataType;
    ValidationFunctionParams: ValidationFunctionParams;
    ValidatorCount: ValidatorCount;
    ValidatorId: ValidatorId;
    ValidatorIdOf: ValidatorIdOf;
    ValidatorIndex: ValidatorIndex;
    ValidatorIndexCompact: ValidatorIndexCompact;
    ValidatorPrefs: ValidatorPrefs;
    ValidatorPrefsTo145: ValidatorPrefsTo145;
    ValidatorPrefsTo196: ValidatorPrefsTo196;
    ValidatorPrefsWithBlocked: ValidatorPrefsWithBlocked;
    ValidatorPrefsWithCommission: ValidatorPrefsWithCommission;
    ValidatorSetId: ValidatorSetId;
    ValidatorSignature: ValidatorSignature;
    ValidDisputeStatementKind: ValidDisputeStatementKind;
    ValidityAttestation: ValidityAttestation;
    VecInboundHrmpMessage: VecInboundHrmpMessage;
    VersionedMultiAsset: VersionedMultiAsset;
    VersionedMultiAssets: VersionedMultiAssets;
    VersionedMultiLocation: VersionedMultiLocation;
    VersionedResponse: VersionedResponse;
    VersionedXcm: VersionedXcm;
    VersionMigrationStage: VersionMigrationStage;
    VestingInfo: VestingInfo;
    VestingSchedule: VestingSchedule;
    Vote: Vote;
    VoteIndex: VoteIndex;
    Voter: Voter;
    VoterInfo: VoterInfo;
    Votes: Votes;
    VotesTo230: VotesTo230;
    VoteThreshold: VoteThreshold;
    VoteWeight: VoteWeight;
    Voting: Voting;
    VotingDelegating: VotingDelegating;
    VotingDirect: VotingDirect;
    VotingDirectVote: VotingDirectVote;
    VouchingStatus: VouchingStatus;
    VrfData: VrfData;
    VrfOutput: VrfOutput;
    VrfProof: VrfProof;
    Weight: Weight;
    WeightLimitV2: WeightLimitV2;
    WeightMultiplier: WeightMultiplier;
    WeightPerClass: WeightPerClass;
    WeightToFeeCoefficient: WeightToFeeCoefficient;
    WildFungibility: WildFungibility;
    WildFungibilityV0: WildFungibilityV0;
    WildFungibilityV1: WildFungibilityV1;
    WildFungibilityV2: WildFungibilityV2;
    WildMultiAsset: WildMultiAsset;
    WildMultiAssetV1: WildMultiAssetV1;
    WildMultiAssetV2: WildMultiAssetV2;
    WinnersData: WinnersData;
    WinnersData10: WinnersData10;
    WinnersDataTuple: WinnersDataTuple;
    WinnersDataTuple10: WinnersDataTuple10;
    WinningData: WinningData;
    WinningData10: WinningData10;
    WinningDataEntry: WinningDataEntry;
    WithdrawReasons: WithdrawReasons;
    Xcm: Xcm;
    XcmAssetId: XcmAssetId;
    XcmError: XcmError;
    XcmErrorV0: XcmErrorV0;
    XcmErrorV1: XcmErrorV1;
    XcmErrorV2: XcmErrorV2;
    XcmOrder: XcmOrder;
    XcmOrderV0: XcmOrderV0;
    XcmOrderV1: XcmOrderV1;
    XcmOrderV2: XcmOrderV2;
    XcmOrigin: XcmOrigin;
    XcmOriginKind: XcmOriginKind;
    XcmpMessageFormat: XcmpMessageFormat;
    XcmV0: XcmV0;
    XcmV1: XcmV1;
    XcmV2: XcmV2;
    XcmVersion: XcmVersion;
    XcmVersionedMultiAsset: XcmVersionedMultiAsset;
  } // InterfaceTypes
} // declare module
