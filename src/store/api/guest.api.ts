import type { IUser, Iresponse } from "../../types/types";
import { api } from "./api";

interface IRegistrationData extends Pick<IUser,"f_name"|"s_name"|"password"|"email">{}

interface IAuthData extends Pick<IUser,"password"|"email">{}

export const guestApi = api.injectEndpoints({
   endpoints: build =>({
      registration: build.mutation<Iresponse,IRegistrationData>({
         query: (RegistrationData:IRegistrationData)=>({
            url: "/registration/", 
            method: "POST",
            body: RegistrationData
         }),
         invalidatesTags: ["User"]
      }),
      auth: build.mutation<Iresponse,IAuthData>({
         query:(AuthData:IAuthData)=>({
            url:"/auth/",
            method: "POST",
            body: AuthData
         }),
         invalidatesTags: ["User"]
      })
   })
})