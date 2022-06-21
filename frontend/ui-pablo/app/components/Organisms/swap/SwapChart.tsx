import { Chart, PairAsset } from "@/components";
import {
  Box,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { BoxProps } from "@mui/system";
import { DEFI_CONFIG } from "@/defi/config";
import useStore from "@/store/useStore";
import BigNumber from "bignumber.js";
import { useSwapsChart } from "@/store/hooks/useSwapsChart";
import { DEFAULT_NETWORK_ID } from "@/defi/utils";

const SwapChart: React.FC<BoxProps> = ({ ...boxProps }) => {
  const theme = useTheme();

  const { swaps, supportedAssets } = useStore();
  const {selectedInterval, chartSeries, seriesIntervals, _24hourOldPrice, setSelectedInterval} = useSwapsChart();

  const baseAsset = useMemo(() => {
    return supportedAssets.find(i => i.network[DEFAULT_NETWORK_ID] === swaps.ui.baseAssetSelected)
  }, [swaps.ui, supportedAssets])

  const quoteAsset = useMemo(() => {
    return supportedAssets.find(i => i.network[DEFAULT_NETWORK_ID] === swaps.ui.quoteAssetSelected)
  }, [swaps.ui, supportedAssets])

  const changePercent = useMemo(() => {
    if (swaps.poolVariables.spotPrice === "0") return 0 
    if (_24hourOldPrice.eq(0)) return 100
    return new BigNumber(_24hourOldPrice).div(swaps.poolVariables.spotPrice).toNumber()
  }, [swaps.poolVariables.spotPrice, _24hourOldPrice]);

  const intervals = DEFI_CONFIG.swapChartIntervals;

  const onIntervalChange = (interval: string) => {
    let i = intervals.find(
      (i) => i.symbol === interval
    )
    if (i) setSelectedInterval(i)
  };

  const getCurrentInterval = () => {
    return intervals.find(
      (interval) => interval.symbol === selectedInterval.symbol
    );
  };

  // const onRefreshChart = () => {
    //TODO: refresh Chart Data
  // };

  return (
    <Box {...boxProps}>
      <Chart
        height="100%"
        titleComponent={
          <Box>
            <Box pt={2} display="flex" gap={1}>
              {
                baseAsset && quoteAsset ? <PairAsset
                assets={[
                  {
                    icon: quoteAsset.icon,
                    label: quoteAsset.symbol,
                  },
                  {
                    icon: baseAsset.icon,
                    label: baseAsset.symbol
                  },
                ]}
                separator="-"
              /> : null
              }
              {/* <RefreshOutlined
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
                onClick={onRefreshChart}
              /> */}
            </Box>
          </Box>
        }
        totalText={`${swaps.poolVariables.spotPrice} ${baseAsset ? baseAsset.symbol : ""}`}
        changeTextColor={
          changePercent > 0
            ? theme.palette.featured.main
            : theme.palette.error.main
        }
        changeIntroText={`Past ${getCurrentInterval()?.name}`}
        changeText={
          changePercent > 0
            ? `+${changePercent}% ${baseAsset ? baseAsset.symbol : ""}`
            : `${changePercent}% ${baseAsset ? baseAsset.symbol : ""}`
        }
        AreaChartProps={{
          data: chartSeries,
          height: 330,
          shorthandLabel: "Change",
          labelFormat: (n: number) => n.toFixed(),
          color: theme.palette.featured.main,
        }}
        onIntervalChange={onIntervalChange}
        intervals={intervals.map((interval) => interval.symbol)}
        currentInterval={selectedInterval.symbol}
        timeSlots={seriesIntervals}
      />
    </Box>
  );
};

export default SwapChart;
