import { NextPage } from "next";
import Head from "next/head";
import { AppTable } from "../components/Table";
import { SearchBox } from "../components/SearchBox";
import { InstantSearch, PoweredBy } from "react-instantsearch-dom";

import algoliasearch from "algoliasearch/lite";

import "instantsearch.css/themes/reset.css";

import styles from "../styles/Search.module.css";
import { Fade } from "react-bootstrap";

const searchClient = algoliasearch(
  "K9OSMLFRD3",
  "e9162c9f16b6ca303aa413e062713697"
);

const Search: NextPage = () => {
  return (
    <>
      <Head>
        <title>readme - søk</title>
      </Head>
      <Fade appear in>
        <div>
          <h1>Artikkelsøk</h1>
          <InstantSearch searchClient={searchClient} indexName="Articles">
            <SearchBox />
            <AppTable />
            <PoweredBy
              translations={{
                searchBy: "Søk levert av ",
              }}
              className={styles.poweredBy}
            />
          </InstantSearch>
        </div>
      </Fade>
    </>
  );
};

export default Search;
