import {
  IonCol,
  IonGrid,
  IonItem,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import useAppStore from "@store/app";
import { useHistory } from "react-router";
import DismissibleAlert from "./home-alert";
import CardComponent from "./home-card";
import TransactionCard from "./transaction-card";
import useTransactionsStore from "@store/transactions";

type PropTypes = {
  allowance?: string | null;
  disbursed?: string | null;
  isVendor?: boolean | null;
  isProjectLocked?: string | null;
  projectBalance?: string | null;
  pendingTokensToAccept?: string | null;
  acceptPendingTokens?: any;
  handleReload?: any;
};

const Home = ({
  allowance,
  disbursed,
  isVendor,
  isProjectLocked,
  projectBalance,
  pendingTokensToAccept,
  acceptPendingTokens,
  handleReload,
}: PropTypes) => {
  const { projectSettings } = useAppStore();
  const { vendorTransactions } = useTransactionsStore();
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
          color="primary"
          lines="none"
          className={`ion-padding`}
          style={{
            paddingTop: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonGrid>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonText color="white">
                  You need to get approved to use all features.
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
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
        <CardComponent subtitle="Allowance" title={allowance || "loading..."} />
        <CardComponent subtitle="Disbursed" title={disbursed || "loading..."} />
      </div>
      <div>
        <TransactionCard transactionsList={vendorTransactions} />
      </div>
    </>
  );
};

export default Home;
