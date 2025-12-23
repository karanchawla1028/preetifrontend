import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../toolkit/slices/authSlice";
import { useToast } from "../../features/components/ToastProvider";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [detail, setDetail] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (detail.newPassword !== detail.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    dispatch(updatePassword(detail))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          showToast({
            title: "Success",
            description:
              "Password reset successfully! Please login with your new password.",
            status: "success",
          });
          setDetail({
            email: "",
            newPassword: "",
            confirmPassword: "",
          });
          navigate("/login");
        } else {
          showToast({
            title: "Error",
            description: "Something went wrong!",
            status: "error",
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Error",
          description: "Something went wrong!",
          status: "error",
        });
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
          Reset Your Password
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Registered Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={detail.email}
            onChange={(e) =>
              setDetail((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />

          <input
            type="password"
            placeholder="New Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={detail.newPassword}
            onChange={(e) =>
              setDetail((prev) => ({ ...prev, newPassword: e.target.value }))
            }
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={detail.confirmPassword}
            onChange={(e) =>
              setDetail((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            required
          />

          <button
            type="submit"
            className="cursor-pointer bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Remember your password?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
