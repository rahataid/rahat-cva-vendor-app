import { IonItem } from "@ionic/react";
import { useHistory } from "react-router";
import DismissibleAlert from "./home-alert";
import CardComponent from "./home-card";
import TransactionCard from "./transaction-card";
import ListSkeletonCard from "@components/loaders/skeleton/card/list";
import { useTranslation } from "react-i18next";

type VoucherStats = {
  freeVoucherRedeemed: number;
  referredVoucherRedeemed: number;
};

type PropTypes = {
  voucherData: any;
  transactionsData: any;
  isVendor?: boolean | null;
  isProjectLocked?: string | null;
  projectSettings?: any;
  vendorTransactions?: any;
  handleReload?: any;
  loading?: boolean;
  transactionsLoading?: boolean;
  currentUser?: any;
  isSettingsFetching?: boolean;
  enrolledTransactions?: any;
  isEnrolledFetching?: boolean;
  referredTransactions?: any;
  isReferredFetching?: boolean;
};

const Home = ({
  voucherData,
  isVendor,
  projectSettings,
  transactionsData,
  handleReload,
  loading,
  transactionsLoading,
  currentUser,
  isSettingsFetching,
  enrolledTransactions,
  isEnrolledFetching,
  referredTransactions,
  isReferredFetching,
}: PropTypes) => {
  const { t } = useTranslation();
  const history = useHistory();

  if (isSettingsFetching) {
    return (
      <>
        <ListSkeletonCard length={6} />
      </>
    );
  }

  if (!currentUser?.projects?.length > 0 || !currentUser?.isApproved) {
    return (
      <>
        <DismissibleAlert
          title={t("HOME_PAGE.TITLES.NOT_APPROVED")}
          color="warning"
          dismissText={t("HOME_PAGE.BUTTONS.RELOAD")}
          description={t("GLOBAL.ERRORS.NOT_APPROVED")}
          onButtonClick={handleReload}
          visible={!isVendor}
        />
        <IonItem
          color="white"
          lines="none"
          className={`ion-text-center ion-padding`}
        >
          {/* <IonLabel>
            <IonText>
              <p>You need to be approved to use all features</p>
            </IonText>
          </IonLabel> */}
        </IonItem>
      </>
    );
  }

  return (
    <>
      {/* <DismissibleAlert
        title="No Project"
        color="danger"
        dismissText="Set up Now"
        description="You have not set the project."
        onButtonClick={() => history.push("/select-project")}
        visible={
          !projectSettings?.baseUrl &&
          !projectSettings?.contracts &&
          !projectSettings?.network
        }
      /> */}
      {/* <DismissibleAlert
        title="Not Approved"
        color="warning"
        dismissText="Reload"
        description="You have not been approved. Please Contact admin."
        onButtonClick={() => window.location.reload()}
        visible={!isVendor}
        // visible={isVendor}
      /> */}
      {/* <DismissibleAlert
        title="Pending Tokens"
        color="success"
        dismissText="Accept"
        description={`You have ${pendingTokensToAccept} pending tokens.`}
        onButtonClick={() => acceptPendingTokens()}
        visible={Boolean(pendingTokensToAccept && +pendingTokensToAccept > 0)}
      /> */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}
      >
        <CardComponent
          subtitle={t("HOME_PAGE.TITLES.FREE_VOUCHER")}
          title={voucherData?.freeVoucherCount}
          loading={loading}
        />
        <CardComponent
          subtitle={t("HOME_PAGE.TITLES.DISCOUNT_VOUCHER")}
          title={voucherData?.discountVoucherCount}
          loading={loading}
        />
      </div>
      <div>
        <TransactionCard
          transactionsList={transactionsData}
          transactionsLoading={transactionsLoading}
          enrolledTransactions={enrolledTransactions}
          isEnrolledFetching={isEnrolledFetching}
          referredTransactions={referredTransactions}
          isReferredFetching={isReferredFetching}
        />
      </div>
    </>
  );
};

export default Home;
