import { useState } from "react";
import Display from "./Output";
import Button from "./Button";

const buttons = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  "=",
  "C",
  "+",
];

const scientificButtons = ["+/-", "x²", "√x"];

const Calculator = ({ isScientificMode }: { isScientificMode: boolean }) => {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
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

  const handleButtonClick = (btn: string) => {
    if (["+", "-", "*", "/"].includes(btn)) {
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

  return (
    <div className={`w-64 p-4`}>
      <Display value={display} />
      <div className="grid grid-cols-4 gap-2 mt-4">
        {buttons.map((btn, index) => (
          <Button key={index} onClick={() => handleButtonClick(btn)}>
            {btn}
          </Button>
        ))}
      </div>
      {isScientificMode && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {scientificButtons.map((btn, index) => (
            <Button key={index} onClick={() => handleButtonClick(btn)}>
              {btn}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calculator;
