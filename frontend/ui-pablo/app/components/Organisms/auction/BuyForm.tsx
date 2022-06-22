import {
  alpha,
  Box,
  BoxProps,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import BigNumber from "bignumber.js";
import { DropdownCombinedBigNumberInput, BigNumberInput } from "@/components";
import { useMobile } from "@/hooks/responsive";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch } from "@/hooks/store";
import { openPolkadotModal } from "@/stores/ui/uiSlice";
import { getFullHumanizedDateDiff } from "@/utils/date";
import {
  useDotSamaContext,
  useExecutor,
  useParachainApi,
  usePendingExtrinsic,
  useSelectedAccount,
} from "substrate-react";
import { LiquidityBootstrappingPool } from "@/store/pools/pools.types";
import { getAssetById } from "@/defi/polkadot/Assets";
import { getSigner } from "substrate-react";
import { APP_NAME } from "@/defi/polkadot/constants";
import useStore from "@/store/useStore";
import { debounce } from "lodash";
import { ConfirmingModal } from "../swap/ConfirmingModal";
import { useSnackbar } from "notistack";
import { DEFAULT_NETWORK_ID, toChainUnits } from "@/defi/utils";
import { calculateSwap } from "@/defi/utils/pablo/swaps";
import { fetchAuctions, fetchTrades } from "@/defi/utils/pablo/auctions";
import { useAssetBalance } from "@/store/assets/hooks";

export type BuyFormProps = {
  auction: LiquidityBootstrappingPool;
} & BoxProps;

