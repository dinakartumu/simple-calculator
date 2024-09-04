import React from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  const { isDarkMode } = useDarkMode();
  return (
    <button
      className={`p-2 text-lg rounded ${
        isDarkMode ? "bg-[#666] text-white" : "bg-[#f0f0f0] text-black"
      } hover:opacity-80`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
