import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonRow,
  IonToast,
} from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import "./index.scss";
import CustomToast from "@components/toast";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

type Props = {
  handleSync: any;
  projectSettings: any;
  showToast: boolean;
  setShowToast: any;
  handleButtonFocus: any;
  toastMessage: string;
  setToastMessage: any;
  showLoading: boolean;
  setShowLoading: any;
};

const BeneficiariesSettings = ({
  handleSync,
  projectSettings,
  showToast,
  setShowToast,
  handleButtonFocus,
  toastMessage,
  setToastMessage,
  showLoading,
  setShowLoading,
}: Props) => {
  const history = useHistory();
  return (
    <>
      <CustomToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        position="middle"
      />
      <IonLoading
        mode="md"
        isOpen={showLoading}
        message={"Syncing..."}
        onDidDismiss={() => setShowLoading(false)}
      />
      <TransparentCard>
        <IonList>
          <IonItem>
            <div onClick={handleButtonFocus} className="button-full-width">
              <IonButton
                expand="full"
                onClick={handleSync}
                disabled={!projectSettings?.internetAccess}
                className="btn-text-white"
              >
                Sync Beneficiaries
              </IonButton>
            </div>
          </IonItem>
          <IonItem
            button={true}
            onClick={() => history.push("/tabs/settings/beneficiaries/list")}
          >
            <IonLabel>View Beneficiaries List</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </IonList>
      </TransparentCard>
    </>
  );
};

export default BeneficiariesSettings;
