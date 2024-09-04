import Display from "./Output";
import Button from "./Button";
import { BUTTONS, SCIENTIFIC_BUTTONS } from "../constants";
import { useCalculator } from "../contexts/CalculatorContext";
import ToggleButton from "./ToggleButton";

const Calculator = () => {
  const { display, isScientificMode, handleButtonClick, toggleScientificMode } =
    useCalculator();

  return (
    <div className={`p-4`}>
      <div className="flex items-center w-full mb-4">
        <ToggleButton
          label="Scientific"
          checked={isScientificMode}
          onChange={toggleScientificMode}
        />
      </div>
      <Display value={display} />
      <div className="grid grid-cols-4 gap-2 mt-4">
        {BUTTONS.map((btn, index) => (
          <Button key={index} onClick={() => handleButtonClick(btn)}>
            {btn}
          </Button>
        ))}
      </div>
      {isScientificMode && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {SCIENTIFIC_BUTTONS.map((btn, index) => (
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
