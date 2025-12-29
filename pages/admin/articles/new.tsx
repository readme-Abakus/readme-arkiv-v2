import Head from "next/head";
import { ArticleForm } from "../../../components/Admin/Articles/ArticleForm";
import { WithAuthentication } from "../../../components/WithAuthentication";
import { addNewArticle } from "../../../lib/Firebase/firebaseClientAPIs";

const NewArticlePage = () => (
  <>
    <Head>
      <title>readme - ny artikkel</title>
    </Head>
    <WithAuthentication>
      <h1 className="text-2xl font-bold text-default-foreground">
        Ny artikkel
      </h1>
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
  </>
);

export default NewArticlePage;
