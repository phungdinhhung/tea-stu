import React, { useEffect } from "react";
// import Nav from "./Components/Nav/Nav";
import Footer from "./Components/Footer/Footer";
import DieuHuongURL from "./DieuHuong/DieuHuongURL";
import firebase from "firebase";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import * as conf from "@/configs";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCZHJVfBMEB6guPzppFYG9GWwC1jaE7abI",
  authDomain: "capstone-1-52073.firebaseapp.com",
};
firebase.initializeApp(config);

// export default class App extends Component {
function App() {
  console.log(conf.DEFAULT_AVATAR_URL);

  //Handle Firebase auth chaned
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          //user logs out, handle something here
          console.log("User is not lgged in");
          return;
        }
        console.log("Logged in user: ", user.displayName);
        const token = await user.getIdToken();
        console.log("Logged in user token: ", token);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <div>
      <DieuHuongURL></DieuHuongURL>
      <ScrollToTop showBelow={100}></ScrollToTop>
      <Footer></Footer>
    </div>
  );
}

export default App;
