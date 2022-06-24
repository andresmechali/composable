import { ConstantProductPool, PoolFeeConfig, StableSwapPool } from "@/defi/types";
import BigNumber from "bignumber.js";

export type SwapsChartRange = "24h" | "1w" | "1m";
export type SwapSide = "base" | "quote";
export interface SwapsSlice {
  swaps: {
    spotPrice: BigNumber;
    selectedAssets: {
      base: string | "none";
      quote: string | "none";
    },
    selectedPool: ConstantProductPool | StableSwapPool | undefined;
    setSelectedPool: (pool: ConstantProductPool | StableSwapPool | undefined) => void;
    flipAssetSelection: () => void;
    setSelectedAsset: (assetId: string | "none", side: SwapSide) => void;
    setSpotPrice: (spotPrice: BigNumber) => void;
    resetSwaps: () => void;
  },
}