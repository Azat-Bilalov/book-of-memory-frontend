import {
  DocumentApi,
  DocumentModel,
  normalizeDocument,
} from "@/entities/document/model";
import {
  VeteranApi,
  VeteranModel,
  normalizeVeteran,
} from "@/entities/veteran/model";

export type BindingSliceState = {
  dateTo: string;
  dateFrom: string;
  status: string;
  nameFilter: string;
  enteredBindingId: number | null;
  createdAt: string | null;
  selectedVeteranId: string | null;
  documentsInBasket: DocumentModel[];
  createdBindings: BindingModel[];
};

export type BindingApi = {
  id: number;
  status: string;
  createdAt: string;
  formattedAt: string;
  endedAt: string;
  documents?: DocumentApi[];
  veteran?: VeteranApi;
};

export type BindingModel = {
  id: number;
  status: string;
  createdAt: string;
  formattedAt: string;
  endedAt: string;
  documents?: DocumentModel[];
  veteran?: VeteranModel;
};

export const normalizeBinding = (from: BindingApi): BindingModel => {
  return {
    id: from.id,
    status: from.status,
    createdAt: from.createdAt,
    formattedAt: from.formattedAt,
    endedAt: from.endedAt,
    documents: from.documents?.map(normalizeDocument),
    veteran: from.veteran && normalizeVeteran(from.veteran),
  };
};
