import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { ArticleForm } from "../../../components/Admin/Articles/ArticleForm";
import { WithAuthentication } from "../../../components/WithAuthentication";

import {
  getArticleByID,
  updateArticle,
} from "../../../lib/Firebase/firebaseClientAPIs";
import { IEditArticle } from "../../../lib/types";

import styles from "../../../styles/Article.module.css";

const NewArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<IEditArticle>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    let isSubscribed = true;
    const fetchData = async () => {
      const article = await getArticleByID(id as string);
      const [editionYear, editionNumber] = article.edition.split("-");
      const editArticle: IEditArticle = {
        ...article,
        editionYear: Number(editionYear),
        editionNumber: Number(editionNumber),
        pages: article.pages.join(", "),
        tags: article.tags.join(", "),
      };
      if (isSubscribed) {
        setArticle(editArticle);
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      isSubscribed = false;
    };
  }, [id]);

  return (
    <>
      <Head>
        <title>readme - oppdater artikkel</title>
      </Head>
      <WithAuthentication>
        <div className={styles.container}>
          <h1>Oppdater artikkel</h1>
          {loading ? (
            <Spinner animation="border" size="sm" variant="secondary" />
          ) : (
            <ArticleForm
              article={article}
              doHandleSubmit={(values, { setStatus, setSubmitting }) => {
                updateArticle(
                  values,
                  id as string,
                  () => {
                    setSubmitting(false);
                    setStatus({ success: true });
                  },
                  () => {
                    setSubmitting(false);
                    setStatus({ error: true });
                  }
                );
              }}
            />
          )}
        </div>
      </WithAuthentication>
    </>
  );
};

export default NewArticlePage;
