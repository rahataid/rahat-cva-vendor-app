import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRange,
  IonRow,
} from "@ionic/react";
import "./scanner.scss";
import { add, flashlightOutline, remove } from "ionicons/icons";

const Scanner = ({ toggleTorch, setZoomRatio }: any) => {
  return (
    <div>
      <div id="wrapper" className="wrapper" style={{ display: "none" }}>
        <div className="square"></div>
      </div>

      <div className="btn-container">
        <div style={{ width: "80%" }}>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonRange
                  color="dark"
                  className="zoom"
                  aria-label="Range with ticks"
                  ticks={true}
                  snaps={true}
                  min={1}
                  max={5}
                  onIonChange={({ detail }) => setZoomRatio(detail.value)}
                >
                  <IonIcon slot="start" color="dark" icon={remove}></IonIcon>
                  <IonIcon slot="end" color="dark" icon={add}></IonIcon>
                </IonRange>
              </IonCol>
              <IonCol size="12">
                <IonButton
                  className="zoom"
                  mode="md"
                  fill="solid"
                  expand="block"
                  color="dark"
                  onClick={toggleTorch}
                >
                  <IonIcon icon={flashlightOutline} />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
