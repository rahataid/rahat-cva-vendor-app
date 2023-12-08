type PropTypes = {
  mnemonics: string | undefined;
  isOpen: boolean;
};

import { IonAlert } from "@ionic/react";
import "./mnemonicDialog.scss";

function MnemonicDialog({ mnemonics, isOpen }: PropTypes) {
  return (
    <>
      <IonAlert
        backdropDismiss={false}
        isOpen={isOpen}
        header='Please write down the mnemonics safely'
        subHeader=''
        message={mnemonics}
        buttons={[
          {
            text: "I have written it down",
            cssClass: "alert-button-confirm",
          },
        ]}
        onDidDismiss={() => {
          console.log("DISMISS");

          window.location.replace("/tabs/home");
        }}></IonAlert>
    </>
  );
}
export default MnemonicDialog;
