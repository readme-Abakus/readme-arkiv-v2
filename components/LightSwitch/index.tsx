import { FC } from "react";
import Switch from "react-switch";
import { useTheme } from "next-themes";

import styles from "./LightSwitch.module.css";

export const LightSwitch: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      onChange={(checked) => setTheme(checked ? "light" : "dark")}
      checked={theme === "light"}
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
