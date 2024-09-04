import ToggleButton from "./ToggleButton";
import { useDarkMode } from "../contexts/DarkModeContext";

const ThemeSwitcher = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex w-full">
      <div className="flex-1">
        <ToggleButton
          label="Light Mode"
          checked={!isDarkMode}
          onChange={toggleDarkMode}
        />
      </div>
      <div className="flex-1">
        <ToggleButton
          label="Dark Mode"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
