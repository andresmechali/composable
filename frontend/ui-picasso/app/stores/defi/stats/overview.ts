import { NamedSet } from "zustand/middleware";
import { AllSlices, StoreSlice } from "../../types";
import StatsDummyData from "./dummyData";

const CHART_INTERVAL = ["1h", "24h", "1w", "1m", "1y"];

export type OverviewDataProps = {
  name: string;
  value: number;
};

interface OverviewData {
  data: Array<OverviewDataProps>;
}

interface ChartData {
  name: string;
  value: number;
  change: number;
  data: Array<[number, number][]>;
  interval: Array<string>;
  pickedInterval: number;
}

interface OverviewChartData {
  data: Array<{ data: ChartData }>;
}

interface OverviewState {
  overviewData: OverviewData;
  overviewChartData: OverviewChartData;
}

const initialState: OverviewState = {
  overviewData: {
    data: StatsDummyData.OVERVIEW.infoData,
  },
  overviewChartData: {
    data: [
      {
        data: {
          name: "Total value locked",
          value: 54653784,
          change: 34,
          data: StatsDummyData.OVERVIEW.chartData.tvl,
          interval: CHART_INTERVAL,
          pickedInterval: 0,
        },
      },
      {
        data: {
          name: "Daily active users",
          value: 12567,
          change: -1.31,
          data: StatsDummyData.OVERVIEW.chartData.users,
          interval: CHART_INTERVAL,
          pickedInterval: 0,
        },
      },
    ],
  },
};

export interface StatsOverviewSlice {
  statsOverview: OverviewState & {
    setTVL: (data: OverviewData["data"][0]) => void;
    setAccountHolders: (data: OverviewData["data"][1]) => void;
    setTotalTx: (data: OverviewData["data"][2]) => void;
    setRewardDistribution: (data: OverviewData["data"][3]) => void;
    setTotalFees: (data: OverviewData["data"][4]) => void;
    setEarnedStakingTvl: (data: OverviewData["data"][5]) => void;
    setTvlInterval: (data: number) => void;
    setDailyActiveUsersInterval: (data: number) => void;
  };
}

export const createStatsOverviewSlice: StoreSlice<StatsOverviewSlice> = (
  set: NamedSet<StatsOverviewSlice>
) => ({
  statsOverview: {
    ...initialState,
    setTVL: (data: OverviewData["data"][0]) => {
      set((state: AllSlices) => {
        state.statsOverview.overviewData.data[0] = data;
      });
    },
    setAccountHolders: (data: OverviewData["data"][1]) => {
      set((state: AllSlices) => {
        state.statsOverview.overviewData.data[1] = data;
      });
    },
    setTotalTx: (data: OverviewData["data"][2]) => {
      set((state: AllSlices) => {
        state.statsOverview.overviewData.data[2] = data;
      });
    },
    setRewardDistribution: (data: OverviewData["data"][3]) => {
      set((state: AllSlices) => {
        state.statsOverview.overviewData.data[3] = data;
      });
    },
    setTotalFees: (data: OverviewData["data"][4]) => {
      set((state: AllSlices) => {
        state.statsOverview.overviewData.data[4] = data;
      });
    },
    setEarnedStakingTvl: (data: OverviewData["data"][5]) => {
      set((state: AllSlices) => {
        state.statsOverview.overviewData.data[5] = data;
      });
    },
    setTvlInterval: (data: number) => {
      set((state: AllSlices) => {
        state.statsOverview.overviewChartData.data[0].data.pickedInterval =
          data;
      });
    },
    setDailyActiveUsersInterval: (data: number) => {
      set((state: AllSlices) => {
        state.statsOverview.overviewChartData.data[1].data.pickedInterval =
          data;
      });
    },
  },
});
