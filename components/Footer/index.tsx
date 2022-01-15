import { FC } from "react";
import { ReadmeLogo } from "../ReadmeLogo";

import style from "./Footer.module.scss";

export const Footer: FC = () => {
  return (
    <div className={style.footer}>
      <p>Laget med ❤ av </p>
      <ReadmeLogo small maxWidth={"7em"} />
    </div>
  );
};
