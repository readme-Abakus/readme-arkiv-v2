import Image from "next/image";
import { FC } from "react";

import styles from "./ReadmeLogo.module.css";
import logoSrc from "../../public/images/readme_hvit.png";
import blackLogoSrc from "../../public/images/readme.png";

// readme logo som PNG
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
        <Image src={logoSrc} alt="readmeLogoHvit" />
      </div>
      <div
        className={styles.logoSort + " logoSort"}
        style={{
          maxHeight,
          maxWidth,
        }}
      >
        <Image src={blackLogoSrc} alt="readmeLogoSvart" />
      </div>
    </div>
  );
};

// readme logo som tekst (altså uten kule)
export const ReadmeTextLogo: FC = () => (
  <span
    style={{
      fontFamily: "OCRAExtended",
      textTransform: "lowercase",
    }}
  >
    readme
  </span>
);

export const readmeIfy = (text: string | null | undefined) => (
  <span>
    {text
      ?.split(/readme/)
      .reduce<
        React.ReactNode[]
      >((prev, current, i) => (i ? [...prev, <ReadmeTextLogo key={i} />, current] : [current]), [])}
  </span>
);

export default ReadmeLogo;
