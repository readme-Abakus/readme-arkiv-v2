import Link from "next/link";
import { FC } from "react";
import { DeleteButton } from "../../Common/DeleteButton";
import { ROUTES } from "../../../../utils/routes";

import styles from "./ListElement.module.css";
import { deleteArticle } from "../../../../lib/Firebase/firebaseAPIs";
import { IArticle } from "../../../../lib/types";

interface ListElementProps {
  article: IArticle;
}
export const ListElement: FC<ListElementProps> = ({ article }) => {
  const { edition, title, url, id } = article;
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
        <DeleteButton onClick={() => deleteArticle(id)} />
      </div>
    </div>
  );
};
