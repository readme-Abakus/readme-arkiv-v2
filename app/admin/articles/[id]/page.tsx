"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArticleForm } from "../../../../components/Admin/Articles/ArticleForm";
import { WithAuthentication } from "../../../../components/WithAuthentication";

import {
  getArticleByID,
  updateArticle,
} from "../../../../lib/Firebase/firebaseClientAPIs";
import { IEditArticle } from "../../../../lib/types";

import { Button, Link, Spinner } from "@heroui/react";
import { ROUTES } from "../../../../utils/routes";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [article, setArticle] = useState<IEditArticle>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const { id } = await params;
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
  }, []);

  return (
    <>
      <Head>
        <title>readme - oppdater artikkel</title>
      </Head>
      <WithAuthentication>
        <div className="flex items-center gap-2 max-w-[600px] w-full justify-start">
          <Button
            isIconOnly
            variant="light"
            as={Link}
            href={ROUTES.ARTICLE_LIST}
          >
            <span className="material-symbols-rounded xl">arrow_back</span>
          </Button>

          <h1 className="text-2xl font-bold text-default-foreground">
            Oppdater artikkel
          </h1>
        </div>
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <ArticleForm
            article={article}
            doHandleSubmit={(values, { setStatus, setSubmitting }) => {
              updateArticle(
                values,
                article?.id as string,
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
      </WithAuthentication>
    </>
  );
}
