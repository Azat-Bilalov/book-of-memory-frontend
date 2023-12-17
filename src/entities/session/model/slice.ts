import { createSlice } from "@reduxjs/toolkit";
import { sessionApi } from "../api";
import { RootState } from "@/app/store";
import { Role } from "./types";

type SessionSliceState =
  | {
      accessToken: string;
      isAuthorized: true;
      role: Role;
    }
  | {
      isAuthorized: false;
      accessToken?: string;
      role?: Role;
    };

const storedSession = localStorage.getItem("session");
const initialState: SessionSliceState = storedSession
  ? JSON.parse(storedSession)
  : {
      isAuthorized: false,
    };

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    clearSessionData: (state) => {
      state.accessToken = undefined;
      state.isAuthorized = false;
      state.role = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      sessionApi.endpoints.login.matchFulfilled,
      (state: SessionSliceState, { payload }) => {
        state.isAuthorized = true;

        // say TypeScript that isAuthorized = true
        if (state.isAuthorized && payload.accessToken && payload.role) {
          state.accessToken = payload.accessToken;
          state.role = payload.role;

          // save session to localStorage
          localStorage.setItem("session", JSON.stringify(state));
        }
      }
    );
    builder.addMatcher(
      sessionApi.endpoints.logout.matchFulfilled,
      (state: SessionSliceState) => {
        state.isAuthorized = false;
        state.accessToken = undefined;
        state.role = undefined;

        // remove session from localStorage
        localStorage.removeItem("session");
      }
    );
    builder.addMatcher(
      sessionApi.endpoints.register.matchFulfilled,
      (state: SessionSliceState, { payload }) => {
        state.isAuthorized = true;

        // say TypeScript that isAuthorized = true
        if (state.isAuthorized && payload.accessToken && payload.role) {
          state.accessToken = payload.accessToken;
          state.role = payload.role;

          // save session to localStorage
          localStorage.setItem("session", JSON.stringify(state));
        }
      }
    );
  },
});

export const selectUserRole = (state: RootState) => state.session.role;

export const selectIsAuthorized = (state: RootState) =>
  state.session.isAuthorized;

export const { clearSessionData } = sessionSlice.actions;

export const { reducer: sessionReducer } = sessionSlice;
