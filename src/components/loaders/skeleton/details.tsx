import { IonCol, IonGrid, IonRow, IonSkeletonText } from "@ionic/react";
import { randomPercentage } from "@utils/helperFunctions";
import { FC, Fragment } from "react";

type Props = {
  length?: number;
};
const DetailsSkeleton: FC<Props> = ({ length = 10 }) => {
  return (
    <IonGrid>
      <IonRow>
        {Array.from({ length }).map((_, index) => (
          <Fragment key={index}>
            <IonCol size="6">
              <IonSkeletonText
                animated={true}
                style={{ width: randomPercentage() }}
              ></IonSkeletonText>
            </IonCol>
            <IonCol size="6">
              <IonSkeletonText
                animated={true}
                style={{ width: randomPercentage() }}
              ></IonSkeletonText>
            </IonCol>
          </Fragment>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default DetailsSkeleton;
