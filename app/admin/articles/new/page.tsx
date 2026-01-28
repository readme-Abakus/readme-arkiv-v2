"use client";

import { ROUTES } from "../../../../utils/routes";
import { WithAuthentication } from "@/components/WithAuthentication";
import { ArticleForm } from "../_components/ArticleForm";
import { addNewArticle } from "../../../../lib/Firebase/firebaseClientAPIs";
import PageHeader from "@/components/PageHeader";

export default function Page() {
  return (
    <WithAuthentication>
      <div className="flex flex-col items-left gap-5 max-w-[500px] w-full">
        <PageHeader title="Ny artikkel" backButtonRoute={ROUTES.ARTICLE_LIST} />
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
      </div>
    </WithAuthentication>
  );
}
