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
    history.push("/select-project", {
      data: { from: "register" },
    });
  };
  const handleCopyClick = async (event: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(mnemonics);
    } catch (error) {
      console.error("Error copying text to clipboard:", error);
    }

    event.stopPropagation();
  };
  return (
    <IonAlert
      mode="md"
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
        {
          text: "Copy",
          cssClass: "alert-button-confirm",
          handler: (event: React.MouseEvent) => handleCopyClick(event),
        },
      ]}
      onDidDismiss={handleOnDidDismiss}
    ></IonAlert>
  );
}
export default MnemonicDialog;
