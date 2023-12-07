import { IonText } from "@ionic/react";
import useAppStore from "@store/app";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import DismissibleAlert from "./home-alert";
import CardComponent from "./home-card";
import TransactionCard from "./transaction-card";

type PropTypes = {
  allowance?: string | null;
  disbursed?: string | null;
  isVendorApproved?: string | null;
  isProjectLocked?: string | null;
  projectBalance?: string | null;
  pendingTokensToAccept?: string | null;
  acceptPendingTokens?: any;
  isVendor?: string | null;
};

const Home = ({
  allowance,
  disbursed,
  isVendorApproved,
  isProjectLocked,
  projectBalance,
  pendingTokensToAccept,
  acceptPendingTokens,
  isVendor,
}: PropTypes) => {
  const [transactionsList, setTransactionsList] = useState(null);
  const { getTransactionsList, appSettings } = useAppStore();
  const history = useHistory();

  console.log(allowance, isVendorApproved, "PROPS IN CARD");

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactionsList();
      console.log("FETCH TRANSACTIONS", data);
      if (data) setTransactionsList(data);
    };
    fetchTransactions();
  }, []);

  return (
    <>
      <DismissibleAlert
        title='Not Vendor'
        color='danger'
        dismissText='Reload'
        description='You are not a vendor.'
        onButtonClick={() => window.location.reload()}
        visible={!isVendor === false}
      />
      <DismissibleAlert
        title='No Project'
        color='danger'
        dismissText='Set up Now'
        description='You have not set the project.'
        onButtonClick={() => history.push("/select-project")}
        visible={
          !appSettings?.baseUrl &&
          !appSettings?.contracts &&
          !appSettings?.network
        }
      />
      <DismissibleAlert
        title='Not Approved'
        color='warning'
        dismissText='Reload'
        description='You have not been approved. Please Contact admin.'
        onButtonClick={() => window.location.reload()}
        visible={!isVendorApproved === false}
      />
      <DismissibleAlert
        title='Pending Tokens'
        color='success'
        dismissText='Accept'
        description={`You have ${pendingTokensToAccept} pending tokens.`}
        onButtonClick={() => acceptPendingTokens()}
        visible={
          pendingTokensToAccept && pendingTokensToAccept > 0 ? true : false
        }
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}>
        <CardComponent subtitle='Allowance' title={allowance || "loading..."} />
        <CardComponent subtitle='Disbursed' title={disbursed || "loading..."} />
      </div>
      <div>
        <TransactionCard transactionsList={transactionsList} />
      </div>

      <IonText>VENDOR APPROVED = {isVendorApproved ? "true" : "false"}</IonText>
      <br />
      <IonText>PROJECT LOCKED = {isProjectLocked ? "true" : "false"}</IonText>
      <br />
      <IonText>
        Pending Tokens to accept = {Number(pendingTokensToAccept) || "-"}
      </IonText>
      <br />
      <IonText>Project Balance = {projectBalance || "-"}</IonText>
    </>
  );
};

export default Home;
