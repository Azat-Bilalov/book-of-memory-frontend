import { createSlice } from "@reduxjs/toolkit";
import { BindingModel, BindingSliceState, normalizeBinding } from "./types";
import { BINDINGS_MOCK } from "../api/__mock__";
import { idGenerator } from "@/shared/lib/idGenerator";
import { VETERANS_MOCK } from "@/entities/veteran/api/__mock__";
import { normalizeVeteran } from "@/entities/veteran/model";

const initialState: BindingSliceState = {
  dateTo: "",
  dateFrom: "",
  status: "",
  nameFilter: "",
  enteredBindingId: null,
  createdAt: "",
  selectedVeteranId: null,
  documentsInBasket: [],
  createdBindings: BINDINGS_MOCK.map(normalizeBinding),
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
    setNameFilter: (state, action) => {
      state.nameFilter = action.payload;
    },
    setEnteredBindingId: (state, action) => {
      state.enteredBindingId = action.payload;
    },
    setCreatedAt: (state, action) => {
      state.createdAt = action.payload;
    },
    addDocumentToBasket: (state, action) => {
      state.documentsInBasket = [...state.documentsInBasket, action.payload];
    },
    deleteDocumentFromBasket: (state, action) => {
      state.documentsInBasket = state.documentsInBasket.filter(
        (d) => d.id !== action.payload
      );
    },
    setSelectedVeteranId: (state, action) => {
      state.selectedVeteranId = action.payload;
    },
    removeBasket: (state) => {
      state.documentsInBasket = [];
      state.enteredBindingId = null;
    },
    submitBasket: (state) => {
      const newBinding: BindingModel = {
        id: state.enteredBindingId ?? idGenerator(),
        status: "in_progress",
        createdAt: state.createdAt ?? new Date().toLocaleString(),
        formattedAt: new Date().toLocaleString(),
        endedAt: "",
        documents: state.documentsInBasket,
        veteran: VETERANS_MOCK.map(normalizeVeteran).find(
          (v) => v.id === state.selectedVeteranId
        ),
      };
      state.createdBindings = [newBinding, ...state.createdBindings];
      state.documentsInBasket = [];
      state.enteredBindingId = null;
      state.selectedVeteranId = null;
      state.createdAt = null;
    },
  },
});

export const {
  setDateFrom,
  setDateTo,
  setStatus,
  setNameFilter,
  addDocumentToBasket,
  deleteDocumentFromBasket,
  setEnteredBindingId,
  setCreatedAt,
  setSelectedVeteranId,
  submitBasket,
  removeBasket,
} = bindingSlice.actions;

export const { reducer: bindingReducer } = bindingSlice;
