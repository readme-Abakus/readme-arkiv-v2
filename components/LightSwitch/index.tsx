import { FC, useState } from "react";
import Switch from "react-switch";
import useDarkMode from "use-dark-mode";

import styles from "./LightSwitch.module.css";

export const LightSwitch: FC = () => {
  const darkmode = useDarkMode();
  const [state, setState] = useState(!darkmode.value);

  function handleChange(checked: boolean) {
    setState(checked);
    if (checked) {
      darkmode.disable();
    } else {
      darkmode.enable();
    }
  }

  return (
    <Switch
      onChange={(checked) => handleChange(checked)}
      checked={state}
      checkedIcon={
        <i className={`material-icons md-24 ${styles.sun}`}> wb_sunny</i>
      }
      uncheckedIcon={
        <i className={`material-icons md-24 ${styles.moon}`}>brightness_3</i>
      }
      onColor="#fcba03"
    />
  );
};
