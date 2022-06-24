import {
  Box,
  BoxProps,
  TypographyProps,
} from "@mui/material";
import BigNumber from "bignumber.js";
import { Label } from "@/components";
import { useMemo } from "react";
import { LiquidityPoolType } from "@/store/pools/pools.types";
import { MockedAsset } from "@/store/assets/assets.types";


export type SwapSummaryProps = {
  quoteAsset: MockedAsset | undefined,
  baseAsset: MockedAsset | undefined,
  poolType: LiquidityPoolType | "none",
  
  minimumReceived: BigNumber,
  priceImpact: number,
  PriceImpactProps?: TypographyProps,
  baseAssetAmount: BigNumber,
  quoteAssetAmount: BigNumber,
  feeCharged: BigNumber,
  price?: BigNumber,
} & BoxProps;

export const SwapSummary: React.FC<SwapSummaryProps> = ({
  quoteAsset,
  baseAsset,
  poolType,
  minimumReceived,
  baseAssetAmount,
  quoteAssetAmount,
  priceImpact,
  PriceImpactProps,
  feeCharged,
  price,
  ...boxProps
}) => {

  const validTokens = !!baseAsset && !!quoteAsset;

  const fee = useMemo(() => {
    if (feeCharged) {
      return feeCharged
    }
    return new BigNumber(0)
  }, [feeCharged])

  if (!validTokens) {
    return <></>;
  }

  return (
    <Box {...boxProps}>
      {price && (
        <Label
          label="Price"
          BalanceProps={{
            balance: `1 ${baseAsset?.symbol} = ${price.toFixed()} ${quoteAsset?.symbol}`
          }}
          mb={2}
        />
      )}
      <Label
        label="Minimum recieved"
        TooltipProps={{
          title: "Minimum recieved"
        }}
        BalanceProps={{
          balance: `${minimumReceived.toFixed()} ${baseAsset?.symbol}`
        }}
        mb={2}
      />
      {/* <Label
        label="Price impact"
        TooltipProps={{
          title: "Price impact"
        }}
        BalanceProps={{
          balance: `${priceImpact.toFixed(4)} %`,
          BalanceTypographyProps: {
            color: "primary.main",
            ...PriceImpactProps,
          },
        }}
        mb={2}
      /> */}
      <Label
        label="Liquidity provider fee"
        TooltipProps={{
          title: "Liquidity provider fee"
        }}
        BalanceProps={{
          balance: `${fee.toFixed(4)} ${
            poolType !== "none" && poolType !== "StableSwap" ? quoteAsset.symbol : baseAsset.symbol
          }`
        }}
        mb={0}
      />
    </Box>
  );
}