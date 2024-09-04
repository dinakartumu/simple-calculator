import React from "react";

interface DisplayProps {
  value: string;
  isDarkMode: boolean;
}

const Output = ({ value, isDarkMode }: DisplayProps) => {
  return (
    <div
      className={`w-full p-2 text-right text-2xl rounded overflow-auto ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
      }`}>
      {value}
    </div>
  );
};

export default Output;
