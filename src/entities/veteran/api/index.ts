import { VeteranModel, normalizeVeteran } from "../model";
import { VETERANS_MOCK } from "./__mock__";

export async function fetchVeterans(): Promise<VeteranModel[]> {
  return VETERANS_MOCK.map(normalizeVeteran);
}

export async function fetchDocument(id: string): Promise<VeteranModel> {
  const document = VETERANS_MOCK.find((v) => v.veteran_id === id);

  if (!document) {
    throw new Error(`Document with id ${id} not found`);
  }

  return normalizeVeteran(document);
}
