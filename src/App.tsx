import Calculator from "./components/Calculator";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ToggleButton from "./components/ToggleButton";
import { useState } from "react";
import { useDarkMode } from "./contexts/DarkModeContext";

const App = () => {
  const [isScientificMode, setIsScientificMode] = useState(false);
  const { isDarkMode } = useDarkMode();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Simple Calculator</h1>
      <div
        className={`flex flex-col w-64 rounded-lg overflow-hidden ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        }`}>
        <ThemeSwitcher />
        <div className="flex items-center w-full">
          <ToggleButton
            label="Scientific"
            checked={isScientificMode}
            onChange={() => setIsScientificMode(!isScientificMode)}
          />
        </div>
        <Calculator isScientificMode={isScientificMode} />
      </div>
    </div>
  );
};

export default App;
