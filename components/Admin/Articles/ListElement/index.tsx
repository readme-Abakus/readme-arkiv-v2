import Link from "next/link";
import { FC } from "react";
import { DeleteButton } from "../../Common/DeleteButton";
import { IArticleListData } from "../../../../lib/types";
import { ROUTES } from "../../../../utils/routes";

import styles from "./ListElement.module.css";

interface ListElementProps {
  obj: IArticleListData;
}
export const ListElement: FC<ListElementProps> = ({ obj }) => {
  const { data, ref, id } = obj;
  const { edition, title, url } = data;
  return (
    <div className={styles.elementStyle}>
      <p>
        {edition} | {title}
      </p>
      <div className={styles.end}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <i className={`material-icons md-36 ${styles.open}`}>
            remove_red_eye
          </i>
        </a>
        <Link href={ROUTES.EDIT_ARTICLE.replace(":id", id)} passHref>
          <i className={`material-icons md-36 ${styles.edit}`}>edit</i>
        </Link>
        <DeleteButton docRef={ref} />
      </div>
    </div>
  );
};
