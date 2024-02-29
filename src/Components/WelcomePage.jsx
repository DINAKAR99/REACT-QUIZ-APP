import React from "react";
import React, { useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import { Carousel } from "react-responsive-carousel";
import HomeNavbar from "./HomeNavbar";
const WelcomePage = () => {
  return (
    <div>
      <h2 className="text-center  ">
        <b>WELCOME TO QUIZ MASTER </b>
      </h2>

      <Carousel showArrows={true}>
        <div>
          <div
            className="border rounded-3     shadow-lg   text-center  d-flex justify-content-center align-items-center "
            style={{ minHeight: "400px" }}
          >
            <h1>
              <i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
            </h1>
          </div>
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <div
            className="border rounded-3     shadow-lg   text-center  d-flex justify-content-center align-items-center "
            style={{ minHeight: "400px" }}
          >
            <h1>
              <i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
            </h1>
          </div>
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <div
            className="border rounded-3     shadow-lg   text-center  d-flex justify-content-center align-items-center "
            style={{ minHeight: "400px" }}
          >
            <h1>
              <i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
            </h1>
          </div>
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
      <div className=" buttongroup d-flex  justify-content-center ">
        <AwesomeButton
          size="large"
          type="github"
          className="me-2"
          onPress={() => oncl()}
        >
          REGISTER
        </AwesomeButton>
        <AwesomeButton
          size="large"
          type="instagram"
          className="me-2"
          onPress={() => oncl()}
        >
          LOGIN
        </AwesomeButton>
      </div>
    </div>
  );
};

export default WelcomePage;
