import { createSlice } from "@reduxjs/toolkit";
import { VeteranSliceState } from "./types";

const initialState: VeteranSliceState = {
  query: "",
};

export const veteranSlice = createSlice({
  name: "veteran",
  initialState,
  reducers: {
    setQuery: (state, { payload }) => {
      state.query = payload;
    },
  },
});

export const { setQuery } = veteranSlice.actions;

export const { reducer: veteranReducer } = veteranSlice;
