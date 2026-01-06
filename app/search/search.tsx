"use client";

import { InstantSearch, PoweredBy } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import { SearchBox } from "../../components/SearchBox";
import { AppTable } from "../../components/Table";
import "instantsearch.css/themes/reset.css";
import { useEffect, useState } from "react";

const searchClient = algoliasearch(
  "K9OSMLFRD3",
  "e9162c9f16b6ca303aa413e062713697"
);

export default function Search() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <InstantSearch searchClient={searchClient} indexName="Articles">
      <SearchBox />
      <AppTable />
      {mounted && (
        <PoweredBy
          translations={{
            searchBy: "Søk levert av ",
          }}
          className="text-sm gap-[8px] dark:[&>a]:bg-white dark:[&>a]:rounded-full dark:[&>a]:px-[8px] dark:[&>a]:py-[4px]"
        />
      )}
    </InstantSearch>
  );
}
