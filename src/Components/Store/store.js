import { configureStore } from '@reduxjs/toolkit'
import homePageSlice from '../Slices/homePageSlice/homePageSlice'
import scoreBoardSlice from '../Slices/scoreBoardSlice/scoreBoardSlice'

export const store = configureStore({
  reducer: {
    homePageSlice: homePageSlice,
    scoreBoardSlice : scoreBoardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})