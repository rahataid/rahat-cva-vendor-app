import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonItem, IonList, IonIcon, IonLabel, IonImg } from "@ionic/react";
import { checkmarkOutline, languageOutline } from "ionicons/icons";

import i18n from "@utils/translation-service";
import { FC, useState } from "react";
import "./languageSettings.scss";

type Props = {
  customStyle?: any;
  lines?: "full" | "none" | "inset";
};

const LanguageSettings: FC<Props> = ({ customStyle, lines = "inset" }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const languageOptions = [
    {
      label: "English",
      value: "en",
      startIcon: languageOutline,
      flag: "/assets/flags/small/us.svg",
    },
    {
      label: "Bahasa",
      value: "id",
      startIcon: languageOutline,
      flag: "/assets/flags/small/id.svg",
    },
  ];

  const handleLanguageChange = async (language: string) => {
    await i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  return (
    <>
      <TransparentCard styles={customStyle}>
        <IonList lines={lines}>
          {languageOptions.map((option, index) => (
            <IonItem
              key={index}
              button={true}
              onClick={() => handleLanguageChange(option.value)}
              className={
                selectedLanguage === option.value ? "selected-language" : ""
              }
            >
              {/* <IonIcon icon={option.startIcon} slot="start" color="primary" /> */}
              <IonImg src={option.flag} slot="start" className="flag-icon" />

              <IonLabel>{option.label}</IonLabel>
              {selectedLanguage === option.value && (
                <IonIcon
                  color="success"
                  icon={checkmarkOutline}
                  slot="end"
                  className="check-icon"
                  size="small"
                />
              )}
            </IonItem>
          ))}
        </IonList>
      </TransparentCard>
    </>
  );
};

export default LanguageSettings;
