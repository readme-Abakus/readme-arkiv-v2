import type { NextPage } from "next";
import Head from "next/head";
import { EditionYear } from "../components/EditionYear";
import { getEditions } from "../lib/Firebase/firebaseAPIs";
import { IEditionData } from "../lib/types";

export async function getStaticProps() {
  return {
    props: {
      editionData: await getEditions(),
    },
  };
}

const Home: NextPage<{ editionData: IEditionData[] }> = ({ editionData }) => {
  console.log(editionData);
  return (
    <>
      <Head>
        <title>readme - arkiv</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {editionData.map((data) => (
          <EditionYear key={data.year} data={data} />
        ))}
      </div>
    </>
  );
};

export default Home;
