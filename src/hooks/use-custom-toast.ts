import { useState } from "react";

const useCustomToast = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("primary");

  const showToast = (message: string, color = "primary") => {
    setToastMessage(message);
    setToastColor(color);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  return {
    toastVisible,
    toastMessage,
    toastColor,
    showToast,
    hideToast,
  };
};

export default useCustomToast;
