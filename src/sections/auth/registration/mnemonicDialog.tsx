type PropTypes = {
  mnemonics: string | undefined;
  isOpen: boolean;
};

import { IonAlert } from "@ionic/react";
import "./mnemonicDialog.scss";
import { useHistory } from "react-router";

function MnemonicDialog({ mnemonics, isOpen }: PropTypes) {
  const history = useHistory();
  const handleOnDidDismiss = () => {
    history.push("/select-project");
  };
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
        onDidDismiss={handleOnDidDismiss}
      ></IonAlert>
    </>
  );
}
export default MnemonicDialog;
