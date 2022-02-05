import { NextPage } from "next";
import Link from "next/link";
import { FC } from "react";
import { Button } from "react-bootstrap";
import { DeleteButton } from "../../components/Admin/Common/DeleteButton";
import { WithAuthentication } from "../../components/WithAuthentication";
import { useArticleList } from "../../lib/Firebase/hooks";
import { IArticleListData } from "../../lib/types";
import { ROUTES } from "../../utils/routes";

import styles from "../../styles/ArticleList.module.css";

interface ListElementProps {
  key: number;
  obj: IArticleListData;
}

const ListElement: FC<ListElementProps> = ({ obj }) => {
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

const ArticleList: NextPage = () => {
  const [data, loading, error, pageNum, nextPage, prevPage] = useArticleList();
  return (
    <WithAuthentication>
      <div className={styles.articleList}>
        <h1>Artikler</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {data?.map((article, i) => (
              <ListElement key={i} obj={article} />
            ))}

            <div className={styles.pagination}>
              <Button disabled={pageNum === 0} onClick={() => prevPage()}>
                &lt;&lt;
              </Button>
              <Button onClick={() => nextPage()}>&gt;&gt;</Button>
            </div>
          </>
        )}
      </div>
    </WithAuthentication>
  );
};

export default ArticleList;
