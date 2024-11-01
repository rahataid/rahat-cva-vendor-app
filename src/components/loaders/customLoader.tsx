import { IonLoading } from "@ionic/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  mode?: "md" | "ios";
  isOpen: boolean;
  message?: string;
  className?: string;
};

const CustomLoader: FC<Props> = ({
  mode = "md",
  isOpen = false,
  message,
  className,
}) => {
  const { t } = useTranslation();
  return (
    <IonLoading
      mode={mode}
      isOpen={isOpen}
      message={message || t("GLOBAL.LOADERS.LOADING")}
      cssClass={className}
    />
  );
};

export default CustomLoader;
