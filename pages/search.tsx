import { FC } from "react";
import { AppTable } from "../components/Table";
import { SearchBox } from "../components/SearchBox";
import { InstantSearch, PoweredBy } from "react-instantsearch-dom";

import algoliasearch from "algoliasearch/lite";

import "instantsearch.css/themes/reset.css";

import styles from "./Search.module.css";

const searchClient = algoliasearch(
  "K9OSMLFRD3",
  "e9162c9f16b6ca303aa413e062713697"
);

const Search: FC = () => {
  return (
    <>
      <h1>Artikkelsøk</h1>
      <InstantSearch searchClient={searchClient} indexName="Articles">
        <SearchBox />
        <AppTable />
        <PoweredBy
          translations={{
            searchBy: "Søk levert av",
          }}
          className={styles.poweredBy}
        />
      </InstantSearch>
    </>
  );
};

export default Search;
