import { NextPage } from "next";
import { Button, Fade, Spinner } from "react-bootstrap";
import { WithAuthentication } from "../../components/WithAuthentication";
import { useArticleList } from "../../lib/Firebase/hooks";

import styles from "../../styles/ArticleList.module.css";
import { ListElement } from "../../components/Admin/Articles/ListElement";

const ArticleList: NextPage = () => {
  const [data, loading, error, pageNum, nextPage, prevPage] = useArticleList();
  return (
    <WithAuthentication>
      <Fade in appear>
        <div className={styles.articleList}>
          <h1>Artikler</h1>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Fade appear in>
              <div>
                {data?.map((article, i) => (
                  <ListElement key={i} article={article} />
                ))}

                <div className={styles.pagination}>
                  <Button disabled={pageNum === 0} onClick={() => prevPage()}>
                    &lt;&lt;
                  </Button>
                  <Button onClick={() => nextPage()}>&gt;&gt;</Button>
                </div>
              </div>
            </Fade>
          )}
        </div>
      </Fade>
    </WithAuthentication>
  );
};

export default ArticleList;
