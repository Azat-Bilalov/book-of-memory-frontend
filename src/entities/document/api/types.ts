export type DocumentDto = {
  document_id: string;
  title: string;
  description: string;
  image_url: string;
  createdAt: string;
  updatedAt: string;
};

export type DocumentListDto = {
  documents: DocumentDto[];
  entered_binding_id: string;
};
