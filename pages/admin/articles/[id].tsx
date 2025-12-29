import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArticleForm } from "../../../components/Admin/Articles/ArticleForm";
import { WithAuthentication } from "../../../components/WithAuthentication";

import {
  getArticleByID,
  updateArticle,
} from "../../../lib/Firebase/firebaseClientAPIs";
import { IEditArticle } from "../../../lib/types";

import styles from "../../../styles/Article.module.css";
import { Spinner } from "@heroui/react";

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
        <div className="flex flex-col gap-[20px] items-center">
          <h1 className="text-2xl font-bold text-default-foreground">
            Oppdater artikkel
          </h1>
          {loading ? (
            <Spinner size="lg" />
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
