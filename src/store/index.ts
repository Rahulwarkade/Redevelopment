import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

// Import reducers
import demoReducer from "./slices/demoSlice";
import apiDemoReducer from "./slices/apiDemoSlice";

// Configure persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["demo"], // Add slices you want to persist
};

const rootReducer = combineReducers({
  demo: demoReducer,
  apiDemo: apiDemoReducer,
  // Add more reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
