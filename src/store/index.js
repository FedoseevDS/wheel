import { configureStore } from '@reduxjs/toolkit';

import { requestsApi } from './requests/api';

const store = configureStore({
  reducer: { [requestsApi.reducerPath]: requestsApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(requestsApi.middleware),
});

export default store;
