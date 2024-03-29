import React, { useRef, useState } from "react";
import {
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  IonAlert,
} from "@ionic/react";
import { IBeneficiary } from "../../../../types/beneficiaries";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import "./referred-beneficiary-card.scss";
import {
  ellipsisHorizontal,
  eyeOffOutline,
  eyeOutline,
  trash,
  trashBinOutline,
  trashOutline,
  trashSharp,
} from "ionicons/icons";
import { useHistory } from "react-router";
import { formatDate } from "@utils/helperFunctions";

type Props = {
  beneficiary: IBeneficiary;
  handleDelete: any;
};
const ReferredBeneficiaryCard = ({
  beneficiary,
  handleDelete: onHandleDelete,
}: Props) => {
  const history = useHistory();

  const [showAlert, setShowAlert] = useState(false);
  const handleViewDetails = (isReferred: boolean) => {
    // Logic to view details
    history.push(`/tabs/referred-beneficiaries/${beneficiary.uuid}`);
  };

  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = (e: any) => {
    popover.current!.event = e;
    console.log(e);
    setPopoverOpen(true);
  };

  const handleDelete = () => {
    setPopoverOpen(false);
    setShowAlert(true);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
  };

  const handleConfirmDelete = () => {
    onHandleDelete(beneficiary.uuid);
    setShowAlert(false);
  };

  return (
    <>
      <IonAlert
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
      />
      <TransparentCard>
        <IonCardContent>
          <IonGrid className="custom-grid">
            <IonRow>
              <IonCol size="7" className="beneficiary-left-col">
                <IonText>
                  <h2>{beneficiary?.name}</h2>
                  <p>{beneficiary?.phone}</p>
                  <p>{formatDate(beneficiary?.createdAt) || "-"}</p>
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
                      <IonText color="primary">View</IonText>
                    </IonItem>
                    <IonItem
                      onClick={() => handleDelete()}
                      button={true}
                      lines="full"
                    >
                      <IonIcon
                        icon={trashOutline}
                        slot="start"
                        color="danger"
                        style={{ marginRight: "12px" }}
                      />
                      <IonText color="danger">Delete</IonText>
                    </IonItem>
                  </IonList>
                </IonPopover>

                {beneficiary?.beneficiaryType === "REFERRED" ? (
                  <IonText color="success">
                    <h2>REFERRED</h2>
                  </IonText>
                ) : (
                  <IonText color="warning">
                    <h2>ENROLLED</h2>
                  </IonText>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default ReferredBeneficiaryCard;
