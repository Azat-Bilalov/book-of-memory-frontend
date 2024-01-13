import { createSlice } from "@reduxjs/toolkit";
import { sessionApi } from "../api";
import { SessionSliceState } from "./types";

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
        if (
          state.isAuthorized &&
          payload.accessToken &&
          payload.role &&
          payload.firstName &&
          payload.lastName &&
          payload.userId
        ) {
          state.accessToken = payload.accessToken;
          state.role = payload.role;
          state.firstName = payload.firstName;
          state.lastName = payload.lastName;
          state.userId = payload.userId;

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
        if (
          state.isAuthorized &&
          payload.accessToken &&
          payload.role &&
          payload.firstName &&
          payload.lastName &&
          payload.userId
        ) {
          state.accessToken = payload.accessToken;
          state.role = payload.role;
          state.firstName = payload.firstName;
          state.lastName = payload.lastName;
          state.userId = payload.userId;

          // save session to localStorage
          localStorage.setItem("session", JSON.stringify(state));
        }
      }
    );
  },
});

export const { clearSessionData } = sessionSlice.actions;

export const { reducer: sessionReducer } = sessionSlice;
