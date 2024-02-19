import "./scanner.scss";
import { useEffect } from "react";

const Scanner = ({ startScan, stopScan }: any) => {
  useEffect(() => {
    startScan();
    return () => {
      console.log("CLEANUP SCANNER");
    };
  }, []);

  return (
    <div>
      <div id="wrapper" className="wrapper" style={{ display: "none" }}>
        <div className="square"></div>
      </div>
    </div>
  );
};

export default Scanner;
