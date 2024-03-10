import React, { useState } from "react";
import CustomNavbar from "./CustomNavbar";
import { FullScreen } from "@chiragrupani/fullscreen-react";

const SupportPage = () => {
  let [isFullScreen, setFullScreen] = useState(false);
  return (
    <div>
      <CustomNavbar />
      support page
    </div>
  );
};

export default SupportPage;
