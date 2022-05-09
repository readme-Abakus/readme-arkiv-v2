import { NextPage } from "next";
import { Button, Fade } from "react-bootstrap";
import { WithAuthentication } from "../../../components/WithAuthentication";
import { useArticleList } from "../../../lib/Firebase/hooks";

import styles from "../../../styles/ArticleList.module.css";
import { ListElement } from "../../../components/Admin/Articles/ListElement";
import Head from "next/head";

const ArticleList: NextPage = () => {
  const [data, loading, error, pageNum, nextPage, prevPage] = useArticleList();
  return (
    <>
      <Head>
        <title>readme - artikler</title>
      </Head>
      <WithAuthentication>
        <Fade appear in>
          <div className={styles.articleList}>
            <h1>Artikler</h1>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {data?.map((article, i) => (
                  <ListElement key={i} article={article} />
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
        </Fade>
      </WithAuthentication>
    </>
  );
};

export default ArticleList;
