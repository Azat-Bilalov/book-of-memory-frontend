export type DocumentResponse = {
  documents: DocumentApi[];
  entered_binding_id: string;
};

export type DocumentApi = {
  document_id: string;
  title: string;
  description: string;
  image_url: string;
};

export type DocumentModel = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export const normalizeDocument = (document: DocumentApi): DocumentModel => ({
  id: document.document_id,
  title: document.title,
  description: document.description,
  imageUrl: document.image_url,
});
