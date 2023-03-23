import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { IEditionData, ICentreFoldYearProps } from "../../lib/types";
import { ROUTES } from "../../utils/routes";
import { Document, Page, pdfjs } from "react-pdf";
import { getPDFDownloadURL } from "../../lib/Firebase/firebaseClientAPIs";

import styles from "./centrefoldyear.module.scss";
import workerSrc from "../../pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const CentrefoldYear: FC<{ data: IEditionData }> = (
    props: ICentreFoldYearProps
) => {
    function onDocumentLoadProgress({
        loaded,
        total,
    }: {
        loaded: number;
        total: number;
    }) {
        console.log(`Loaded ${loaded} of ${total}`);
    }
    if (
        !props.data.editions.some(
            (edition) =>
                getCentrefoldPages(props.data.year, edition.edition).length > 0
        )
    )
        return <div />;
    return (
        <div className={styles.container}>
            <h2>{props.data.year}</h2>
            <hr />
            <div className={styles.centrefoldsContainer}>
                {props.data.editions.map((edition) => (
                    <Document
                        key={`${props.data.year}-${edition.edition}`}
                        file={getPDFDownloadURL(
                            `${props.data.year}`,
                            `${props.data.year}-${edition.edition}`
                        )}
                        className={styles.singleCentrefoldContainer}
                        loading={<p>Laster inn midtside for deg ;)</p>}
                    >
                        {getCentrefoldPages(
                            props.data.year,
                            edition.edition
                        ).map((page) => (
                            <Page
                                key={`${props.data.year}-${edition.edition}-${page}`}
                                pageNumber={page}
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                                onLoadError={(error) => {
                                    console.log(error);
                                }}
                                rotate={rotation(
                                    props.data.year,
                                    edition.edition
                                )}
                                scale={0.3}
                                loading={<p />}
                            />
                        ))}
                    </Document>
                ))}
            </div>
            <hr />
        </div>
    );
};

//this should be done dynamically, but I'm too lazy to do it right now
const getCentrefoldPages = (year: number, edition: string) => {
    let pages: Array<number> = [];
    if (year > 2012) pages = [8];
    let deviations: { [key: string]: Array<number> } = {
        "2017-02": [11],
        "2013-05": [14, 15],
        "2013-04": [14, 15],
        "2013-03": [14, 15],
        "2013-02": [14, 15],
        "2013-01": [14, 15],
        "2012-06": [14],
        "2012-04": [14, 15],
        "2012-03": [14, 15],
        "2009-03": [11],
        "2006-01": [13],
        "2005-06": [13],
        "2005-05": [13],
        "2005-04": [13],
        "2005-02": [11],
        "2005-01": [11],
        "2004-05": [11],
        "2004-04": [11],
        "2003-04": [11],
    };
    if (`${year}-${edition}` in deviations) {
        pages = deviations[`${year}-${edition}`];
    }
    return pages;
};

const rotation = (year: number, edition: string): number => {
    return ["2004-05"].includes(`${year}-${edition}`) ? 90 : 0;
};

export default CentrefoldYear;
