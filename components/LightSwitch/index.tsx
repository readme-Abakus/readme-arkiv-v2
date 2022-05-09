import { FC, useEffect, useState } from "react";
import Switch from "react-switch";
import { useTheme } from "next-themes";

import styles from "./LightSwitch.module.css";

// Component is hydration un-safe since theme cannot be known at build time
// We prevent component render until we've mounted the component on the client
export const LightSwitch: FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

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
