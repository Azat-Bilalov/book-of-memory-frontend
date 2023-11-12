import { DocumentModel, normalizeDocument } from "../models";
import { API_URL } from "@/shared/config";

export async function fetchDocuments(
  title: string | null = null
): Promise<DocumentModel[]> {
  let response;

  if (title) {
    response = await fetch(`${API_URL}/documents?title=${title}`);
  } else {
    response = await fetch(`${API_URL}/documents`);
  }

  const { documents } = await response.json();

  return documents.map(normalizeDocument);
}

export async function fetchDocument(id: string): Promise<DocumentModel> {
  const response = await fetch(`${API_URL}/documents/${id}`);
  const document = await response.json();

  if (!document) {
    throw new Error(`Document with id ${id} not found`);
  }

  return normalizeDocument(document);
}
