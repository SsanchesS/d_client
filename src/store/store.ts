import { configureStore } from "@reduxjs/toolkit";
import {api} from "./api/api"
import UserSlice from "./reducers/UserSlice";
import SneakersSlice from "./reducers/SneakersSlice";

export const store = configureStore({
   reducer:{
      [api.reducerPath]:api.reducer,
      UserReducer:UserSlice,
      SneakersReducer:SneakersSlice
   },
   middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(api.middleware)
})
export type TypeState = ReturnType<typeof store.getState>
export type TypeDispatch = typeof store.dispatch