import Head from "next/head";
import { Fade } from "react-bootstrap";
import { ArticleForm } from "../../../components/Admin/Articles/ArticleForm";
import { WithAuthentication } from "../../../components/WithAuthentication";
import { addNewArticle } from "../../../lib/Firebase/firebaseClientAPIs";

import styles from "../../../styles/Article.module.css";

const NewArticlePage = () => (
  <>
    <Head>
      <title>readme - ny artikkel</title>
    </Head>
    <WithAuthentication>
      <Fade appear in>
        <div className={styles.container}>
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
      </Fade>
    </WithAuthentication>
  </>
);

export default NewArticlePage;
