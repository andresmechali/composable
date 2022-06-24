import React, { useMemo } from "react";
import { ModalProps, Modal } from "@/components/Molecules";
import { Label } from "@/components/Atoms";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeConfirmingModal } from "@/stores/ui/uiSlice";
import BigNumber from "bignumber.js";
import { usePurchaseBond } from "../../../store/hooks/bond/usePurchaseBond";
import { SelectedBondOffer } from "@/defi/hooks/bonds/useBondOffer";
import { MockedAsset } from "@/store/assets/assets.types";

const defaultLabelProps = (label: string, balance: string) =>
  ({
    label: label,
    TypographyProps: { variant: "body1" },
    BalanceProps: {
      balance: balance,
      BalanceTypographyProps: {
        variant: "body1",
      },
    },
  } as const);

export type PreviewPurchaseModalProps = {
  bond: SelectedBondOffer,
  amount: BigNumber;
  rewardableTokens: string;
  setAmount: (v: BigNumber) => any;
} & ModalProps;

export const PreviewPurchaseModal: React.FC<PreviewPurchaseModalProps> = ({
  bond,
  amount,
  rewardableTokens,
  setAmount,
  ...modalProps
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const purchaseBond = usePurchaseBond(bond.selectedBondOffer ? bond.selectedBondOffer.offerId : new BigNumber(0), amount);

  const { principalAsset, roi } = bond;
    // marketPrice === 0 ? 0 : ((marketPrice - bondPrice) / marketPrice) * 100;

  const handlePurchaseBond = async () => {
    await purchaseBond();
    bond.updateBondInfo();
    // dispatch(closeConfirmingModal());
    // setAmount(new BigNumber(0));
  };

  const handleCancelBond = async () => {
    dispatch(closeConfirmingModal());
  };

  let principalSymbol = useMemo(() => {
    return principalAsset &&
      (principalAsset as any).baseAsset &&
      (principalAsset as any).quoteAsset
      ? (principalAsset as any).baseAsset.symbol +
          "/" +
          (principalAsset as any).quoteAsset
      : principalAsset && (principalAsset as MockedAsset).symbol
      ? (principalAsset as MockedAsset).symbol
      : "";
  }, [principalAsset]);

  return (
    <Modal onClose={handleCancelBond} {...modalProps}>
      <Box
        sx={{
          width: 480,
          margin: "auto",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            p: 2,
          },
        }}
      >
        <Typography variant="h5" textAlign="center">
          Purchase bond
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          color="text.secondary"
          mt={2}
        >
          Are you sure you want to bond for a negative discount? You will lose
          money if you do this...
        </Typography>

        <Box mt={8}>
          <Label
            {...defaultLabelProps(
              "Bonding",
              `${amount} ${[principalSymbol]}`
            )}
          />
          <Label
            mt={2}
            {...defaultLabelProps("You will get", `${rewardableTokens} PAB`)}
          />
          <Label mt={2} {...defaultLabelProps("Bond Price", `$${0}`)} />
          <Label
            mt={2}
            {...defaultLabelProps("Market Price", `$${0}`)}
          />
          <Label
            mt={2}
            {...defaultLabelProps("Discount", `${roi.toFormat(2)}%`)}
          />
        </Box>

        <Box mt={8}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handlePurchaseBond}
          >
            Purchase bond
          </Button>
        </Box>

        <Box mt={4}>
          <Button
            variant="text"
            fullWidth
            size="large"
            onClick={handleCancelBond}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
