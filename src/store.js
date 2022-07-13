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
  apiKey: "AIzaSyAh0cK7VxVMPeRvr7W3r1e0X-pI1Uhiv1Q",
  authDomain: "litestore-242f8.firebaseapp.com",
  projectId: "litestore-242f8",
  storageBucket: "litestore-242f8.appspot.com",
  messagingSenderId: "489960878790",
  appId: "1:489960878790:web:31df43286dafe2fd685dc7",
  measurementId: "G-BYVYDLZKLJ",
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
