import {
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import "./index.scss";
import CustomToast from "@components/toast";

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
  console.log(projectSettings?.internetAccess);
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
        isOpen={showLoading}
        message={"Syncing..."}
        onDidDismiss={() => setShowLoading(false)}
      />
      <IonCard>
        <IonList>
          <IonItem>
            <div onClick={handleButtonFocus} className="button-full-width">
              <IonButton
                expand="full"
                onClick={handleSync}
                disabled={!projectSettings?.internetAccess}
              >
                Sync Beneficiaries
              </IonButton>
            </div>
          </IonItem>
          <IonItem
            onClick={() => history.push("/tabs/settings/beneficiaries/list")}
          >
            <IonLabel>View Beneficiaries List</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </IonList>
      </IonCard>
    </>
  );
};

export default BeneficiariesSettings;
