// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF7FarVXzpltaAFgO0dJ9WY7gDdR6wIc4",
  authDomain: "react-quiz-app-001.firebaseapp.com",
  databaseURL:
    "https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-quiz-app-001",
  storageBucket: "react-quiz-app-001.appspot.com",
  messagingSenderId: "641816430534",
  appId: "1:641816430534:web:6cb92c8b7b4dbd11dad4c7",
  measurementId: "G-T18GCF3ZN5",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
