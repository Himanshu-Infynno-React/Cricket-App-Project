import { configureStore } from '@reduxjs/toolkit'
import homePageSlice from '../Slices/homePageSlice/homePageSlice'

export const store = configureStore({
  reducer: {
    homePageSlice: homePageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})