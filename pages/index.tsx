import type { NextPage } from "next";
import Head from "next/head";
import { EditionYear } from "../components/EditionYear";
import { getEditions } from "../lib/Firebase/firebaseServersideAPIs";
import { IEditionData } from "../lib/types";

export async function getStaticProps() {
  return {
    props: {
      editionData: await getEditions(true),
    },
  };
}

const Home: NextPage<{ editionData: IEditionData[] }> = ({ editionData }) => {
  return (
    <>
      <Head>
        <title>readme - arkiv</title>
        <meta name="description" content="Linjeforeningsmagasinet readme" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {editionData.map((data) => (
        <EditionYear key={data.year} data={data} />
      ))}
    </>
  );
};

export default Home;
