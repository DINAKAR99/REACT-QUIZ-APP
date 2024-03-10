import React, { useState } from "react";
import CustomNavbar from "./CustomNavbar";
import { FullScreen } from "@chiragrupani/fullscreen-react";

const SupportPage = () => {
  let [isFullScreen, setFullScreen] = useState(false);
  return (
    <div>
      <div>
        <CustomNavbar />
        <button onClick={(e) => setFullScreen(true)}>Go Fullscreen</button>
        <FullScreen
          isFullScreen={isFullScreen}
          onChange={(isFull) => {
            setFullScreen(isFull);
          }}
        >
          {" "}
          <CustomNavbar />
          <div>Fullscreen</div>
          <h1>dwdqwdwed WEdwedwed</h1>
        </FullScreen>
      </div>
    </div>
  );
};

export default SupportPage;
