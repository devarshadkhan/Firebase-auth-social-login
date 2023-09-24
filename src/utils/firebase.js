import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyC4Onsv8gR5A_DfDN5Wyk2xhudcpj_rTWI",
  authDomain: "social-media-app-b5212.firebaseapp.com",
  databaseURL: "https://social-media-app-b5212-default-rtdb.firebaseio.com",
  projectId: "social-media-app-b5212",
  storageBucket: "social-media-app-b5212.appspot.com",
  messagingSenderId: "541299935827",
  appId: "1:541299935827:web:57b930b03f3db4fcf114a6",
  measurementId: "G-V5774TWDNR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);