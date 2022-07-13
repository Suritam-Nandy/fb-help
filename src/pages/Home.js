import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

const Home = () => {
  const firebase = useFirebase();

  // const { user, logoutUser } = useUserContext();
  return (
    <>
      <div className="mx-auto h-full bg-Bg">
        <div className="flex content-center items-center justify-center min-h-100 h-screen">
          <div className="w-full lg:w-3/12 px-4 items-center ">
            <div className="relative container flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mt-12 my-3 font-semibold text-xl">
                  <h1> Facebook Page Integration</h1>
                </div>
                <button className="w-full bg-Bg text-center text-gray-300 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Connect Page
                </button>
                <div className="flex items-center">
                  <Link to="/login">
                    <span
                      onClick={() => firebase.logout()}
                      className="text-sm  ml-2"
                    >
                      Logout
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
