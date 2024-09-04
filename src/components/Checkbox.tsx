import React from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  isDarkMode: boolean;
}

const Checkbox = ({ label, checked, onChange, isDarkMode }: CheckboxProps) => {
  return (
    <label
      className={`flex items-center ${
        isDarkMode ? "text-white" : "text-black"
      }`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      {label}
    </label>
  );
};

export default Checkbox;
