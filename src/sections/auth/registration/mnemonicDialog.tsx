type PropTypes = {
  mnemonics: string | undefined;
  isOpen: boolean;
};

import { IonAlert, IonButton } from "@ionic/react";
import "./mnemonicDialog.scss";
import { useHistory } from "react-router";

function MnemonicDialog({ mnemonics, isOpen }: PropTypes) {
  console.log("mnemonic dialog", mnemonics, isOpen);
  const history = useHistory();

  return (
    <>
      <IonAlert
        backdropDismiss={false}
        isOpen={isOpen}
        header="Please write down the mnemonics safely"
        subHeader=""
        message={mnemonics}
        buttons={[
          {
            text: "I have written it down",
            cssClass: "alert-button-confirm",
          },
        ]}
        onDidDismiss={() => {
          console.log("DISMISS");
          history.push("/tabs/home");
        }}
      ></IonAlert>
    </>
  );
}
export default MnemonicDialog;
