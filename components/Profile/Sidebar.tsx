import { Statistic, Card } from "antd";
import PropTypes from "prop-types";
import Link from "next/link";
import { useEffect } from "react";
import { Alert } from "../Alert/Alert";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { WalletActions } from "@/store/wallet/WalletActions";

export default function UploadPicture({ pending_amount, withdrawable_amount }) {
  const dispatch = useAppDispatch();
  const {
    languages: { getAll },
    wallet,
    profile,
  } = useAppSelector((state) => state);
  useEffect(() => {
    if (wallet.loaded) return;
    dispatch(WalletActions.getWalletData());
  }, [wallet]);

  return (
    <div className="col-lg-4">
      <div className="pb-1">
        <Card title={getAll("Balance")}>
          <div className="statistic-item">
            <Statistic
              title={getAll("Pending_balance")}
              value={pending_amount}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              suffix="$"
            />
          </div>
          <div className="statistic-item">
            <Statistic
              title={getAll("Withdrawable_balance")}
              value={withdrawable_amount}
              precision={2}
              // valueStyle={{ color: darkMode ? "#8ac557" : "#3f8600" }}
              suffix="$"
            />
            {profile.withdrawable_amount > 9 ? (
              <>
                {wallet.is_withdrawable == true ? (
                  <div className="d-flex justify-content-end pt-1">
                    <Link href={"/withdrawal"}>
                      <a
                        className="btn butt-green butt-xs px-5"
                        style={{ float: "left" }}
                      >
                        {getAll("Withdrawal_request")}
                      </a>
                    </Link>
                  </div>
                ) : (
                  <Alert type="error">
                    <strong>{getAll("Unfortunately_you_already")}</strong>
                  </Alert>
                )}
              </>
            ) : (
              <Alert type="error">
                <strong>{getAll("Unfortunately_you_cannot")}</strong>
              </Alert>
            )}
          </div>
          <div className="statistic-item">
            <Statistic
              title={getAll("Total_balance")}
              value={Number(withdrawable_amount) + Number(pending_amount)}
              precision={2}
              // valueStyle={{ color: darkMode ? "#ddd" : "#222" }}
              suffix="$"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
UploadPicture.propTypes = {
  pending_amount: PropTypes.number,
  // darkMode: PropTypes.any,
  withdrawable_amount: PropTypes.number,
};
