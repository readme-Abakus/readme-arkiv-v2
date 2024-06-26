import { NextPage } from "next";
import Head from "next/head";
import { Fade } from "react-bootstrap";
import { DeleteButton } from "../../components/Admin/Common/DeleteButton";
import { WithAuthentication } from "../../components/WithAuthentication";

import { getEditions } from "../../lib/Firebase/firebaseServersideAPIs";
import { deleteEdition } from "../../lib/Firebase/firebaseClientAPIs";
import { IEditionData } from "../../lib/types";

import styles from "../../styles/Editions.module.css";

export async function getStaticProps() {
  return {
    props: {
      editionData: await getEditions(),
    },
  };
}

const Editions: NextPage<{ editionData: IEditionData[] }> = ({
  editionData,
}) => {
  return (
    <>
      <Head>
        <title>readme - utgaver</title>
      </Head>
      <WithAuthentication>
        <Fade appear in>
          <div className={styles.list}>
            <h1>Utgaver</h1>
            {editionData.map((year) => (
              <div key={year.year}>
                <h3>{year.year}</h3>
                {year.editions.map((edition) => (
                  <div key={edition.edition} className={styles.elementStyle}>
                    <p>{`${year.year}-${edition.edition}`}</p>
                    <DeleteButton
                      onClick={() =>
                        deleteEdition(`${year.year}-${edition.edition}`)
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Fade>
      </WithAuthentication>
    </>
  );
};

export default Editions;
