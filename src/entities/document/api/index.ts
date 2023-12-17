import { axiosBaseApi, BINDDINGS_TAG, DOCUMENTS_TAG } from "@/shared/api";
import {
  normalizeDocument,
  normalizeDocumentList,
} from "../lib/normalizeDocument";
import { DocumentDto, DocumentListDto } from "./types";
import { Document, DocumentList } from "../model/types";

export const documentApi = axiosBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getDocuments: build.query<DocumentList, string>({
      query: (title) => ({
        url: `/documents`,
        method: "GET",
        params: { title },
      }),
      providesTags: [DOCUMENTS_TAG],
      transformResponse: (response: DocumentListDto) =>
        normalizeDocumentList(response),
    }),
    getDocument: build.query<Document, string>({
      query: (id) => ({
        url: `/documents/${id}`,
        method: "GET",
      }),
      providesTags: [DOCUMENTS_TAG],
      transformResponse: (response: DocumentDto) => normalizeDocument(response),
    }),
    AddDocumentToBinding: build.mutation<void, string>({
      query: (id) => ({
        url: `/documents/${id}/binding`,
        method: "POST",
      }),
      invalidatesTags: [DOCUMENTS_TAG, BINDDINGS_TAG],
    }),
    DeleteDocumentFromBinding: build.mutation<void, string>({
      query: (id) => ({
        url: `/documents/${id}/binding`,
        method: "DELETE",
      }),
      invalidatesTags: [DOCUMENTS_TAG, BINDDINGS_TAG],
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentQuery,
  useAddDocumentToBindingMutation,
  useDeleteDocumentFromBindingMutation,
} = documentApi;
