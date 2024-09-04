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
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [isScientificMode, setIsScientificMode] = useState(false);

  const handleNumberClick = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay((prevDisplay) =>
        prevDisplay === "0" ? num : prevDisplay + num
      );
    }
    setQueue((prevQueue) => [...prevQueue, num]);
  };

  const handleOperatorClick = (op: string) => {
    const inputValue = parseFloat(display);
    if (queue.length > 0 && queue[queue.length - 1].match(/[+\-*/]/)) {
      setQueue((prevQueue) => prevQueue.slice(0, -1));
    } else if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = performOperation(currentValue, inputValue, operator);
      setCurrentValue(result);
      setDisplay(result.toString());
    }
    setWaitingForOperand(true);
    setOperator(op);
    setQueue((prevQueue) => [...prevQueue, op]);
  };

  const handleEqualsClick = () => {
    if (currentValue !== null && operator !== null && !waitingForOperand) {
      const inputValue = parseFloat(display);
      const result = performOperation(currentValue, inputValue, operator);
      setDisplay(result.toString());
      setCurrentValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      setQueue((prevQueue) => [...prevQueue, "=", result.toString()]);
    }
  };

  const handleClearClick = () => {
    setDisplay("0");
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setQueue([]);
  };

  const handleSignClick = () => {
    setDisplay((prevDisplay) => {
      const value = parseFloat(prevDisplay);
      return (-value).toString();
    });
  };

  const handleSquareClick = () => {
    setDisplay((prevDisplay) => {
      const value = parseFloat(prevDisplay);
      return (value * value).toString();
    });
  };

  const handleSquareRootClick = () => {
    setDisplay((prevDisplay) => {
      const value = parseFloat(prevDisplay);
      return Math.sqrt(value).toString();
    });
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
