import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "@/entities/session/model";
import { documentReducer } from "@/entities/document/model";
import { axiosBaseApi } from "@/shared/api";
import { bindingReducer } from "@/entities/binding/model";
import { veteranReducer } from "@/entities/veteran/model/slice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    document: documentReducer,
    binding: bindingReducer,
    veteran: veteranReducer,
    api: axiosBaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(axiosBaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
