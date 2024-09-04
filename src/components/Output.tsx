import { useDarkMode } from "../contexts/DarkModeContext";

interface DisplayProps {
  value: string;
}

const Output = ({ value }: DisplayProps) => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`w-full p-2 text-right text-2xl rounded overflow-auto border-2 ${
        isDarkMode
          ? "bg-grey-800 text-white border-gray-700"
          : "bg-white text-black border-gray-300"
      }`}>
      {value}
    </div>
  );
};

export default Output;
