import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonList,
  IonPopover,
  IonRow,
  IonText,
} from "@ionic/react";
import { ITransactionItem } from "../../../../types/transactions";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { ellipsisHorizontal } from "ionicons/icons";
import { useRef, useState } from "react";
import "./transactions-card.scss";
import { useHistory } from "react-router";

type Props = {
  transaction: ITransactionItem;
  key: number;
};
const TransactionCard = ({ transaction, key }: Props) => {
  const history = useHistory();
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setPopoverOpen(true);
  };

  const handleViewDetail = () => {
    history.push("/tabs/settings/transactions/0x23123872349");
  };

  return (
    <IonGrid key={key}>
      <IonRow>
        <IonCol size="9">
          <IonCardContent className="px-0 pb-0">
            <h2>
              <strong>Claim Processed</strong>
            </h2>
            <p>{transaction?.projectName}</p>
            <p>
              {new Date(transaction?.createdAt).toLocaleString() ||
                "-" ||
                "N/A"}
            </p>
          </IonCardContent>
        </IonCol>
        <IonCol size="3" className="tlist-right-col">
          <IonButton fill="clear" onClick={openPopover}>
            <IonIcon icon={ellipsisHorizontal} />
          </IonButton>
          <IonPopover
            mode="md"
            ref={popover}
            isOpen={popoverOpen}
            onDidDismiss={() => setPopoverOpen(false)}
            color="dark"
          >
            <IonList>
              <IonItem onClick={() => handleViewDetail()} button={true}>
                View
              </IonItem>
              <IonItem onClick={() => setPopoverOpen(false)} button={true}>
                Delete
              </IonItem>
            </IonList>
          </IonPopover>
          <IonText color="success">
            <p className="m-0">REFERRED</p>
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default TransactionCard;
