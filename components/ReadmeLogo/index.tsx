import Image from "next/image";
import { FC } from "react";

import styles from "./ReadmeLogo.module.css";
import logoSrc from "../../public/images/readme_hvit.png";
import logoSrcSmall from "../../public/images/readme_liten_hvit.png";
import blackLogoSrc from "../../public/images/readme.png";
import blackLogoSrcSmall from "../../public/images/readme_liten.png";

export const ReadmeLogo: FC<{
  maxWidth?: string;
  maxHeight?: string;
  small?: boolean;
}> = ({ maxWidth, maxHeight, small }) => {
  return (
    <div className={styles.readmeLogo}>
      <div
        className={styles.logoHvit + " logoHvit"}
        style={{
          maxHeight,
          maxWidth,
        }}
      >
        <Image
          src={small ? logoSrcSmall : logoSrc}
          alt="readmeLogoHvit"
          layout={"responsive"}
        />
      </div>
      <div
        className={styles.logoSort + " logoSort"}
        style={{
          maxHeight,
          maxWidth,
        }}
      >
        <Image
          src={small ? blackLogoSrcSmall : blackLogoSrc}
          alt="readmeLogoHvit"
          layout={"responsive"}
        />
      </div>
    </div>
  );
};
