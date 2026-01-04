import Head from "next/head";
import { AppTable } from "../components/Table";
import { SearchBox } from "../components/SearchBox";
import { InstantSearch, PoweredBy } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/reset.css";

const searchClient = algoliasearch(
  "K9OSMLFRD3",
  "e9162c9f16b6ca303aa413e062713697"
);

const Search = () => {
  return (
    <>
      <Head>
        <title>readme - søk</title>
      </Head>
      <div className="flex flex-col items-center gap-[20px] w-full">
        <h1 className="text-2xl font-bold text-default-foreground">
          Artikkelsøk
        </h1>
        <InstantSearch searchClient={searchClient} indexName="Articles">
          <SearchBox />
          <AppTable />
          <PoweredBy
            url=""
            translations={{
              searchBy: "Søk levert av ",
            }}
            className="text-sm mt-[15px] gap-[8px] dark:[&>a]:bg-white dark:[&>a]:rounded-full dark:[&>a]:px-[8px] dark:[&>a]:py-[4px]"
          />
        </InstantSearch>
      </div>
    </>
  );
};

export default Search;
