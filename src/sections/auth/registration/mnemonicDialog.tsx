type PropTypes = {
  mnemonics: string | undefined;
  isOpen: boolean;
};

import { IonAlert, IonButton } from "@ionic/react";
import "./mnemonicDialog.scss";
import { useHistory } from "react-router";

function MnemonicDialog({ mnemonics, isOpen }: PropTypes) {
  const history = useHistory();

  return (
    <>
      <IonAlert
        backdropDismiss={false}
        isOpen={isOpen}
        header="Please save the mnemonics safely"
        subHeader=""
        message={mnemonics}
        buttons={[
          {
            text: "I have saved it",
            cssClass: "alert-button-confirm",
          },
        ]}
        onDidDismiss={() => {
          history.push("/tabs/home");
        }}
      ></IonAlert>
    </>
  );
}
export default MnemonicDialog;
