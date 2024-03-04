import {
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonLoading,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import { useHistory } from "react-router";
import DismissibleAlert from "./home-alert";
import CardComponent from "./home-card";
import TransactionCard from "./transaction-card";
import IndeterminateLoader from "@components/loaders/Indeterminate";

type PropTypes = {
  allowance?: string | null;
  disbursed?: string | null;
  isVendor?: boolean | null;
  isProjectLocked?: string | null;
  projectBalance?: string | null;
  pendingTokensToAccept?: string | null;
  acceptPendingTokens?: any;
  projectSettings?: any;
  vendorTransactions?: any;
  handleReload?: any;
  loading?: boolean;
};

const Home = ({
  allowance,
  disbursed,
  isVendor,
  pendingTokensToAccept,
  acceptPendingTokens,
  projectSettings,
  vendorTransactions,
  handleReload,
  loading,
}: PropTypes) => {
  const history = useHistory();

  if (!isVendor) {
    return (
      <>
        <DismissibleAlert
          title="Not Approved"
          color="warning"
          dismissText="Reload"
          description="You have not been approved. Please Contact admin."
          onButtonClick={handleReload}
          visible={!isVendor}
        />
        <IonItem
          color="white"
          lines="none"
          className={`ion-text-center ion-padding`}
        >
          <IonLabel>
            <IonText color="dark">
              <p>You need to be approved to use all features</p>
            </IonText>
          </IonLabel>
        </IonItem>
      </>
    );
  }

  return (
    <>
      <DismissibleAlert
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
      />
      <DismissibleAlert
        title="Not Approved"
        color="warning"
        dismissText="Reload"
        description="You have not been approved. Please Contact admin."
        onButtonClick={() => window.location.reload()}
        visible={!isVendor}
        // visible={isVendor}
      />
      <DismissibleAlert
        title="Pending Tokens"
        color="success"
        dismissText="Accept"
        description={`You have ${pendingTokensToAccept} pending tokens.`}
        onButtonClick={() => acceptPendingTokens()}
        visible={Boolean(pendingTokensToAccept && +pendingTokensToAccept > 0)}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}
      >
        <CardComponent
          subtitle="No. Of Free Vouchers Redeemed"
          title={"4" || "loading..."}
          loading={false}
        />
        <CardComponent
          subtitle="No. Of Discount Vouchers Redeemed"
          title={"5" || "loading..."}
          loading={false}
        />
      </div>
      <div>
        <TransactionCard transactionsList={vendorTransactions} />
      </div>
    </>
  );
};

export default Home;
