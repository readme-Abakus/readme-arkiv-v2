import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";
import { Moon, Sun } from "@gravity-ui/icons";

// Component is hydration un-safe since theme cannot be known at build time
// We prevent component render until we've mounted the component on the client
export const LightSwitch: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      isIconOnly
      radius="full"
      onPress={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
};
