import { connectSearchBox } from "react-instantsearch-dom";
import { SearchBoxProvided } from "react-instantsearch-core";
import { FC } from "react";
import { Input, Spinner } from "@heroui/react";

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
      className="w-[300px]"
      placeholder="Skriv for å søke ..."
      startContent={
        <span className="material-symbols-outlined md">search</span>
      }
    />
  );
};

export const SearchBox = connectSearchBox(PlainSearchBox);
