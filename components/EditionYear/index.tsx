import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { IEditionData } from "../../lib/types";
import { ROUTES } from "../../utils/routes";

import styles from "./EditionYear.module.scss";

export const EditionYear: FC<{ data: IEditionData }> = ({ data }) => {
  return (
    <div className={styles.container}>
      <h2>{data.year}</h2>
      <hr />
      <div className={styles.imagesContainer}>
        {data.editions.map((edition) => (
          <a
            key={`${data.year}-${edition.edition}`}
            href={ROUTES.EDITION.replace(
              ":id",
              `${data.year}-${edition.edition}`
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={edition.imageUrl}
              height={setImageHeight(data.year, parseInt(edition.edition))}
              width={200}
              alt={`Forside på utgave ${data.year}-${edition.edition}`}
            />
          </a>
        ))}
      </div>
      <hr />
    </div>
  );
};

function setImageHeight(year: number, edition: number) {
  if (year >= 2018) {
    return 255.5;
  } else if (year > 2014 || (year === 2014 && edition > 1)) {
    return 253.5;
  } else {
    return 291.5;
  }
}
