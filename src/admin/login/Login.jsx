import React, { useState } from "react";
import logo from "../../assets/logo.png"; // Replace with your logo path
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../toolkit/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });

  const handleUserLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin(detail)).then((resp) => {
      if (resp.meta.requestStatus === "fulfilled") {
        alert("User logged in successfully !.");
        navigate(`/${resp.payload?.id}/admin/dashboard`);
      }else{
        alert("something went wrong !.")
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-20 w-auto rounded-lg" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={detail?.email}
            onChange={(e) =>
              setDetail((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={detail?.password}
            onChange={(e) =>
              setDetail((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button
            type="submit"
            className="cursor-pointer bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={handleUserLogin}
          >
            Login
          </button>
        </form>

        {/* Additional Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <Link href="#" className="hover:text-blue-600">
            Forgot password?
          </Link>
          {/* <a href="#" className="hover:text-blue-600">
            Sign up
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
