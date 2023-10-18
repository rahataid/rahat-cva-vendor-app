import useVendorStore from "../../store/vendors";
import DismissibleAlert from "./home-alert";
import CardComponent from "./home-card";
import TransactionCard from "./transaction-card";

const Home = () => {
  const chainData = useVendorStore((state) => state.chainData);
  return (
    <>
      <DismissibleAlert
        title='Not Vendor'
        color='danger'
        dismissText='Reload'
        description='You are not a vendor.'
        onButtonClick={() => window.location.reload()}
        visible={chainData?.isVendor === false}
      />
      <DismissibleAlert
        title='Pending Tokens'
        color='info'
        dismissText='Accept'
        description={`You have ${chainData?.pending} pending tokens.`}
        onButtonClick={() => window.location.reload()}
        visible={chainData?.pending > 0}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}>
        <CardComponent
          subtitle='allowance'
          title={
            chainData?.balance ? chainData?.balance.toString() : "loading..."
          }
        />
        <CardComponent
          subtitle='disbursed'
          title={
            chainData?.disbursed
              ? chainData?.disbursed.toString()
              : "loading..."
          }
        />
      </div>
      <div>
        <TransactionCard />
      </div>
    </>
  );
};

export default Home;
