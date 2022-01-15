import Image from "next/image";
import { FC } from "react";
import { IEditionData } from "../../lib/types";

import styles from "./EditionYear.module.scss";

export const EditionYear: FC<{ data: IEditionData }> = ({ data }) => {
  return (
    <div className={styles.container}>
      <h2>{data.year}</h2>
      <hr />
      <div className={styles.imagesContainer}>
        {data.editions.map((edition) => (
          <a
            key={edition.edition}
            href={edition.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={edition.imageUrl}
              height={setImageHeight(data.year, parseInt(edition.edition))}
              width={200}
              alt={`Forside på utgave ${data.year}-${edition.edition}`}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(
                  200,
                  setImageHeight(data.year, parseInt(edition.edition))
                )
              )}`}
            />
          </a>
        ))}
      </div>
      <hr />
    </div>
  );
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

function setImageHeight(year: number, edition: number) {
  if (year >= 2018) {
    return 255.5;
  } else if (year > 2014 || (year === 2014 && edition > 1)) {
    return 253.5;
  } else {
    return 291.5;
  }
}
