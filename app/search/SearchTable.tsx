import { FC } from "react";
import {
  connectInfiniteHits,
  connectStateResults,
  InfiniteHitsProvided,
  StateResultsProvided,
} from "react-instantsearch-core";
import { ROUTES } from "../../utils/routes";
import {
  Button,
  Chip,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { readmeIfy } from "@/components/ReadmeLogo";

// This is a temporary hack since the pages list isnt indexed in algolia
const getPageNumber = (url: string) => {
  return url.split("=").at(-1);
};

const SearchTableComponent: FC<InfiniteHitsProvided & StateResultsProvided> = ({
  hits,
  refineNext,
  hasMore,
  searchState,
  searching,
}) => {
  return (
    <>
      {searchState && searchState.query ? (
        <Table
          isStriped
          aria-label="Search results"
          classNames={{
            wrapper: "shadow-none p-0 rounded-sm",
          }}
          bottomContent={
            hasMore && (
              <div className="flex w-full justify-center">
                <Button
                  variant="solid"
                  color="primary"
                  onPress={refineNext}
                  isLoading={searching}
                >
                  Vis mer
                </Button>
              </div>
            )
          }
        >
          <TableHeader>
            <TableColumn>Utgave</TableColumn>
            <TableColumn>Tittel</TableColumn>
            <TableColumn>Forfatter</TableColumn>
            <TableColumn className="rounded-e-lg sm:rounded-none">
              Layout
            </TableColumn>
            <TableColumn className="hidden md:table-cell">Spalte</TableColumn>
            <TableColumn className="hidden sm:table-cell">Stikkord</TableColumn>
          </TableHeader>
          <TableBody emptyContent="Ingen artikler funnet.">
            {hits.map((hit, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Link
                    className="text-nowrap"
                    href={
                      ROUTES.EDITION.replace(":id", hit.edition) +
                      `#page=${getPageNumber(hit.url)}`
                    }
                    size="sm"
                  >
                    {hit.edition}
                  </Link>
                </TableCell>
                <TableCell className="font-bold">
                  {readmeIfy(hit.title)}
                </TableCell>
                <TableCell>{readmeIfy(hit.author)}</TableCell>
                <TableCell className="before:rounded-e-lg sm:before:rounded-none">
                  {readmeIfy(hit.layout)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {hit.type}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex gap-[5px] flex-wrap">
                    {(Array.isArray(hit.tags) ? hit.tags : [hit.tags]).map(
                      (tag: string, i: number) =>
                        tag &&
                        tag.trim() && (
                          <Tooltip
                            content={readmeIfy(tag)}
                            delay={500}
                            color="danger"
                            key={i}
                          >
                            <Chip
                              size="sm"
                              variant={"flat"}
                              color="primary"
                              className="[&>*]:overflow-hidden [&>*]:max-w-[100px] [&>*]:text-ellipsis"
                            >
                              {readmeIfy(tag)}
                            </Chip>
                          </Tooltip>
                        )
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </>
  );
};

export const SearchTable = connectInfiniteHits(
  connectStateResults(SearchTableComponent)
);
