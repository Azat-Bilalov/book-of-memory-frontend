import { axiosBaseApi, BASKET_TAG, BINDDINGS_TAG } from "@/shared/api";
import { normalizeBinding } from "../lib/normalizeBinding";
import { BindingDto, QueryParams } from "./types";
import { Binding } from "../model/types";

export const bindingApi = axiosBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getBindings: build.query<Binding[], QueryParams>({
      query: (params) => ({
        url: `/bindings`,
        method: "GET",
        params,
      }),
      providesTags: [BINDDINGS_TAG],
      transformResponse: (response: BindingDto[]) =>
        response.map((binding) => normalizeBinding(binding)),
    }),
    getBinding: build.query<Binding, string>({
      query: (id) => ({
        url: `/bindings/${id}`,
        method: "GET",
      }),
      providesTags: [BINDDINGS_TAG],
      transformResponse: (response: BindingDto) => normalizeBinding(response),
    }),
    submitBinding: build.mutation<void, string>({
      query: (id) => ({
        url: `/bindings/${id}`,
        method: "POST",
      }),
      invalidatesTags: [BINDDINGS_TAG, BASKET_TAG],
    }),
    acceptRejectBinding: build.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/bindings/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: [BINDDINGS_TAG],
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
