import { IonCard } from "@ionic/react";

const TransparentCard = ({
  children,
  border = "0px",
  backgroundColor = "rgba(255,255,255,0.3)",
  backdropFilter = "blur(50px)",
  ...props
}) => (
  <IonCard
    style={{
      border,
      backgroundColor,
      backdropFilter,
    }}
    {...props}
  >
    {children}
  </IonCard>
);

export default TransparentCard;
