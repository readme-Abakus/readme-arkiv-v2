export interface IEdition {
  pdfUrl: string;
  imageUrl: string;
  edition: string;
}

export interface IEditionData {
  year: number;
  editions: IEdition[];
}
