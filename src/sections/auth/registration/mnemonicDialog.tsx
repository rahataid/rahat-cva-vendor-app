type PropTypes = {
  mnemonics: string | undefined;
  isOpen: boolean;
};

import { IonAlert } from "@ionic/react";
import "./mnemonicDialog.scss";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

function MnemonicDialog({ mnemonics, isOpen }: PropTypes) {
  const { t } = useTranslation();
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
      header={t("REGISTER_PAGE.MNEMONICS.TITLE")}
      subHeader=""
      message={mnemonics}
      buttons={[
        {
          text: `${t("REGISTER_PAGE.MNEMONICS.BUTTONS.COPY")}`,
          cssClass: "alert-button-confirm",
          handler: (event: React.MouseEvent) => handleCopyClick(event),
        },
        {
          text: `${t("REGISTER_PAGE.MNEMONICS.BUTTONS.NEXT")}`,
          cssClass: "alert-button-confirm",
        },
      ]}
      onDidDismiss={handleOnDidDismiss}
    ></IonAlert>
  );
}
export default MnemonicDialog;
