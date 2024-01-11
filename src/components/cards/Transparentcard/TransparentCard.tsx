import { IonCard } from "@ionic/react";

const TransparentCard = ({
  children,
  border = "0px",
  borderRadius = "10px",
  backgroundColor = "rgba(255,255,255,1)",
  backdropFilter = "blur(50px)",
  boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)",
  ...props
}) => (
  <IonCard
    style={{
      border,
      backgroundColor,
      backdropFilter,
      borderRadius,
      boxShadow,
    }}
    {...props}
  >
    {children}
  </IonCard>
);

export default TransparentCard;
