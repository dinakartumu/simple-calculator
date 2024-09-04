import { useDarkMode } from "../contexts/DarkModeContext";

interface ToggleButtonProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const ToggleButton = ({ label, checked, onChange }: ToggleButtonProps) => {
  const { isDarkMode } = useDarkMode();
  return (
    <button
      onClick={onChange}
      className={`px-3 py-1 text-sm font-medium transition-colors duration-200 ease-in-out
        ${
          checked
            ? isDarkMode
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-white"
            : isDarkMode
            ? "bg-gray-700 text-gray-300"
            : "bg-gray-300 text-gray-700"
        }
        ${isDarkMode ? "hover:bg-blue-500" : "hover:bg-blue-400"} w-full`}>
      {label}
    </button>
  );
};

export default ToggleButton;
