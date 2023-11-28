import { IonText } from "@ionic/react";
import useVendorStore from "../../store/vendors";
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
};

const Home = ({
  allowance,
  disbursed,
  isVendorApproved,
  isProjectLocked,
  projectBalance,
  pendingTokensToAccept,
  acceptPendingTokens,
}: PropTypes) => {
  console.log(allowance, isVendorApproved, "PROPS IN CARD");
  const chainData = useVendorStore((state) => state.chainData);
  return (
    <>
      <DismissibleAlert
        title="Not Vendor"
        color="danger"
        dismissText="Reload"
        description="You are not a vendor."
        onButtonClick={() => window.location.reload()}
        visible={chainData?.isVendor === false}
      />
      <DismissibleAlert
        title="Not Approved"
        color="warning"
        dismissText="Reload"
        description="You have not been approved. Please Contact admin."
        onButtonClick={() => window.location.reload()}
        visible={!isVendorApproved}
      />
      <DismissibleAlert
        title="Pending Tokens"
        color="info"
        dismissText="Accept"
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
        }}
      >
        <CardComponent
          subtitle="Allowance"
          // title={
          //   chainData?.balance ? chainData?.balance.toString() : "loading..."
          // }
          title={allowance || "loading..."}
        />
        <CardComponent
          subtitle="Disbursed"
          // title={
          //   chainData?.disbursed
          //     ? chainData?.disbursed.toString()
          //     : "loading..."
          // }
          title={disbursed || "loading..."}
        />
      </div>
      <div>
        <TransactionCard />
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
