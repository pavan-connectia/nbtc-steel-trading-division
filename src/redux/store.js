import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import layoutDirectionReducer from "./slice/layoutDirectionSlice";

// Import all the API reducers
import { aboutusApi } from "./api/aboutusApi";
import { afflicatesApi } from "./api/afflicatesApi";
import { awardsApi } from "./api/awardsApi";
import { brandsApi } from "./api/brandsApi";
import { careersApi } from "./api/careersApi";
import { clientsApi } from "./api/clientsApi";
import { contactApi } from "./api/contactApi";
import { coreBusinessApi } from "./api/coreBusinessApi";
import { equipmentsApi } from "./api/equipmentsApi";
import { homeApi } from "./api/homeApi";
import { milestonesApi } from "./api/milestonesApi";
import { newsApi } from "./api/newsApi";
import { projectsApi } from "./api/projectsApi";
import { qhseApi } from "./api/qhseApi";
import { qualificationApi } from "./api/qualificationApi";
import { quotationApi } from "./api/quotationApi";
import { uploadApi } from "./api/uploadApi";

const persistConfig = {
  key: "layoutDirection",
  storage,
};

const persistedLayoutDirectionReducer = persistReducer(
  persistConfig,
  layoutDirectionReducer,
);

export const store = configureStore({
  reducer: {
    layoutDirection: persistedLayoutDirectionReducer,
    [aboutusApi.reducerPath]: aboutusApi.reducer,
    [afflicatesApi.reducerPath]: afflicatesApi.reducer,
    [awardsApi.reducerPath]: awardsApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [careersApi.reducerPath]: careersApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [coreBusinessApi.reducerPath]: coreBusinessApi.reducer,
    [equipmentsApi.reducerPath]: equipmentsApi.reducer,
    [qualificationApi.reducerPath]: qualificationApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [milestonesApi.reducerPath]: milestonesApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [qhseApi.reducerPath]: qhseApi.reducer,
    [quotationApi.reducerPath]: quotationApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(aboutusApi.middleware)
      .concat(afflicatesApi.middleware)
      .concat(awardsApi.middleware)
      .concat(brandsApi.middleware)
      .concat(careersApi.middleware)
      .concat(clientsApi.middleware)
      .concat(contactApi.middleware)
      .concat(coreBusinessApi.middleware)
      .concat(equipmentsApi.middleware)
      .concat(qualificationApi.middleware)
      .concat(homeApi.middleware)
      .concat(milestonesApi.middleware)
      .concat(newsApi.middleware)
      .concat(projectsApi.middleware)
      .concat(qhseApi.middleware)
      .concat(quotationApi.middleware)
      .concat(uploadApi.middleware),
});

export const persistor = persistStore(store);
