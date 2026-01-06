import { connectSearchBox } from "react-instantsearch-dom";
import { SearchBoxProvided } from "react-instantsearch-core";
import { FC } from "react";
import { Input } from "@heroui/react";

// Component is hydration un-safe since theme cannot be known at build time
// We prevent component render until we've mounted the component on the client
const PlainSearchBox: FC<SearchBoxProvided> = ({
  currentRefinement,
  refine,
  isSearchStalled,
}) => {
  return (
    <Input
      isClearable
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
      onClear={() => refine("")}
      className="max-w-[300px] w-full"
      placeholder="Skriv for å søke ..."
      startContent={<span className="material-symbols-rounded md">search</span>}
    />
  );
};

export const SearchBox = connectSearchBox(PlainSearchBox);
