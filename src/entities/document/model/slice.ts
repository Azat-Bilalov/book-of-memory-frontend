import { createSlice } from "@reduxjs/toolkit";

type DocumentSliceState = {
  query: string;
};

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

export const selectQuery = (state: { document: DocumentSliceState }) =>
  state.document.query;

export const { setQuery } = documentSlice.actions;

export const { reducer: documentReducer } = documentSlice;
