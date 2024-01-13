import { API_URL } from "../config";
import { axiosBaseQuery } from "./axiosBaseQuery";
import {
  BASKET_TAG,
  BINDDINGS_TAG,
  DOCUMENTS_TAG,
  SESSION_TAG,
  VETERAN_TAG,
} from "./tags";
import { createApi } from "@reduxjs/toolkit/query/react";

export const axiosBaseApi = createApi({
  endpoints: () => ({}),
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  reducerPath: "api",
  tagTypes: [
    SESSION_TAG,
    DOCUMENTS_TAG,
    BINDDINGS_TAG,
    VETERAN_TAG,
    BASKET_TAG,
  ],
});
