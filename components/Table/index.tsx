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

// This is a temporary hack since the pages list isnt indexed in algolia
const getPageNumber = (url: string) => {
  return url.split("=").at(-1);
};

const SearchTable: FC<InfiniteHitsProvided & StateResultsProvided> = ({
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
            // removeWrapper
            // className="bg-transparent border-none"
            classNames={{
              wrapper: "shadow-none",
            }}
            bottomContent={
              hasMore && (
                <div className="flex w-full justify-center">
                  <Button variant="solid" color="primary" onPress={refineNext} isLoading={searching}>
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
              <TableColumn>Layout</TableColumn>
              <TableColumn>Spalte</TableColumn>
              <TableColumn>Stikkord</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Ingen artikler funnet.">
              {hits.map((hit, i) => 
                  (
                  <TableRow key={i}>
                    <TableCell>
                      <Link
                        className="text-nowrap"
                        href={
                          ROUTES.EDITION.replace(":id", hit.edition) +
                          `#page=${getPageNumber(hit.url)}`
                        }
                      >
                        {hit.edition}
                      </Link>
                    </TableCell>
                    <TableCell className="font-bold">{hit.title}</TableCell>
                    <TableCell>{hit.author}</TableCell>
                    <TableCell>{hit.layout}</TableCell>
                    <TableCell>{hit.type}</TableCell>
                    <TableCell>
                      <div className="flex gap-[5px] flex-wrap">
                        {(Array.isArray(hit.tags)? hit.tags : [hit.tags]).map(
                          (tag: string, i: number) =>
                            tag && tag.trim() && (
                              <Tooltip
                                content={tag}
                                delay={500}
                                color="danger"
                              >
                              <Chip
                                key={i}
                                size="sm"
                                variant={"flat"}
                                color="primary"
                                className="[&>*]:overflow-hidden [&>*]:max-w-[100px] [&>*]:text-ellipsis"
                                
                                >
                                {tag}
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

export const AppTable = connectInfiniteHits(connectStateResults(SearchTable));
