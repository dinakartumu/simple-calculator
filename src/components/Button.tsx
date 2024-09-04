import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  isDarkMode: boolean;
}

const Button = ({ onClick, children, isDarkMode }: ButtonProps) => {
  return (
    <button
      className={`p-2 text-lg rounded ${
        isDarkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"
      } hover:opacity-80`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
