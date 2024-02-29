import { motion } from "framer-motion";
import React from "react";
import CustomNavbar from "../CustomNavbar";
const UserDashboard = () => {
  const text = "WELCOME TO USER DASHBOARD ".split(",");
  return (
    <>
      <CustomNavbar />
      <h2 className="text-center  ">
        {text.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: i / 5,
            }}
            key={i}
          >
            {el}{" "}
          </motion.span>
        ))}
        {/* <Stepperr /> */}
      </h2>
    </>
  );
};

export default UserDashboard;
