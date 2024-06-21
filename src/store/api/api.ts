import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const api = createApi({
   reducerPath:"api",
   tagTypes: ["User","Orders","Sneakers","Methods"],
   baseQuery: fetchBaseQuery({
      baseUrl:"http://127.0.0.1:8000"
      // baseUrl:"https://swfnhkr9-8000.euw.devtunnels.ms"
   }),
   endpoints:build=>({

   })
})