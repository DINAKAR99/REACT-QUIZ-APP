import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import HomeNavbar from "./HomeNavbar";
import logo from "./pictures/BRAINBYTES.gif";
import { motion } from "framer-motion";

const HomePage = () => {
  const [active, setActive] = useState(1);

  const text = " Unravel Your Mind ".split(" ");

  const text2 = " Welcome to BrainyBits              ".split(" ");
  const text3 =
    "   Where curiosity meets challenge, and every question   unlocks a world of knowledge!".split(
      " "
    );
  return (
    <>
      <HomeNavbar />

      <div
        className=" container-fluid bg-black  p-0"
        style={{ minHeight: 600 }}
      >
        <div className="logo d-flex   ">
          <img src={logo} alt="" style={{ width: "40%" }} />

          <div className="  align-items-center  ">
            <h1 className="text-white ms-auto p-5 pb-2    ">
              {/* <p>
                Unravel Your Mind
                <br /> Welcome to <b>BrainyBits.</b>
                <br /> Where curiosity meets challenge, and every question
                unlocks a world of knowledge!
              </p> */}

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
              <br />
              {text2.map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: i / 50,
                  }}
                  key={i}
                  className="motionspan"
                >
                  {el}{" "}
                </motion.span>
              ))}
              <br />
              {text3.map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: i / 50,
                  }}
                  key={i}
                >
                  {el}{" "}
                </motion.span>
              ))}
            </h1>
            <Link to="/user-board">
              <Button
                size="lg"
                className="border-gradient rounded-pill ms-5 px-5     "
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-dark       text-white-50  ">BRAINYBITS</footer>
    </>
  );
};

export default HomePage;
