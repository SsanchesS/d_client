import { IUser, Iresponse,IOrder } from "../../types/types";
import { api } from "./api";

interface IUserData extends Pick<IUser,"f_name"|"s_name"|"email"|"password">{}

interface IOrderData extends Pick<IOrder,"user_id"|"order_date"|"sum"|"delivery_method_id"|"payment_method_id">{}

interface DeleteOrderParams {
   user_id: number,
   id: number
}

export const userApi = api.injectEndpoints({
   endpoints: build =>({
      getUser: build.query<IUser, number>({
         query: (id: number) => ({
            url: `/users/${id}`,        
         }),
         providesTags: result => ["User"]
      }),
      updUser: build.mutation<Iresponse,IUserData>({
         query: (UserData:IUserData)=>({
            url: "/users",
            method: "PUT",
            body: UserData
         }),
         invalidatesTags: ["User"]
      }),
      delUser: build.mutation<Iresponse,number>({
         query: (id: number)=>({
            url: `/users/${id}`,
            method: "DELETE"
         }),
         invalidatesTags: ["User"]
      }),
      // 
      getSneakers: build.query<Iresponse, null>({
         query: () => ({
            url: `/users/sneakers/`,        
         }),
         providesTags: result => ["Sneakers"]
      }),
      //
      getOrders: build.query<Iresponse, number>({
         query: (user_id: number) => ({
            url: `/users/orders/${user_id}`,        
         }),
         providesTags: result => ["Orders"]
      }),
      createOrder: build.mutation<Iresponse,IOrderData>({
         query: (OrderData:IOrderData)=>({
            url: "/users/orders",
            method: "POST",
            body: OrderData
         }),
         invalidatesTags: ["Orders"]
      }),
      delOrder: build.mutation<Iresponse,DeleteOrderParams>({
         query: ({ user_id, id }: DeleteOrderParams)=>({
            url: `/users/orders/${user_id}/${id}`,
            method: "DELETE"
         }),
         invalidatesTags: ["Orders"]
      }),
   })
})