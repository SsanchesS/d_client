import { IUser, Iresponse,IOrder } from "../../types/types";
import { api } from "./api";

type IUserWithoutId = Omit<IUser, 'id'>;
interface IUserData{
   id: number,
   user: IUserWithoutId
}
type IOrderWithoutId = Omit<IOrder, 'id' | 'sneakers'> & { sneakers?: string };
interface IOrderData{
   id: number,
   order: IOrderWithoutId
}

export const userApi = api.injectEndpoints({
   endpoints: build =>({
      getUser: build.query<Iresponse, number>({
         query: (id: number) => ({
            url: `/users/${id}`,        
         }),
         providesTags: result => ["User"]
      }),
      updUser: build.mutation<Iresponse,IUserData>({
         query: (UserData:IUserData)=>({
            url: `/users/${UserData.id}`,
            method: "PUT",
            body: UserData.user
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
      getMethods: build.query<Iresponse, null>({
         query: () => ({
            url: `/users/methods/`,        
         }),
         providesTags: result => ["Methods"]
      }),
      //////////////////////////////////////////////////////////////////////
      getOrders: build.query<Iresponse, number>({
         query: (user_id: number) => ({
            url: `/users/orders/${user_id}`,        
         }),
         providesTags: result => ["Orders"]
      }),
      createOrder: build.mutation<Iresponse,IOrderWithoutId>({
         query: (OrderData:IOrderWithoutId)=>({
            url: "/users/orders/",
            method: "POST",
            body: OrderData
         }),
         invalidatesTags: ["Orders"]
      }),
      updOrder: build.mutation<Iresponse,IOrderData>({
         query: (OrderData:IOrderData)=>({
            url: `/users/orders/${OrderData.id}`,
            method: "PUT",
            body: OrderData.order
         }),
         invalidatesTags: ["Orders"]
      }),
      delOrder: build.mutation<Iresponse,number>({
         query: (id: number)=>({
            url: `/users/orders/${id}`,
            method: "DELETE"
         }),
         invalidatesTags: ["Orders"]
      }),
   })
})