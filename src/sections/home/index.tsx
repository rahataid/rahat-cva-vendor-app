import { IonTitle } from "@ionic/react";
import useAppStore from "@store/app";
import { useHistory } from "react-router";
import DismissibleAlert from "./home-alert";
import CardComponent from "./home-card";
import TransactionCard from "./transaction-card";

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
  const { projectSettings, transactions } = useAppStore();
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
        <IonTitle className="title-center">
          You need to get approved to use all features.
        </IonTitle>
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
        <TransactionCard transactionsList={transactions} />
      </div>
    </>
  );
};

export default Home;
