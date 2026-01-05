import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";

// Component is hydration un-safe since theme cannot be known at build time
// We prevent component render until we've mounted the component on the client
export const LightSwitch: FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      isIconOnly
      radius="full"
      onPress={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <span className="material-symbols-rounded sm">dark_mode</span>
      ) : (
        <span className="material-symbols-rounded sm">light_mode</span>
      )}
    </Button>
  );
};
