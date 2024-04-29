import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import HomeNavbar from "./HomeNavbar";
import logo from "./pictures/BRAINBYTES.gif";
import hand from "./pictures/brain.png";
import books from "./pictures/booksss.png";
import ScrollToTop from "react-scroll-to-top";
const HomePage = () => {
  const ref3 = useRef();
  const ref2 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  document.title = "Brainy Bits";
  const text = "Unravel Your Mind ".split(" ");

  const text2 = "Welcome to BrainyBits ".split(" ");
  const text3 =
    "Where curiosity meets challenge, and every question   unlocks a world of knowledge!".split(
      " "
    );
  let div = window.scrollY;
  if (div >= 160) {
    console.log(div); // Call your function
    ref3.current.classList.add("drop-from-left");
    ref2.current.classList.add("drop-from-right");
    ref3.current.classList.remove("d-none");
    ref2.current.classList.remove("d-none");
  }

  if (div >= 500) {
    console.log(div); // Call your function
    ref4.current.classList.add("drop-from-right");
    ref4.current.classList.remove("d-none");
    ref5.current.classList.add("drop-from-bottom");
    ref5.current.classList.remove("d-none");
  }
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the scroll position from the top
      const positionFromTop = window.scrollY;
      // Update the state with the calculated scroll position
      setScrollPosition(positionFromTop);
      console.log(positionFromTop);
    };

    // Attach scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once

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
                    duration: 1,
                    delay: i / 6,
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
                    duration: 1,
                    delay: i / 4,
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
                    duration: 1,
                    delay: i / 50,
                  }}
                  key={i}
                >
                  {el}{" "}
                </motion.span>
              ))}
            </h1>
            <Link to="/login">
              <Button
                size="lg"
                className="border-gradient rounded-pill ms-5 px-5 mt-4     "
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <main className="bg-black w-100  p-4 pb-0  border-white h-75">
          <div
            className="m-0 text-white-50  d-md-flex      p-4 rounded  rounded-3 "
            style={{ height: "100%" }}
          >
            <div
              className="m-0 text-white-50   d-none    ms-auto  col-6 align-content-center righty    mt-4  rounded  rounded-3       "
              style={{
                height: "80%",
                width: "560px",
                backgroundColor: "rgb(230, 212, 147, 0.607)",
              }}
              ref={ref3}
            >
              <img
                src={hand}
                alt=""
                style={{
                  width: "60%",
                  height: "60%",
                }}
              />
            </div>
            <div
              className="m-0 text-white-50   d-none        ms-auto  col-6 align-content-center lefty   mt-4  rounded  rounded-3 ps-3 "
              ref={ref2}
            >
              <p
                className="   text-white-50      "
                style={{ fontSize: "25px" }}
              >
                <h4 className="text-white">Where Every Quiz Tells a Tale</h4>
                Embark on an unparalleled journey ,
                <br /> a quiz platform where each question unravels a tale.
                dissect your performance, and unearth invaluable insights to
                refine your knowledge
              </p>
              {/* <a href="/signup">
                <button className="btn bg-light text-dark    xtra ">
                  Hop in !
                </button>
              </a> */}
            </div>
          </div>
        </main>

        <hr />

        <main className="bg-black w-100 pt-0   p-4 border-white h-75">
          <div
            className="m-0 text-white-50 d-md-flex   p-4 rounded  rounded-3 "
            style={{ height: "100%" }}
          >
            <div
              className="m-0 text-white-50 ms-auto  col-md-6  col-sm-12 align-content-center  mt-4  rounded  rounded-3  d-none  "
              ref={ref5}
            >
              <h4 className="  text-white   ">Unlock a World of Learning</h4>
              <p className="   text-white-50   " style={{ fontSize: "22px" }}>
                we're dedicated to fueling your passion for coding and expanding
                your knowledge of programming languages <br />
                quizzes covering a wide spectrum of languages and libraries,
                including Java, React and many more. <br />
                Put your skills to the test, sharpen your problem-solving
                abilities,
              </p>

              <a href="/login">
                <button className="btn bg-light text-dark  xtra ">
                  <i class="fa-solid fa-location-arrow px-4  bulg"></i>
                </button>
              </a>
            </div>
            <div
              className="m-0 text-white-50 ms-auto col-md-6 align-content-center  mt-4  rounded  rounded-3 ps-3  d-none  "
              style={{
                height: "80%",
                width: "560px",
              }}
              ref={ref4}
            >
              <img
                src={books}
                alt=""
                style={{
                  width: "100%",

                  opacity: "0.6",
                }}
              />
            </div>
          </div>
        </main>
      </div>
      <ScrollToTop smooth height="15" width="15" />
      <footer className="bg-dark text-center  text-white-50  ">
        BrainyBits © 2024 All Rights Reserved.
      </footer>
    </>
  );
};

export default HomePage;
