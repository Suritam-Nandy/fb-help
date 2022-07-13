import { useSelector } from "react-redux";

import React, { useState } from "react";
import Input from "../components/layout/Input";
import { useFirebase } from "react-redux-firebase";
import { Link, useHistory } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
const Login = () => {
  let history = useHistory();
  const firebase = useFirebase();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const some = await firebase.login(user);
    console.log(some);
    history.replace("/");
  };
  return (
    <>
      <div className="mx-auto h-full bg-Bg">
        <div className="flex content-center items-center justify-center min-h-100 h-screen">
          <div className="w-full lg:w-3/12 px-4 items-center ">
            <div className="relative container flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
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
