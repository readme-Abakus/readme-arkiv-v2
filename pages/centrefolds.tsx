import type { NextPage } from "next";
import Head from "next/head";
import { Fade } from "react-bootstrap";
import { getEditions } from "../lib/Firebase/firebaseServersideAPIs";
import { IEditionData, ICentreFoldYearProps } from "../lib/types";
import dynamic from "next/dynamic";

const CentrefoldYear = dynamic<ICentreFoldYearProps>(
    () => import("../components/CentrefoldYear"),
    { ssr: false }
);

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
                <meta
                    name="description"
                    content="Linjeforeningsmagasinet readme"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Fade appear in>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {editionData.map((data) => (
                        <CentrefoldYear key={data.year} data={data} />
                    ))}
                </div>
            </Fade>
        </>
    );
};

export default Home;
