import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import CustomToast from "@components/toast";
import {
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonToast,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import { useHistory } from "react-router";

type Props = {
  handleSync: any;
  projectSettings: any;
  showToast: boolean;
  setShowToast: any;
  handleButtonFocus: any;
  toastMessage: string;
  showLoading: boolean;
  setShowLoading: any;
};

const TransactionsSettings = ({
  handleSync,
  projectSettings,
  showToast,
  setShowToast,
  handleButtonFocus,
  toastMessage,
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
                Sync Transactions
              </IonButton>
            </div>
          </IonItem>
          <IonItem
            button={true}
            onClick={() => history.push("/tabs/settings/transactions/list")}
          >
            <IonLabel>View Transactions List</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </IonList>
      </TransparentCard>
    </>
  );
};

export default TransactionsSettings;
