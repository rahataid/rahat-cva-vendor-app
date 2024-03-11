import { IonItem } from "@ionic/react";
import { useHistory } from "react-router";
import DismissibleAlert from "./home-alert";
import CardComponent from "./home-card";
import TransactionCard from "./transaction-card";

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
};

const Home = ({
  voucherData,
  isVendor,
  projectSettings,
  transactionsData,
  handleReload,
  loading,
  transactionsLoading,
}: PropTypes) => {
  const history = useHistory();

  // if (!isVendor) {
  //   return (
  //     <>
  //       <DismissibleAlert
  //         title="Not Approved"
  //         color="warning"
  //         dismissText="Reload"
  //         description="You have not been approved. Please Contact admin."
  //         onButtonClick={handleReload}
  //         visible={!isVendor}
  //       />
  //       <IonItem
  //         color="white"
  //         lines="none"
  //         className={`ion-text-center ion-padding`}
  //       >
  //         {/* <IonLabel>
  //           <IonText>
  //             <p>You need to be approved to use all features</p>
  //           </IonText>
  //         </IonLabel> */}
  //       </IonItem>
  //     </>
  //   );
  // }

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
          subtitle="Free Vouchers Redeemed"
          title={voucherData?.freeVoucherRedeemed}
          loading={loading}
        />
        <CardComponent
          subtitle="Discount Vouchers Redeemed"
          title={voucherData?.referredVoucherRedeemed}
          loading={loading}
        />
      </div>
      <div>
        <TransactionCard
          transactionsList={transactionsData}
          transactionsLoading={transactionsLoading}
        />
      </div>
    </>
  );
};

export default Home;
