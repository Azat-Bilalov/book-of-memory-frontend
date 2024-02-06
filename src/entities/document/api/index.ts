import { DocumentModel, normalizeDocument } from "../model";
import { DOCUMENTS_MOCK } from "./__mock__";

export async function fetchDocuments(
  title: string | null = null
): Promise<DocumentModel[]> {
  return DOCUMENTS_MOCK.map(normalizeDocument).filter((d) =>
    d.title.toLowerCase().includes(title?.toLowerCase() ?? "")
  );
}

export function fetchDocument(id: string): DocumentModel {
  const document = DOCUMENTS_MOCK.find((d) => d.document_id === id);

  if (!document) {
    throw new Error(`Document with id ${id} not found`);
  }

  return normalizeDocument(document);
}
