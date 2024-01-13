import { axiosBaseApi, VETERAN_TAG } from "@/shared/api";
import { normalizeVeteran } from "../lib/normalizeVeteran";
import {
  CreateVeteranRequest,
  UpdateVeteranRequest,
  VeteranDto,
} from "./types";
import { Veteran } from "../model/types";

export const veteranApi = axiosBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getVeterans: build.query<Veteran[], { name: string }>({
      query: (params) => ({
        url: `/veterans`,
        method: "GET",
        params,
      }),
      providesTags: [VETERAN_TAG],
      transformResponse: (response: VeteranDto[]) =>
        response.map((veteran) => normalizeVeteran(veteran)),
    }),
    getVeteran: build.query<Veteran, string>({
      query: (id) => ({
        url: `/veterans/${id}`,
        method: "GET",
      }),
      providesTags: [VETERAN_TAG],
      transformResponse: (response: VeteranDto) => normalizeVeteran(response),
    }),
    createVeteran: build.mutation<Veteran, Omit<CreateVeteranRequest, "id">>({
      query: (body) => ({
        url: `/veterans`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [VETERAN_TAG],
      transformResponse: (response: VeteranDto) => normalizeVeteran(response),
    }),
    updateVeteran: build.mutation<
      Veteran,
      { id: string; body: UpdateVeteranRequest }
    >({
      query: ({ id, body }) => ({
        url: `/veterans/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: [VETERAN_TAG],
      transformResponse: (response: VeteranDto) => normalizeVeteran(response),
    }),
    deleteVeteran: build.mutation<void, string>({
      query: (id) => ({
        url: `/veterans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [VETERAN_TAG],
    }),
  }),
});

export const {
  useGetVeteransQuery,
  useCreateVeteranMutation,
  useGetVeteranQuery,
  useUpdateVeteranMutation,
  useDeleteVeteranMutation,
} = veteranApi;
