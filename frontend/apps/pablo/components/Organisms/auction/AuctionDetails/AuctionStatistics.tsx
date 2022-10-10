import { 
  Box, 
  BoxProps, 
  Grid, 
  Typography, 
  useTheme, 
} from "@mui/material";
import { MockedAsset } from "@/store/assets/assets.types";
import { LiquidityBootstrappingPool } from "@/defi/types";
import { LiquidityBootstrappingPoolStatistics } from "@/store/auctions/auctions.types";
import { DEFAULT_UI_FORMAT_DECIMALS } from "@/defi/utils";

export type AuctionStatisticsProps = {
  auction: LiquidityBootstrappingPool,
  baseAsset: MockedAsset | undefined,
  quoteAsset: MockedAsset | undefined,
  stats: LiquidityBootstrappingPoolStatistics,
} & BoxProps;

export const AuctionStatistics: React.FC<AuctionStatisticsProps> = ({
  auction,
  baseAsset,
  quoteAsset,
  stats,
  ...rest
}) => {
  const {
    startLiquidity,
    liquidity,
  } = stats;

  return (
    <Box {...rest}>
      <Typography variant="h6">
        Auction Statistics
      </Typography>
      <Grid container mt={4}>
        <Grid item xs={12} sm={12} md={3}>
          <Typography variant="body1" color="text.secondary">
            Start balances
          </Typography>
          <Typography variant="subtitle1" mt={1}>
            {`${startLiquidity.baseAmount.toFixed(DEFAULT_UI_FORMAT_DECIMALS)} ${baseAsset?.symbol}`}
          </Typography>
          <Typography variant="subtitle1">
            {`${startLiquidity.quoteAmount.toFixed(DEFAULT_UI_FORMAT_DECIMALS)} ${quoteAsset?.symbol}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Typography variant="body1" color="text.secondary">
            Current balances
          </Typography>
          <Typography variant="subtitle1" mt={1}>
            {`${liquidity.baseAmount.toFixed(DEFAULT_UI_FORMAT_DECIMALS)} ${baseAsset?.symbol}`}
          </Typography>
          <Typography variant="subtitle1">
            {`${liquidity.quoteAmount.toFixed(DEFAULT_UI_FORMAT_DECIMALS)} ${quoteAsset?.symbol}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Typography variant="body1" color="text.secondary">
            Total sold
          </Typography>
          <Typography variant="subtitle1" mt={1}>
            {`${startLiquidity.baseAmount.minus(liquidity.baseAmount).toFixed(4)} ${baseAsset?.symbol}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Typography variant="body1" color="text.secondary">
            Total raised
          </Typography>
          <Typography variant="subtitle1" mt={1}>
            {`${liquidity.quoteAmount.minus(startLiquidity.quoteAmount).toFixed(4)} ${quoteAsset?.symbol}`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}