import Image from "next/image";
import { FC } from "react";

import styles from "./ReadmeLogo.module.css";
import logoSrc from "../../public/images/readme_hvit.png";
import blackLogoSrc from "../../public/images/readme.png";

export const ReadmeLogo: FC<{
  maxWidth?: string;
  maxHeight?: string;
}> = ({ maxWidth, maxHeight }) => {
  return (
    <div className={styles.readmeLogo} style={{ maxWidth, maxHeight }}>
      <div
        className={styles.logoHvit + " logoHvit"}
        style={{
          maxHeight,
          maxWidth,
        }}
      >
        <Image src={logoSrc} alt="readmeLogoHvit" layout={"responsive"} />
      </div>
      <div
        className={styles.logoSort + " logoSort"}
        style={{
          maxHeight,
          maxWidth,
        }}
      >
        <Image src={blackLogoSrc} alt="readmeLogoHvit" layout={"responsive"} />
      </div>
    </div>
  );
};
