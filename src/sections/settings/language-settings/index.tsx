import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import {
  IonButton,
  IonItem,
  IonList,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
  IonImg,
} from "@ionic/react";
import { checkmarkOutline, languageOutline } from "ionicons/icons";

import i18n from "@utils/translation-service";
import { FC, useState } from "react";
import "./languageSettings.scss";
import { useHistory } from "react-router";

type Props = {
  redirect?: boolean;
};

const LanguageSettings: FC<Props> = ({ redirect = false }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const history = useHistory();
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
      <TransparentCard>
        <IonList>
          {languageOptions.map((option, index) => (
            <IonItem
              key={index}
              button={true}
              onClick={() => {
                handleLanguageChange(option.value);
                if (redirect) history.push("/landing");
              }}
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
