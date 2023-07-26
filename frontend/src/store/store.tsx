import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import authSlice from "./authSlice";
import { authApiSlice } from "./authApiSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    auth: authSlice,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
