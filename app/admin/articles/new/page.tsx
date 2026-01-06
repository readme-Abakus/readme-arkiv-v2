"use client";

import { Button, Link } from "@heroui/react";
import { ROUTES } from "../../../../utils/routes";
import { WithAuthentication } from "../../../../components/WithAuthentication";
import { ArticleForm } from "../../../../components/Admin/Articles/ArticleForm";
import { addNewArticle } from "../../../../lib/Firebase/firebaseClientAPIs";

export default function Page() {
  return (
    <WithAuthentication>
      <div className="flex items-center gap-2 max-w-[600px] w-full justify-start">
        <Button isIconOnly variant="light" as={Link} href={ROUTES.ARTICLE_LIST}>
          <span className="material-symbols-rounded xl">arrow_back</span>
        </Button>
        <h1 className="text-3xl font-bold text-default-foreground">
          Ny artikkel
        </h1>
      </div>
      <ArticleForm
        doHandleSubmit={(values, { setStatus, setSubmitting }) =>
          addNewArticle(
            values,
            () => {
              setSubmitting(false);
              setStatus({ success: true });
            },
            () => {
              setSubmitting(false);
              setStatus({ error: true });
            }
          )
        }
      />
    </WithAuthentication>
  );
}
