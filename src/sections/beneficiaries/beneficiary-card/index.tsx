import { useRef, useState } from "react";
import {
  IonCardContent,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonPopover,
  IonList,
  IonItem,
} from "@ionic/react";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import "./beneficiary-card.scss";
import { ellipsisHorizontal, eyeOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { BENEFICIARY_DETAILS, DATE_SOURCE } from "@types/beneficiaries";
import { formatDate } from "@utils/helperFunctions";
import { useTranslation } from "react-i18next";

type Props = {
  beneficiary: BENEFICIARY_DETAILS;
};
const BeneficiaryCard = ({ beneficiary }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const handleViewDetails = () => {
    history.push(`/tabs/referred-beneficiaries/${beneficiary?.uuid}`, {
      data: { beneficiary },
    });
  };

  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setPopoverOpen(true);
  };

  const handleDelete = () => {
    setPopoverOpen(false);
    setShowAlert(true);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
  };

  return (
    <>
      {/* <IonAlert
        mode="md"
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Confirm Delete"}
        message={"Are you sure you want to Delete?"}
        buttons={[
          {
            text: "Cancel",
            cssClass: "alert-button-cancel",
            handler: handleCancelDelete,
          },
          {
            text: "Confirm",
            cssClass: "alert-button-confirm",
            handler: handleConfirmDelete,
          },
        ]}
      /> */}
      <TransparentCard>
        <IonCardContent>
          <IonGrid className="custom-grid">
            <IonRow>
              <IonCol size="7" className="beneficiary-left-col">
                <IonText>
                  <h2>{beneficiary?.piiData?.name}</h2>
                  <p>{beneficiary?.piiData?.phone}</p>
                  <p>
                    {beneficiary?.createdAt
                      ? formatDate(beneficiary?.createdAt, DATE_SOURCE.BACKEND)
                      : "-"}
                  </p>
                </IonText>
              </IonCol>
              <IonCol size="5" className="beneficiary-right-col">
                <IonButton
                  className="options-button"
                  fill="clear"
                  onClick={openPopover}
                >
                  <IonIcon icon={ellipsisHorizontal} color="medium" />
                </IonButton>
                <IonPopover
                  mode="md"
                  ref={popover}
                  isOpen={popoverOpen}
                  onDidDismiss={() => setPopoverOpen(false)}
                  color="dark"
                >
                  <IonList>
                    <IonItem
                      onClick={() => handleViewDetails(false)}
                      button={true}
                      lines="full"
                    >
                      <IonIcon
                        icon={eyeOutline}
                        slot="start"
                        color="primary"
                        style={{ marginRight: "12px" }}
                      />
                      <IonText color="primary">
                        {t("GLOBAL.POPOVERS.VIEW")}
                      </IonText>
                    </IonItem>
                  </IonList>
                </IonPopover>

                <IonText color="success">
                  <h2>
                    {t("GLOBAL.TEXTS.BENEFICIARY_TYPE.REFERRED").toUpperCase()}
                  </h2>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default BeneficiaryCard;
