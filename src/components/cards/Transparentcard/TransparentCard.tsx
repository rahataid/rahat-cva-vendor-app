import { IonCard } from "@ionic/react";

const TransparentCard = ({
  children,
  border = "0px",
  borderRadius = "8px",
  // backgroundColor = "rgba(255,255,255,1)",
  // backdropFilter = "blur(50px)",
  // boxShadow = "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  // boxShadow = "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  boxShadow = "rgba(0, 0, 0, 0.09) 0px 3px 12px",
  padding = "0px",
  styles = {},
  ...props
}) => (
  <IonCard
    mode="md"
    style={{
      border,
      // backgroundColor,
      // backdropFilter,
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
