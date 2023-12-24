import { documentApi } from "@/entities/document/api";
import { createSlice } from "@reduxjs/toolkit";
import { BindingSliceState } from "./types";

const initialState: BindingSliceState = {
  dateTo: "",
  dateFrom: "",
  status: "",
  enteredBindingId: null,
};

export const bindingSlice = createSlice({
  name: "binding",
  initialState,
  reducers: {
    setDateTo: (state, action) => {
      state.dateTo = action.payload;
    },
    setDateFrom: (state, action) => {
      state.dateFrom = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      documentApi.endpoints.getDocuments.matchFulfilled,
      (state, { payload }) => {
        state.enteredBindingId = payload.enteredBindingId;
      }
    );
  },
});

export const { setDateFrom, setDateTo, setStatus } = bindingSlice.actions;

export const { reducer: bindingReducer } = bindingSlice;
