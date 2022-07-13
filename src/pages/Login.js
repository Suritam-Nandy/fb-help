import { useSelector } from "react-redux";

import React, { useState } from "react";
import Input from "../components/layout/Input";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useParams, Link, useHistory } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
const Login = () => {
  let history = useHistory();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then((resp) => {
        firestore.collection("users").doc(resp.user.uid).update({
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
      .then(() => {
        history.push("/dashboard");
      });
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const some = await firebase.login(user);
    console.log(some);
    history.replace("/dashboard");
  };
  return (
    <>
      <div className="mx-auto h-full bg-Bg">
        <div className="flex content-center items-center justify-center min-h-100 h-screen">
          <div className="w-full lg:w-3/12 px-4 items-center ">
            <div className="relative container flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              {/* <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
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
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div> */}
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mt-12 my-3 font-semibold text-xl">
                  <h1>Login to your account</h1>
                </div>
                <form onSubmit={submitForm}>
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
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter Your Password"
                      value={user.password}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="flex flex-row mb-10 p-1  hover:text-black">
                    <input
                      type="checkbox"
                      className="text-gray-800 mt-1 "
                      // onClick={handleClickAmenities}
                      name="rememberMe"
                    />
                    <span className="text-lg text-gray-900 ml-1 mt-0.5">
                      Remember Me
                    </span>
                  </div>
                  <div className="w-full bg-Bg text-center">
                    <button className=" text-gray-300 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Login
                    </button>
                  </div>
                </form>
                <div className="text-blueGray-400 text-center mt-3 font-bold">
                  <small>Dont have an account?</small>
                  <label className="text-blueGray-500 hover:text-blueGray-600">
                    {" "}
                    <Link to="/signup" className="dropdown-item text-Bg">
                      Signup
                    </Link>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