export const BuyForm: React.FC<BuyFormProps> = ({ auction, ...rest }) => {
  const { auctions: { activeLBP }, putHistoryActiveLBP, putStatsActiveLBP, supportedAssets } = useStore();
  const { extensionStatus } = useDotSamaContext();
  const { parachainApi } = useParachainApi(DEFAULT_NETWORK_ID);
  const selectedAccount = useSelectedAccount(DEFAULT_NETWORK_ID);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMobile();
  const executor = useExecutor();
  const currentTimestamp = Date.now();

  const updateState = useCallback(async () => {
    const { poolId } = activeLBP;
    if (parachainApi && poolId !== -1) {
      const stats = await fetchAuctions(parachainApi, activeLBP);
      const trades = await fetchTrades(activeLBP);
      putStatsActiveLBP(stats);
      putHistoryActiveLBP(trades);
    }
  }, [activeLBP, putHistoryActiveLBP, putStatsActiveLBP, parachainApi])

  const isActive: boolean =
    auction.sale.start <= currentTimestamp &&
    auction.sale.end >= currentTimestamp;
  const isEnded: boolean = auction.sale.end < currentTimestamp;

  const isPendingBuy = usePendingExtrinsic(
    "exchange",
    "dexRouter",
    selectedAccount ? selectedAccount.address : ""
  );

  const { baseAsset, quoteAsset } = useMemo(() => {
    let baseAsset, quoteAsset;
    baseAsset = supportedAssets.find(a => a.network[DEFAULT_NETWORK_ID] === auction.pair.base.toString())
    quoteAsset = supportedAssets.find(a => a.network[DEFAULT_NETWORK_ID] === auction.pair.quote.toString())
    return { baseAsset, quoteAsset }
  }, [auction, supportedAssets]);

  const balanceBase = useAssetBalance(DEFAULT_NETWORK_ID, auction.pair.base.toString())
  const balanceQuote = useAssetBalance(DEFAULT_NETWORK_ID, auction.pair.quote.toString())

  const [valid1, setValid1] = useState<boolean>(false);
  const [valid2, setValid2] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const buttonDisabled = useMemo(() => {
    return extensionStatus !== "connected" || !valid1 || !valid2;
  }, [extensionStatus, valid1, valid2]);

  const [baseAssetAmount, setBaseAmount] = useState(new BigNumber(0));
  const [quoteAssetAmount, setQuoteAmount] = useState(new BigNumber(0));
  const [minReceive, setMinReceive] = useState(new BigNumber(0));
  const [disableHandler, setDisableHandler] = useState(false);

  const onSwapAmountInput = (swapAmount: {
    value: BigNumber;
    side: "quote" | "base";
  }) => {
    setDisableHandler(true);

    if (parachainApi && baseAsset && quoteAsset) {
      const { value, side } = swapAmount;
      if (side === "base") {
        setBaseAmount(swapAmount.value);
      } else {
        setQuoteAmount(swapAmount.value);
      }

      const exchangeParams: any = {
        quoteAmount: value,
        baseAssetId: baseAsset.network[DEFAULT_NETWORK_ID],
        quoteAssetId: quoteAsset.network[DEFAULT_NETWORK_ID],
        side: side,
        slippage: 0.1,
      };

      calculateSwap(parachainApi, exchangeParams, {
        poolAccountId: "",
        poolIndex: auction.poolId,
        fee: auction.feeConfig.feeRate.toString(),
        poolType: "LiquidityBootstrapping",
        pair: auction.pair,
        lbpConstants: undefined,
      }).then((impact) => {
        swapAmount.side === "base"
          ? setQuoteAmount(new BigNumber(impact.tokenOutAmount))
          : setBaseAmount(new BigNumber(impact.tokenOutAmount));
        setMinReceive(new BigNumber(impact.minimumRecieved));
        setTimeout(() => setDisableHandler(false), 1000);
      });
    }
  };
  const handler = debounce(onSwapAmountInput, 1000);

  const handleBuy = useCallback(async () => {
    if (parachainApi && selectedAccount && executor) {

      const minRec = parachainApi.createType(
        "u128",
        toChainUnits(minReceive).toString()
      );
      const amountParam = parachainApi.createType(
        "u128",
        toChainUnits(baseAssetAmount).toString()
      );

      try {
        const signer = await getSigner(APP_NAME, selectedAccount.address);

        await executor
          .execute(
            parachainApi.tx.dexRouter.exchange(
              auction.pair,
              amountParam,
              minRec
            ),
            selectedAccount.address,
            parachainApi,
            signer,
            (txHash: string) => {
              enqueueSnackbar('Initiating Transaction');
            },
            (txHash: string, events) => {
              enqueueSnackbar('Transaction Finalized');
              updateState();
            }
          )
          .catch((err) => {
            enqueueSnackbar(err.message);
          });
      } catch (err: any) {
        enqueueSnackbar(err.message);
      }
    }
  }, [parachainApi, executor, selectedAccount, baseAsset, baseAssetAmount, updateState]);

  return (
    <Box
      position="relative"
      sx={{
        background: theme.palette.gradient.secondary,
        borderRadius: 1,
        padding: theme.spacing(4),
        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(2),
        },
      }}
      {...rest}
    >
      <Box visibility={isActive ? undefined : "hidden"}>
        <DropdownCombinedBigNumberInput
          onMouseDown={(evt) => setDisableHandler(false)}
          maxValue={balanceQuote}
          setValid={setValid1}
          noBorder
          value={quoteAssetAmount}
          setValue={(value) => {
            if (disableHandler) return;
            handler({
              value,
              side: "quote",
            });
            // set Value
          }}
          buttonLabel={"Max"}
          ButtonProps={{
            onClick: () => {},
            sx: {
              padding: theme.spacing(1),
            },
          }}
          CombinedSelectProps={{
            value: quoteAsset ? quoteAsset.network[DEFAULT_NETWORK_ID] : undefined,
            dropdownModal: true,
            forceHiddenLabel: isMobile ? true : false,
            options: [
              {
                value: "none",
                label: "Select",
                icon: undefined,
                disabled: true,
                hidden: true,
              },
              ... quoteAsset ? [
                {
                  value: quoteAsset.network[DEFAULT_NETWORK_ID],
                  icon: quoteAsset.icon,
                  label: quoteAsset.symbol,
                },
              ] : [],
            ],
            borderLeft: false,
            minWidth: isMobile ? undefined : 150,
            searchable: true,
          }}
          LabelProps={{
            label: "Currency",
            BalanceProps: {
              title: <AccountBalanceWalletIcon color="primary" />,
              balance: `${balanceBase.toFixed(4)}`,
            },
          }}
        />
      </Box>
      <Box
        mt={4}
        textAlign="center"
        visibility={isActive ? undefined : "hidden"}
      >
        <Box
          width={56}
          height={56}
          borderRadius={9999}
          display="flex"
          justifyContent="center"
          alignItems="center"
          margin="auto"
          sx={{
            background: alpha(
              theme.palette.primary.main,
              theme.custom.opacity.light
            ),
          }}
        >
          <ExpandMoreIcon />
        </Box>
      </Box>
      <Box mt={4} visibility={isActive ? undefined : "hidden"}>
        <BigNumberInput
          onMouseDown={(evt) => setDisableHandler(false)}
          value={baseAssetAmount}
          setValue={(value) => {
            if (disableHandler) return;
            handler({
              value,
              side: "base",
            });
          }}
          maxValue={balanceBase}
          setValid={setValid2}
          EndAdornmentAssetProps={{
            assets: baseAsset ? [
              {
                icon: baseAsset.icon,
                label: baseAsset.symbol,
              },
            ] : [],
          }}
          LabelProps={{
            label: "Launch token",
            BalanceProps: {
              title: <AccountBalanceWalletIcon color="primary" />,
              balance: `${balanceBase.toFixed(4)}`,
            },
          }}
        />
      </Box>

      <Box mt={4}>
        {extensionStatus === "connected" && (
          <Button
            variant="contained"
            fullWidth
            disabled={isPendingBuy || buttonDisabled}
            onClick={() => handleBuy()}
          >
            Buy {baseAsset ? baseAsset.symbol : ""}
          </Button>
        )}

        {/* {extensionStatus === "connected" && !approved && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => setApproved(true)}
          >
            {!isActive ? `Buy ${getToken(tokenId2).symbol}` : `Approve ${getToken(tokenId1).symbol} usage`}
          </Button>
        )} */}

        {extensionStatus !== "connected" && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => dispatch(openPolkadotModal())}
          >
            Connect wallet
          </Button>
        )}
      </Box>
      {!isActive && (
        <Box
          height="100%"
          width="100%"
          position="absolute"
          sx={{
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 1,
            backgroundColor: alpha(
              theme.palette.common.white,
              theme.custom.opacity.lightest
            ),
            backdropFilter: "blur(8px)",
            padding: theme.spacing(4),
          }}
          textAlign="center"
        >
          {isEnded ? (
            <>
              <Typography variant="subtitle1" fontWeight={600}>
                The LBP has ended
              </Typography>
              <Typography variant="body1" mt={1.5}>
                Check the lists for more
              </Typography>
              <Typography variant="body1">upcoming LBP.</Typography>
            </>
          ) : (
            <>
              <Typography variant="subtitle1" fontWeight={600}>
                The LBP has not started
              </Typography>
              <Typography variant="body1" mt={1.5}>
                The LBP starts in{" "}
                {getFullHumanizedDateDiff(Date.now(), auction.sale.start)}.
              </Typography>
              <Typography variant="body1">
                Swapping will be enabling by the
              </Typography>
              <Typography variant="body1">
                LBP creator at start time.
              </Typography>
            </>
          )}
        </Box>
      )}
      <ConfirmingModal open={isPendingBuy} />
    </Box>
  );
};
