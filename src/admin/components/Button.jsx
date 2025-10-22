import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles = `
    px-4 py-2 rounded-md text-sm font-medium
    transition-colors duration-200 cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-blue-600 text-white
      hover:bg-blue-700
      focus:ring-blue-500
    `,
    outline: `
      border border-gray-300 text-gray-600
      hover:bg-gray-500 hover:text-black
      focus:ring-blue-500
    `,
    ghost: `
      text-gray-600 hover:bg-gray-200
      focus:ring-gray-400
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      focus:ring-red-500
    `,
    success: `
      bg-green-600 text-white
      hover:bg-green-700
      focus:ring-green-500
    `,
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
