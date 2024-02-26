import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

import {
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonGrid,
  IonIcon,
  IonText,
} from "@ionic/react";
import { homeOutline } from "ionicons/icons";
import ReferItem from "./refer-item";
import { useHistory } from "react-router";

const ReferSuccess = ({ data }: any) => {
  const history = useHistory();
  const handleGoHome = () => {
    history.push("/tabs/home");
  };
  return (
    <>
      <TransparentCard>
        <IonCardHeader>
          <IonText>
            <p>The referral has been registered successfully</p>
          </IonText>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            {data?.length ? (
              data?.map((el: any, i: number) => <ReferItem data={el} key={i} />)
            ) : (
              <h2>No Data Available...</h2>
            )}
          </IonGrid>
          <IonButton onClick={handleGoHome} expand="block">
            <IonIcon slot="start" icon={homeOutline} />
            Go To Homepage
          </IonButton>
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default ReferSuccess;
