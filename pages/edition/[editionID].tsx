import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getEditionIDs } from "../../lib/Firebase/firebaseServersideAPIs";

export const getStaticPaths: GetStaticPaths = async () => {
  const IDs = await getEditionIDs(true);

  const paths = IDs.map((id) => ({ params: { editionID: id } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  return { props: { editionID: params?.editionID } };
};

const EditionPage = ({ editionID }: { editionID: string }) => {
  const year = editionID.split("-")[0];

  const editionURL = `${
    process.env.NODE_ENV === "production"
      ? "https://storage.googleapis.com"
      : "http://localhost:9199"
  }/readme-arkiv.appspot.com/pdf/${year}/${editionID}.pdf`;

  return (
    <>
      <Head>
        <title>readme - {editionID}</title>
      </Head>
      <object
        style={{ position: "fixed", height: "100vh", width: "100vw" }}
        data={editionURL}
        type="application/pdf"
      />
    </>
  );
};

export default EditionPage;
