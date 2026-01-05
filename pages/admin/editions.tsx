import { NextPage } from "next";
import Head from "next/head";
import { WithAuthentication } from "../../components/WithAuthentication";

import { getEditions } from "../../lib/Firebase/firebaseServersideAPIs";
import { IEditionData } from "../../lib/types";
import EditionsOverview from "../../components/Admin/Editions";

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
        <EditionsOverview editionData={editionData} />
      </WithAuthentication>
    </>
  );
};

export default Editions;
