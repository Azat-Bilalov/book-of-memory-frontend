import {
  axiosBaseApi,
  BASKET_TAG,
  BINDDINGS_TAG,
  SESSION_TAG,
} from "@/shared/api";
import { normalizeBinding } from "../lib/normalizeBinding";
import { BindingDto, QueryParams } from "./types";
import { Binding } from "../model/types";

export const bindingApi = axiosBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getBindings: build.query<Binding[], QueryParams>({
      query: ({ date_from, date_to, status }) => ({
        url: `/bindings`,
        method: "GET",
        params: {
          date_from: date_from ? date_from + " 00:00:00" : undefined,
          date_to: date_to ? date_to + " 23:59:59" : undefined,
          status,
        },
      }),
      providesTags: [BINDDINGS_TAG, BASKET_TAG, SESSION_TAG],
      transformResponse: (response: BindingDto[]) =>
        response.map((binding) => normalizeBinding(binding)),
    }),
    getBinding: build.query<Binding, string>({
      query: (id) => ({
        url: `/bindings/${id}`,
        method: "GET",
      }),
      providesTags: [BINDDINGS_TAG, SESSION_TAG],
      transformResponse: (response: BindingDto) => normalizeBinding(response),
    }),
    updateBinding: build.mutation<
      Binding,
      { bindingId: string; veteranId: string }
    >({
      query: ({ bindingId, veteranId }) => ({
        url: `/bindings/${bindingId}`,
        method: "PUT",
        data: { veteran_id: veteranId },
      }),
      invalidatesTags: [BINDDINGS_TAG, BASKET_TAG],
      transformResponse: (response: BindingDto) => normalizeBinding(response),
    }),
    submitBinding: build.mutation<void, string>({
      query: (id) => ({
        url: `/bindings/${id}/submit`,
        method: "PUT",
      }),
      invalidatesTags: [BINDDINGS_TAG, BASKET_TAG],
    }),
    acceptRejectBinding: build.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/bindings/${id}/accept-reject`,
        method: "PUT",
        data: { status },
      }),
      invalidatesTags: [BINDDINGS_TAG, BASKET_TAG],
    }),
    deleteBinding: build.mutation<void, string>({
      query: (id) => ({
        url: `/bindings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [BINDDINGS_TAG, BASKET_TAG],
    }),
  }),
});

export const {
  useGetBindingsQuery,
  useGetBindingQuery,
  useUpdateBindingMutation,
  useSubmitBindingMutation,
  useAcceptRejectBindingMutation,
  useDeleteBindingMutation,
} = bindingApi;
