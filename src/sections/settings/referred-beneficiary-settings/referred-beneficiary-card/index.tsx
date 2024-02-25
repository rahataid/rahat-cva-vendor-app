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
} from "@ionic/react";
import { IBeneficiary } from "../../../../types/beneficiaries";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import "./referred-beneficiary-card.scss";
import { ellipsisHorizontal } from "ionicons/icons";

type Props = {
  beneficiary: IBeneficiary;
};
const ReferredBeneficiaryCard = ({ beneficiary }: Props) => {
  // const popover = useRef<HTMLIonPopoverElement>(null);
  // const [showPopover, setShowPopover] = useState(false);

  // const handlePopover = (e) => {
  //   popover.current!.event = e;
  //   setShowPopover(true);
  // };

  const handleDelete = () => {
    // Logic to delete
    setPopoverOpen(false); // Hide the popover after action
  };

  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setPopoverOpen(true);
  };

  return (
    <TransparentCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonText>
                <h2>{beneficiary?.name}</h2>
                <p>{beneficiary?.phone}</p>
                <p>
                  {new Date(beneficiary?.createdAt).toLocaleString() || "-"}
                </p>
              </IonText>
            </IonCol>
            <IonCol size="6" className="right-col">
              <IonButton fill="clear" onClick={openPopover}>
                <IonIcon icon={ellipsisHorizontal} />
              </IonButton>
              <IonPopover
                ref={popover}
                isOpen={popoverOpen}
                onDidDismiss={() => setPopoverOpen(false)}
                color="dark"
              >
                <IonList>
                  <IonItem onClick={() => setPopoverOpen(false)} button={true}>
                    View
                  </IonItem>
                  <IonItem onClick={() => setPopoverOpen(false)} button={true}>
                    Delete
                  </IonItem>
                </IonList>
              </IonPopover>
              {/* <IonButton fill="clear" onClick={handlePopover}>
                <IonIcon icon={ellipsisHorizontal} />
              </IonButton>

              <IonPopover
                ref={popover}
                isOpen={showPopover}
                onDidDismiss={() => setShowPopover(false)}
              >
                <IonButton onClick={handleDelete}>Delete</IonButton>
                <IonButton onClick={() => setShowPopover(false)}>
                  View
                </IonButton>
              </IonPopover> */}

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
  );
};

export default ReferredBeneficiaryCard;
