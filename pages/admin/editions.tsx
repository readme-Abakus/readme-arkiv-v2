import { NextPage } from "next";
import Head from "next/head";
import { DeleteButton } from "../../components/Admin/Common/DeleteButton";
import { WithAuthentication } from "../../components/WithAuthentication";
import { deleteEdition, getEditions } from "../../lib/Firebase/firebaseAPIs";
import { IEditionData } from "../../lib/types";

import styles from "../../styles/Editions.module.css";

export async function getStaticProps() {
  return {
    props: {
      editionData: await getEditions(true),
    },
  };
}

const Editions: NextPage<{ editionData: IEditionData[] }> = ({
  editionData,
}) => {
  return (
    <WithAuthentication>
      <Head>
        <title>readme - utgaver</title>
      </Head>
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
    </WithAuthentication>
  );
};

export default Editions;
