import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./slices/authSlice";
import enquiryReducer from "./slices/enquirySlice";
import serviceReducer from "./slices/serviceSlice";
import blogReducer from "./slices/blogSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  enquiry: enquiryReducer,
  service: serviceReducer,
  blogs: blogReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
