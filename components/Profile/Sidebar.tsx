import { Statistic, Card } from "antd";
import PropTypes from "prop-types";
import Link from "next/link";
import useSWR from "swr";
import { Alert } from "../Alert/Alert";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

export default function UploadPicture({
  pending_amount,
  withdrawable_amount,
  darkMode,
}) {
  const { data: userInfo }: any = useSWR("api/me");
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  return (
    <div className="col-lg-4">
      <div className="pb-1">
        <Card title={getLogin("Balance")}>
          <div className="statistic-item">
            <Statistic
              title={getLogin("Pending_balance")}
              value={pending_amount}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              suffix="$"
            />
          </div>
          <div className="statistic-item">
            <Statistic
              title={getLogin("Withdrawable_balance")}
              value={withdrawable_amount}
              precision={2}
              valueStyle={{ color: darkMode ? "#8ac557" : "#3f8600" }}
              suffix="$"
            />
            {userInfo &&
            userInfo.user_details.profile.withdrawable_amount > 9 ? (
              <>
                {userInfo &&
                userInfo.user_details.profile.wallet.is_withdrawable == true ? (
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
                    <strong>{getLogin("Unfortunately_you_already")}</strong>
                  </Alert>
                )}
              </>
            ) : (
              <Alert type="error">
                <strong>{getLogin("Unfortunately_you_cannot")}</strong>
              </Alert>
            )}
          </div>
          <div className="statistic-item">
            <Statistic
              title={getLogin("Total_balance")}
              value={Number(withdrawable_amount) + Number(pending_amount)}
              precision={2}
              valueStyle={{ color: darkMode ? "#ddd" : "#222" }}
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
  darkMode: PropTypes.any,
  withdrawable_amount: PropTypes.number,
};
