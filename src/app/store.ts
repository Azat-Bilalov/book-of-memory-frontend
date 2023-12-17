import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "@/entities/session/model";
// import { sessionApi } from "@/entities/session/api";
import { documentReducer } from "@/entities/document/model";
import { axiosBaseApi } from "@/shared/api";
import { bindingReducer } from "@/entities/binding/model";
// import { documentApi } from "@/entities/document/api";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    document: documentReducer,
    binding: bindingReducer,
    api: axiosBaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(axiosBaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
