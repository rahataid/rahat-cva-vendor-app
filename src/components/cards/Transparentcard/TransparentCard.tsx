import { IonCard } from "@ionic/react";

const TransparentCard = ({
  children,
  border = "0px",
  borderRadius = "5px",
  // backgroundColor = "rgba(255,255,255,1)",
  backdropFilter = "blur(50px)",
  boxShadow = "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  padding = "0px",
  styles = {},
  ...props
}) => (
  <IonCard
    mode="md"
    style={{
      border,
      // backgroundColor,
      backdropFilter,
      borderRadius,
      boxShadow,
      padding,
      ...styles,
    }}
    {...props}
  >
    {children}
  </IonCard>
);

export default TransparentCard;
