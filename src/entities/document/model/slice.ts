import { createSlice } from "@reduxjs/toolkit";
import { DocumentSliceState } from "./types";

const initialState: DocumentSliceState = {
  query: "",
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setQuery: (state, { payload }) => {
      state.query = payload;
    },
  },
});

export const { setQuery } = documentSlice.actions;

export const { reducer: documentReducer } = documentSlice;
