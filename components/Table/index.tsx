import { FC } from "react";
import { Table, Fade, Button } from "react-bootstrap";
import {
  connectInfiniteHits,
  connectStateResults,
  InfiniteHitsProvided,
  StateResultsProvided,
} from "react-instantsearch-core";
import { useTheme } from "next-themes";
import { ROUTES } from "../../utils/routes";

import styles from "./Table.module.css";
import Link from "next/link";

const parseTags = (tags: Array<string> | string) => {
  if (Array.isArray(tags)) {
    return tags.join(", ");
  } else {
    return tags;
  }
};

// This is a temporary hack since the pages list isnt indexed in algolia
const getPageNumber = (url: string) => {
  return url.split("=").at(-1);
};

const SearchTable: FC<InfiniteHitsProvided & StateResultsProvided> = ({
  hits,
  refineNext,
  hasMore,
  searchState,
}) => {
  const { theme } = useTheme();
  return (
    <>
      {searchState && searchState.query ? (
        <Fade in appear>
          <div>
            <Table
              striped
              bordered
              hover
              variant={theme}
              responsive="lg"
              className={styles.searchTable}
            >
              <thead>
                <tr>
                  <th>Utgave</th>
                  <th>Tittel</th>
                  <th>Forfatter</th>
                  <th>Layout</th>
                  <th>Spalte</th>
                  <th>Stikkord</th>
                </tr>
              </thead>
              <tbody>
                {hits.map((hit) => (
                  <tr key={hit._id}>
                    <td>
                      <Link
                        href={
                          ROUTES.EDITION.replace(":id", hit.edition) +
                          `#page=${getPageNumber(hit.url)}`
                        }
                      >
                        <a target="_blank" rel="noopener noreferrer">
                          {hit.edition}
                        </a>
                      </Link>
                    </td>
                    <td>{hit.title}</td>
                    <td>{hit.author}</td>
                    <td>{hit.layout}</td>
                    <td>{hit.type}</td>
                    <td>{parseTags(hit.tags)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {hasMore && (
              <Button className={styles.showMore} onClick={refineNext}>
                Vis mer
              </Button>
            )}
          </div>
        </Fade>
      ) : null}
    </>
  );
};

export const AppTable = connectInfiniteHits(connectStateResults(SearchTable));
