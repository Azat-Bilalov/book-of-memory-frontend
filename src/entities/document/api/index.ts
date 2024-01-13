import {
  axiosBaseApi,
  BASKET_TAG,
  BINDDINGS_TAG,
  DOCUMENTS_TAG,
  SESSION_TAG,
} from "@/shared/api";
import {
  normalizeDocument,
  normalizeDocumentList,
} from "../lib/normalizeDocument";
import {
  CreateDocumentRequest,
  DocumentDto,
  DocumentListDto,
  UpdateDocumentRequest,
} from "./types";
import { Document, DocumentList } from "../model/types";

export const documentApi = axiosBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getDocuments: build.query<DocumentList, string>({
      query: (title) => ({
        url: `/documents`,
        method: "GET",
        params: { title },
      }),
      providesTags: [DOCUMENTS_TAG, SESSION_TAG, BASKET_TAG],
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
    CreateDocument: build.mutation<Document, CreateDocumentRequest>({
      query: (body) => ({
        url: `/documents`,
        method: "POST",
        data: body,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [DOCUMENTS_TAG],
      transformResponse: (response: DocumentDto) => normalizeDocument(response),
    }),
    UpdateDocument: build.mutation<
      Document,
      { id: string; body: UpdateDocumentRequest }
    >({
      query: ({ id, body }) => ({
        url: `/documents/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: [DOCUMENTS_TAG],
      transformResponse: (response: DocumentDto) => normalizeDocument(response),
    }),
    DeleteDocument: build.mutation<void, string>({
      query: (id) => ({
        url: `/documents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [DOCUMENTS_TAG],
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentQuery,
  useAddDocumentToBindingMutation,
  useDeleteDocumentFromBindingMutation,
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
} = documentApi;
