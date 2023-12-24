import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { RequestError } from "./types";
import { getAuthorizationToken } from "../lib";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    RequestError
  > =>
  async ({ url, method, data, params, headers }) => {
    const token = getAuthorizationToken();

    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...(token ? { Authorization: token } : {}),
          ...headers,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      if (err.response?.status === 401) {
        localStorage.removeItem("session");
        window.location.reload();
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
