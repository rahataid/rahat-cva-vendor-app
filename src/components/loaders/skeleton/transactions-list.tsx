import {
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
  IonThumbnail,
} from "@ionic/react";
import { FC } from "react";

type Props = {
  length?: number;
};
const ListSkeleton: FC<Props> = ({ length = 9 }) => {
  return (
    <IonList className="ion-list-no-padding" mode="md">
      {Array.from({ length }).map((_, index) => (
        <IonItem key={index}>
          <IonThumbnail slot="start">
            <IonSkeletonText animated={true}></IonSkeletonText>
          </IonThumbnail>
          <IonLabel>
            <h3>
              <IonSkeletonText
                animated={true}
                style={{ width: "80%" }}
              ></IonSkeletonText>
            </h3>
            <p>
              <IonSkeletonText
                animated={true}
                style={{ width: "60%" }}
              ></IonSkeletonText>
            </p>
            <p>
              <IonSkeletonText
                animated={true}
                style={{ width: "80%" }}
              ></IonSkeletonText>
            </p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default ListSkeleton;
