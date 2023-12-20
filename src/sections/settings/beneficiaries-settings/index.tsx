import {
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import { useHistory } from "react-router";

type Props = {
  handleSync: any;
  projectSettings: any;
};

const BeneficiariesSettings = ({ handleSync, projectSettings }: Props) => {
  const history = useHistory();
  console.log(projectSettings?.internetAccess);
  return (
    <IonCard>
      <IonList>
        <IonItem>
          <IonButton
            expand="full"
            onClick={handleSync}
            disabled={!projectSettings?.internetAccess}
          >
            Sync Beneficiaries
          </IonButton>
        </IonItem>
        <IonItem
          onClick={() => history.push("/tabs/settings/beneficiaries/list")}
        >
          <IonLabel>View Beneficiaries List</IonLabel>
          <IonIcon icon={chevronForwardOutline} slot="end" />
        </IonItem>
      </IonList>
    </IonCard>
  );
};

export default BeneficiariesSettings;
