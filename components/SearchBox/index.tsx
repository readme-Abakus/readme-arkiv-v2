import { connectSearchBox } from "react-instantsearch-dom";
import { SearchBoxProvided } from "react-instantsearch-core";
import { FC, useEffect, useState } from "react";
import { Input, Spinner } from "@heroui/react";

// Component is hydration un-safe since theme cannot be known at build time
// We prevent component render until we've mounted the component on the client
const PlainSearchBox: FC<SearchBoxProvided> = ({
  currentRefinement,
  refine,
  isSearchStalled,
}) => {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

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
