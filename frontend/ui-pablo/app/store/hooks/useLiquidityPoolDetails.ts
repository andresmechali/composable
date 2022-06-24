import { ConstantProductPool, StableSwapPool } from "@/store/pools/pools.types";
import BigNumber from "bignumber.js";
import { useState, useEffect, useMemo } from "react";
import useStore from "@/store/useStore";
import { useAllLpTokenRewardingPools } from "./useAllLpTokenRewardingPools";
import { useLiquidityByPool } from "./useLiquidityByPool";
import { DailyRewards } from "../poolStats/poolStats.types";
import { calculatePoolStats, fetchPoolStats } from "@/defi/utils/pablo";
import { MockedAsset } from "../assets/assets.types";
import { DEFAULT_NETWORK_ID } from "@/defi/utils";

export const useLiquidityPoolDetails = (poolId: number) => {
  const { poolStats, poolStatsValue, userLpBalances, putPoolStats, supportedAssets } = useStore();

  const allLpRewardingPools = useAllLpTokenRewardingPools();
  const [pool, setPool] =
    useState<StableSwapPool | ConstantProductPool | undefined>(undefined);

  const tokensLocked = useLiquidityByPool(pool);

  const [baseAsset, setBaseAsset] =
    useState<MockedAsset | undefined>(undefined);
  const [quoteAsset, setQuoteAsset] =
    useState<MockedAsset | undefined>(undefined);

  useEffect(() => {
    let matchingPool: StableSwapPool | ConstantProductPool | undefined =
      allLpRewardingPools.find((p) => p.poolId === poolId);

    if (matchingPool) {
      let b = matchingPool.pair.base.toString();
      let q = matchingPool.pair.quote.toString();
      const baseAsset = supportedAssets.find(a => a.network[DEFAULT_NETWORK_ID] === b)
      const quoteAsset = supportedAssets.find(a => a.network[DEFAULT_NETWORK_ID] === q)
      setPool(matchingPool);
      setBaseAsset(baseAsset);
      setQuoteAsset(quoteAsset);
    } else {
      setPool(undefined);
      setBaseAsset(undefined);
      setQuoteAsset(undefined);
    }
  }, [poolId, allLpRewardingPools, supportedAssets]);

  useEffect(() => {
    if (pool) {
      fetchPoolStats(pool).then((poolStates) => {
        const poolStats = calculatePoolStats(poolStates);
        if (poolStats) {
          putPoolStats(pool.poolId, poolStats)
        }
      })
    }
  }, [pool, putPoolStats]);

  const _poolStats = useMemo(() => {
    let _poolValue = {
      _24HrFeeValue: "0",
      _24HrVolumeValue: "0",
      totalVolumeValue: "0",
    };

    let _poolStats = {
      _24HrTransactionCount: 0,
      dailyRewards: [] as DailyRewards[],
      apr: "0",
    };

    if (poolStatsValue[poolId]) {
      _poolValue = poolStatsValue[poolId];
    }

    if (poolStats[poolId]) {
      _poolStats = poolStats[poolId];
    }

    return {
      ..._poolValue,
      ..._poolStats,
    };
  }, [poolStats, poolStatsValue, poolId]);

  const lpBalance = useMemo(() => {
    if (pool) {
      if (userLpBalances[pool.poolId]) {
        return new BigNumber(userLpBalances[pool.poolId]);
      }
    }
    return new BigNumber(0);
  }, [pool, userLpBalances]);

  return {
    baseAsset,
    quoteAsset,
    pool,
    lpBalance,
    tokensLocked,
    poolStats: _poolStats,
  };
};