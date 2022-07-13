import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import React, { useState, useEffect } from "react";
import Input from "../components/layout/Input";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
const Signup = (props) => {
  let history = useHistory();
  const firebase = useFirebase();
  const firestore = useFirestore();
  // const [docRole, setDocRole] = useState("");
  var role = props.location.role
    ? props.location.role
    : window.localStorage.getItem("role");

  // Save data to localStorage
  window.localStorage.setItem("role", role);

  console.log(role);
  // firebase.updateProfile({ role: role });

  // const auth = useSelector((state) => state.firebase.auth);
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    role: role,
  });

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then((resp) => {
        firestore.collection("users").doc(resp.user.uid).update({
          role: role,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        history.push("/dashboard");
      });
  };
  const signInWithFacebook = () => {
    firebase
      .login({
        provider: "facebook",
        type: "popup",
      })
      .then((resp) => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)

          .update({
            role: role,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
      });
    history.push("/dashboard");
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((resp) => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)

          .set({
            displayName: user.displayName,
            email: user.email,
            role: role,

            createdAt: firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            firebase.login(user);
          });
      });
    // const some = await firebase.login(user);
    // console.log(some);
    history.replace("/dashboard");
  };
  return (
    <>
      <div className=" mx-auto px-4 h-full bg-Bg">
        <div className="flex content-center items-center justify-center min-h-100 h-screen">
          <div className="w-full lg:w-3/12 px-4 items-center ">
            <div className="relative container flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-4 pt-0">
                <div className="text-blueGray-400 text-center mt-12 my-3 font-semibold text-xl">
                  <h1>Create Account</h1>
                </div>
                <form onSubmit={submitForm}>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Name
                    </label>
                    <Input
                      name="displayName"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Enter Your Username"
                      value={user.displayName}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Email
                    </label>
                    <Input
                      name="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Enter Your E-mail"
                      value={user.email}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      //   name="password"
                      className="form-control w-56 md:w-64 xl:w-full shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter Your Password"
                      //   onChange={onInputChange}
                    />
                  </div>
                  <div className="w-full bg-Bg text-center">
                    <button className=" text-gray-300 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Sign up
                    </button>
                  </div>
                </form>
                <div className="flex flex-row my-0.5 p-1  hover:text-black">
                  <input
                    type="checkbox"
                    className="text-gray-800 mt-1 "
                    // onClick={handleClickAmenities}
                    name="rememberMe"
                  />
                  <span className="text-lg text-gray-900 ml-1 mt-1">
                    Remember Me
                  </span>
                </div>
                {/* <hr className="mt-6 border-b-1 border-blueGray-300" />
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Sign up with
                    </h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        signInWithGoogle();
                      }}
                    >
                      <FcGoogle className="mr-1" size={20} />
                      Google
                    </button>
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        signInWithFacebook();
                      }}
                    >
                      <AiFillFacebook className=" mr-1" size={20} />
                      Facebook
                    </button>
                  </div>
                </div> */}
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Already have an account?</small>
                  <label className="text-blueGray-500 hover:text-blueGray-600">
                    {" "}
                    <Link to="/login" className="dropdown-item text-Bg">
                      Login
                    </Link>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/allspaces" className="dropdown-item">
        Listed Spaces
      </Link>
    </>
  );
};

export default Signup;
