import React, { useState } from "react";
import Display from "./Output";
import Button from "./Button";
import Checkbox from "./Checkbox";
import { useDarkMode } from "../contexts/DarkModeContext";

const Calculator = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [isScientificMode, setIsScientificMode] = useState(false);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);

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
    if (
      currentValue !== null &&
      operator !== null &&
      queue.length > 0 &&
      !queue[queue.length - 1].match(/[+\-*/]/)
    ) {
      const inputValue = parseFloat(display);
      const result = performOperation(currentValue, inputValue, operator);
      setDisplay(result.toString());
      setCurrentValue(result);
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

  return (
    <div
      className={`w-64 p-4 rounded-lg ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}>
      <div className="flex justify-between mb-4">
        <Checkbox
          label="Dark Mode"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
        <Checkbox
          label="Scientific Mode"
          checked={isScientificMode}
          onChange={() => setIsScientificMode(!isScientificMode)}
          isDarkMode={isDarkMode}
        />
      </div>
      <Display value={display} isDarkMode={isDarkMode} />
      <div className="grid grid-cols-4 gap-2 mt-4">
        <Button onClick={() => handleNumberClick("7")} isDarkMode={isDarkMode}>
          7
        </Button>
        <Button onClick={() => handleNumberClick("8")} isDarkMode={isDarkMode}>
          8
        </Button>
        <Button onClick={() => handleNumberClick("9")} isDarkMode={isDarkMode}>
          9
        </Button>
        <Button
          onClick={() => handleOperatorClick("/")}
          isDarkMode={isDarkMode}>
          /
        </Button>
        <Button onClick={() => handleNumberClick("4")} isDarkMode={isDarkMode}>
          4
        </Button>
        <Button onClick={() => handleNumberClick("5")} isDarkMode={isDarkMode}>
          5
        </Button>
        <Button onClick={() => handleNumberClick("6")} isDarkMode={isDarkMode}>
          6
        </Button>
        <Button
          onClick={() => handleOperatorClick("*")}
          isDarkMode={isDarkMode}>
          *
        </Button>
        <Button onClick={() => handleNumberClick("1")} isDarkMode={isDarkMode}>
          1
        </Button>
        <Button onClick={() => handleNumberClick("2")} isDarkMode={isDarkMode}>
          2
        </Button>
        <Button onClick={() => handleNumberClick("3")} isDarkMode={isDarkMode}>
          3
        </Button>
        <Button
          onClick={() => handleOperatorClick("-")}
          isDarkMode={isDarkMode}>
          -
        </Button>
        <Button onClick={() => handleNumberClick("0")} isDarkMode={isDarkMode}>
          0
        </Button>
        <Button onClick={handleEqualsClick} isDarkMode={isDarkMode}>
          =
        </Button>
        <Button onClick={handleClearClick} isDarkMode={isDarkMode}>
          C
        </Button>
        <Button
          onClick={() => handleOperatorClick("+")}
          isDarkMode={isDarkMode}>
          +
        </Button>
      </div>
      {isScientificMode && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          <Button onClick={handleSignClick} isDarkMode={isDarkMode}>
            +/-
          </Button>
          <Button onClick={handleSquareClick} isDarkMode={isDarkMode}>
            x²
          </Button>
          <Button onClick={handleSquareRootClick} isDarkMode={isDarkMode}>
            √x
          </Button>
        </div>
      )}
    </div>
  );
};

export default Calculator;
