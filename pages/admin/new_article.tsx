import Head from "next/head";
import { ArticleForm } from "../../components/Admin/Articles/ArticleForm";
import { addNewArticle } from "../../lib/Firebase/firebaseClientAPIs";

import styles from "../../styles/Article.module.css";

const NewArticlePage = () => (
  <div className={styles.container}>
    <Head>
      <title>readme - ny artikkel</title>
    </Head>
    <h1>Ny artikkel</h1>
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
);

export default NewArticlePage;
