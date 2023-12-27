import {
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonToast,
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
};

const TransactionsSettings = ({
  handleSync,
  projectSettings,
  showToast,
  setShowToast,
  handleButtonFocus,
  toastMessage,
}: Props) => {
  const history = useHistory();
  console.log(projectSettings?.internetAccess);
  return (
    <>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        position="middle"
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
                Sync Transactions
              </IonButton>
            </div>
          </IonItem>
          <IonItem
            onClick={() => history.push("/tabs/settings/transactions/list")}
          >
            <IonLabel>View Transactions List</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </IonList>
      </IonCard>
    </>
  );
};

export default TransactionsSettings;
