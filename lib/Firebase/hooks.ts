import {
  collection,
  DocumentData,
  endBefore,
  limit,
  limitToLast,
  orderBy,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  startAfter,
  WithFieldValue,
} from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { IArticle } from "../types";
import { db } from "./firebase";

const articleConverter = {
  toFirestore(post: WithFieldValue<IArticle>): DocumentData {
    return post;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): IArticle {
    const data = snapshot.data(options)!;
    return { ...data, id: snapshot.id } as IArticle;
  },
};

const firstField = "edition";
const secondField = "pages";
const pageSize = 20;
const baseQuery = [orderBy(firstField, "desc"), orderBy(secondField, "desc")];

export const useArticleList = () => {
  const [dynamicQuery, setQuery] = useState([...baseQuery, limit(pageSize)]);

  const [data, loading, error] = useCollectionData<IArticle>(
    query<IArticle>(
      collection(db, "articles").withConverter(articleConverter),
      ...dynamicQuery
    )
  );

  const [pageNum, setPageNum] = useState(0);

  const prevPage = () => {
    if (pageNum - 1 < 0 || !data) return;

    const first = data[0];
    setPageNum(pageNum - 1);
    setQuery([
      ...baseQuery,
      endBefore(first[firstField], first[secondField]),
      limitToLast(pageSize),
    ]);
  };

  const nextPage = () => {
    if (!data) return;

    const last = data[data.length - 1];
    setPageNum(pageNum + 1);
    setQuery([
      ...baseQuery,
      startAfter(last[firstField], last[secondField]),
      limit(pageSize),
    ]);
  };

  return [data, loading, error, pageNum, nextPage, prevPage] as const;
};
