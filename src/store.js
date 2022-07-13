import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import "firebase/storage";

import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore

// const fbConfig = {
//   apiKey: "AIzaSyDHoq8fW-SIRnNl-sAUu-N0LjDVMU3dbok",
//   authDomain: "tradegram-test.firebaseapp.com",
//   projectId: "tradegram-test",
//   storageBucket: "tradegram-test.appspot.com",
//   messagingSenderId: "395031025753",
//   appId: "1:395031025753:web:f03b0ddaa7b596a678f948",
// };

const fbConfig = {
  apiKey: "AIzaSyCw92NqpoI-bfrkgzC-DQOfFiJacuMwkdo",
  authDomain: "fb-help.firebaseapp.com",
  projectId: "fb-help",
  storageBucket: "fb-help.appspot.com",
  messagingSenderId: "807198308055",
  appId: "1:807198308055:web:5f89028c114081ac6ce292",
  measurementId: "G-HG26Z3KXYF",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: `users`,
  // userProfile2: "users/brand",

  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);
let storage = firebase.storage();
// Initialize other services on firebase instance
firebase.firestore();
const db = firebase.firestore(); // <- needed if using firestore
export { db, storage };
const store = createStore(rootReducer, composeWithDevTools());

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
