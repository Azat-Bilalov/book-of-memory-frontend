import { DocumentDto, DocumentListDto } from "../api/types";

export const normalizeDocument = (document: DocumentDto) => ({
  id: document.document_id,
  title: document.title,
  description: document.description,
  imageUrl: document.image_url,
});

export const normalizeDocumentList = (documentList: DocumentListDto) => ({
  documents: documentList.documents.map(normalizeDocument),
  enteredBindingId: documentList.entered_binding_id,
});
