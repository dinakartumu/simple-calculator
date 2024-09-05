import React, { createContext, useContext, useState } from "react";
import { OPERATORS } from "../constants";

interface CalculatorContextType {
  display: string;
  isScientificMode: boolean;
  handleButtonClick: (btn: string) => void;
  toggleScientificMode: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(
  undefined
);

export const CalculatorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [isScientificMode, setIsScientificMode] = useState(false);

  const handleNumberClick = (num: string) => {
    const newInput = currentValue === null ? num : currentValue + num;
    setCurrentValue(newInput);
    setDisplay(newInput);
  };

  const handleOperatorClick = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(currentValue);
      setCurrentValue(null);
    } else if (
      operator !== null &&
      previousValue !== null &&
      currentValue !== null
    ) {
      const result = performOperation(
        parseFloat(previousValue),
        parseFloat(currentValue),
        operator
      );
      setPreviousValue(result.toString());
      setCurrentValue(null);
      setDisplay(result.toString());
    }
    setOperator(op);
  };

  const handleEqualsClick = () => {
    if (operator !== null && previousValue !== null && currentValue !== null) {
      const result = performOperation(
        parseFloat(previousValue || "0"),
        parseFloat(currentValue || "0"),
        operator
      );
      setDisplay(result.toString());
      setPreviousValue(null);
      setCurrentValue(result.toString());
      setOperator(null);
    }
  };

  const handleClearClick = () => {
    setDisplay("0");
    setCurrentValue(null);
    setPreviousValue(null);
    setOperator(null);
  };

  const handleSignClick = () => {
    const toggleSign = (value: string | null) =>
      value ? (-parseFloat(value)).toString() : "0";

    if (currentValue === null) {
      setPreviousValue((prev) => toggleSign(prev));
    } else {
      setCurrentValue((prev) => toggleSign(prev));
    }
    setDisplay((prev) => toggleSign(prev));
  };

  const handleSquareClick = () => {
    const square = (value: string | null) =>
      value ? (parseFloat(value) ** 2).toString() : "0";

    if (currentValue === null) {
      setPreviousValue((prev) => square(prev));
    } else {
      setCurrentValue((prev) => square(prev));
    }
    setDisplay((prev) => square(prev));
  };

  const handleSquareRootClick = () => {
    const calculateSquareRoot = (value: string | null) =>
      value ? Math.sqrt(parseFloat(value)).toString() : "0";

    if (currentValue === null) {
      setPreviousValue((prev) => calculateSquareRoot(prev));
    } else {
      setCurrentValue((prev) => calculateSquareRoot(prev));
    }
    setDisplay((prev) => calculateSquareRoot(prev));
  };

  const performOperation = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return b;
    }
  };

  const handleButtonClick = (btn: string) => {
    if (OPERATORS.includes(btn)) {
      handleOperatorClick(btn);
    } else if (btn === "=") {
      handleEqualsClick();
    } else if (btn === "C") {
      handleClearClick();
    } else if (btn === "+/-") {
      handleSignClick();
    } else if (btn === "x²") {
      handleSquareClick();
    } else if (btn === "√x") {
      handleSquareRootClick();
    } else {
      handleNumberClick(btn);
    }
  };

  const toggleScientificMode = () => {
    setIsScientificMode((prev) => !prev);
  };

  return (
    <CalculatorContext.Provider
      value={{
        display,
        isScientificMode,
        handleButtonClick,
        toggleScientificMode,
      }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
};
