import React, { useEffect, useState } from "react";
import CustomNavbar from "./CustomNavbar";
// import { FullScreen } from "@chiragrupani/fullscreen-react";

// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplate,
//   LoadCanvasTemplateNoReload,
//   validateCaptcha,
// } from "react-simple-captcha";

import { gapi } from "gapi-script";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const SupportPage = () => {
  const client_id =
    "574785353635-351autdab21u6g6tvi3v3153vuk1dtlp.apps.googleusercontent.com";
  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       client_id: client_id,
  //       scope: "",
  //     });
  //   }

  //   gapi.load("client:auth2", start);
  // });

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          console.log(res);
          console.log(profile);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  // let [isFullScreen, setFullScreen] = useState(false);
  return (
    <div>
      <CustomNavbar />
      support page
      <div>
        <h2>React Google Login</h2>
        <br />
        <br />
        {profile ? (
          <div>
            <img src={profile.picture} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button onClick={logOut}>Log out</button>
            <button onClick={login}>Sign in with Google 🚀 </button>
          </div>
        ) : (
          <button onClick={login}>Sign in with Google 🚀 </button>
        )}
      </div>
    </div>
  );
};

export default SupportPage;
