import { axiosBaseApi, VETERAN_TAG } from "@/shared/api";
import { normalizeVeteran } from "../lib/normalizeVeteran";
import { VeteranDto } from "./types";
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
    createVeteran: build.mutation<Veteran, Omit<VeteranDto, "id">>({
      query: (body) => ({
        url: `/veterans`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [VETERAN_TAG],
      transformResponse: (response: VeteranDto) => normalizeVeteran(response),
    }),
  }),
});

export const { useGetVeteransQuery, useCreateVeteranMutation } = veteranApi;
