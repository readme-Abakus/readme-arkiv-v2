import { FC } from "react";
import { ReadmeLogo } from "../components/ReadmeLogo";

export const Footer: FC = () => {
  return (
    <div className="mb-5 absolute bottom-0 left-1/2 -translate-x-1/2 *:mx-auto">
      <p className="mb-2">Laget med 📸✍🏻📰 av </p>
      <ReadmeLogo maxWidth={"7em"} />
    </div>
  );
};
