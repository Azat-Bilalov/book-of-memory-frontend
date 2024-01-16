import { DocumentModel, normalizeDocument } from "../models";
import { API_URL } from "@/shared/config";
import { DOCUMENTS_MOCK } from "./__mock__";

export async function fetchDocuments(
  title: string | null = null
): Promise<DocumentModel[]> {
  try {
    let response;

    if (title) {
      response = await fetch(`${API_URL}/documents?title=${title}`);
    } else {
      response = await fetch(`${API_URL}/documents`);
    }

    const { documents } = await response.json();

    return documents.map(normalizeDocument);
  } catch {
    return DOCUMENTS_MOCK.map(normalizeDocument);
  }
}

export async function fetchDocument(id: string): Promise<DocumentModel> {
  let document;
  try {
    const response = await fetch(`${API_URL}/documents/${id}`);
    document = await response.json();
  } catch {
    document = DOCUMENTS_MOCK.find((d) => d.document_id === id);
  }

  if (!document) {
    throw new Error(`Document with id ${id} not found`);
  }

  return normalizeDocument(document);
}
