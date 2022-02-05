import { DocumentReference } from "firebase/firestore";

export interface IEdition {
  pdfUrl: string;
  imageUrl: string;
  edition: string;
}

export interface IEditionData {
  year: number;
  editions: IEdition[];
}

export interface IArticle {
  author: string;
  title: string;
  content: string;
  edition: string;
  layout: string;
  pages: number[];
  photo: string;
  tags: string[];
  type: string;
  url: string;
  _id?: string;
}
export interface IArticleListData {
  id: string;
  data: IArticle;
  ref: DocumentReference;
}
