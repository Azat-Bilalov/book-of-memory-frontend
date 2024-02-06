import { configureStore } from "@reduxjs/toolkit";
import { documentReducer } from "@/entities/document/model";
import { bindingReducer } from "@/entities/binding/model";

export const store = configureStore({
  reducer: {
    document: documentReducer,
    binding: bindingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
