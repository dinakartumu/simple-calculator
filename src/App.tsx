import React from "react";
import Calculator from "./components/Calculator";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="w-full flex flex-col justify-center items-center p-4">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Simple Calculator
          </h1>
          <Calculator />
        </div>
      </div>
    </DarkModeProvider>
  );
};

export default App;
