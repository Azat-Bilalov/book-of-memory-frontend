export type DocumentResponse = {
  documents: DocumentApi[];
  entered_binding_id: string;
};

export type DocumentApi = {
  Document_id: string;
  Title: string;
  Description: string;
  Image_url: string;
};

export type DocumentModel = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export const normalizeDocument = (document: DocumentApi): DocumentModel => ({
  id: document.Document_id,
  title: document.Title,
  description: document.Description,
  imageUrl: document.Image_url,
});
