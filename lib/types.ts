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
  id: string;
}

export interface ISettings {
  showListing: boolean;
}
