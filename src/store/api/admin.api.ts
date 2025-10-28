import type { IUser, Iresponse, IOrder, ISneaker } from "../../types/types";
import { api } from "./api";
type IUserWithoutId = Omit<IUser, 'id'>;
interface IUserData{
   id: number,
   user: IUserWithoutId
}
type ISneakerWithoutId = Omit<ISneaker, 'id'>;
interface ISneakerData{
   id:number,
   sneaker:ISneakerWithoutId
}
type IOrderWithoutId = Omit<IOrder, 'id'>;
interface IOrderData{
   id: number,
   order: IOrderWithoutId
}
interface IRole{
   role: string
}
type IRoleWithoutId = Omit<IRole, 'id'>;
interface IRoleData{
   id: number,
   role: IRoleWithoutId
}
interface ICategory{
   name: string,
   des: string
}
type ICategoryWithoutId = Omit<ICategory, 'id'>;
interface ICategoryData{
   id: number,
   category: ICategoryWithoutId
}
interface IPromotion{
   name: string,
   des: string,
   discount: number
}
type IPromotionWithoutId = Omit<IPromotion, 'id'>;
interface IPromotionData{
   id: number,
   promotion: IPromotionWithoutId
}
interface IDelivery_method{
   method_des: string
}
type IDelivery_methodWithoutId = Omit<IDelivery_method, 'id'>;
interface IDelivery_methodData{
   id: number,
   delivery_method: IDelivery_methodWithoutId
}
interface IPayment_method{
   method_des: string
}
type IPayment_methodWithoutId = Omit<IPayment_method, 'id'>;
interface IPayment_methodData{
   id: number,
   payment_method: IPayment_methodWithoutId
}
export const adminApi = api.injectEndpoints({
   endpoints: build =>({
      getUser_admin: build.query<Iresponse, number>({
         query: (id: number) => ({
            url: `/admins/${id}`,     
         })
      }),
      createUser_admin: build.mutation<Iresponse,IUserWithoutId>({
         query: (UserData:IUserWithoutId)=>({
            url: "/admins/", 
            method: "POST",
            body: UserData
         })
      }),
      updUser_admin: build.mutation<Iresponse,IUserData>({
         query: (UserData:IUserData)=>({
            url: `/admins/${UserData.id}`,
            method: "PUT",
            body: UserData.user
         })
      }),
      delUser_admin: build.mutation<Iresponse,number>({
         query: (id: number)=>({
            url: `/admins/${id}`,
            method: "DELETE"
         })
      }),
      // 
      getSneaker_admin: build.query<Iresponse, number>({
         query: (id: number) => ({
            url: `/admins/sneaker/${id}`, 
         })
      }),
      createSneaker_admin: build.mutation<Iresponse,ISneakerWithoutId>({
         query: (SneakerData:ISneakerWithoutId)=>({
            url: "/admins/sneaker/", 
            method: "POST",
            body: SneakerData
         })
      }),
      updSneaker_admin: build.mutation<Iresponse,ISneakerData>({
         query: (SneakerData:ISneakerData)=>({
            url: `/admins/sneaker/${SneakerData.id}`,
            method: "PUT",
            body: SneakerData.sneaker
         })
      }),
      delSneaker_admin: build.mutation<Iresponse,number>({
         query: (id: number)=>({
            url: `/admins/sneaker/${id}`,
            method: "DELETE"
         })
      }),
      //
      getOrder_admin: build.query<Iresponse, number>({
         query: (id: number) => ({
            url: `/admins/order/${id}`,        
         })
      }),
      updOrder_admin: build.mutation<Iresponse,IOrderData>({
         query: (OrderData:IOrderData)=>({
            url: `/admins/order/${OrderData.id}`,
            method: "PUT",
            body: OrderData.order
         })
      }),
      delOrder_admin: build.mutation<Iresponse,number>({
         query: (id: number)=>({
            url: `/admins/order/${id}`,
            method: "DELETE"
         })
      }),
      //
      getRole_admin: build.query<Iresponse, number>({
         query: (id: number) => ({
            url: `/admins/role/${id}`, 
         })
      }),
      createRole_admin: build.mutation<Iresponse,IRoleWithoutId>({
         query: (RoleData:IRoleWithoutId)=>({
            url: "/admins/role/", 
            method: "POST",
            body: RoleData
         })
      }),
      updRole_admin: build.mutation<Iresponse,IRoleData>({
         query: (RoleData:IRoleData)=>({
            url: `/admins/role/${RoleData.id}`,
            method: "PUT",
            body: RoleData.role
         })
      }),
      delRole_admin: build.mutation<Iresponse,number>({
         query: (id: number)=>({
            url: `/admins/role/${id}`,
            method: "DELETE"
         })
      }),
      //
      getPromotion_admin: build.query<Iresponse, number>({
         query: (id: number) => ({
            url: `/admins/promotion/${id}`, 
         })
      }),
      createPromotion_admin: build.mutation<Iresponse,IPromotionWithoutId>({
         query: (PromotionData:IPromotionWithoutId)=>({
            url: "/admins/promotion/", 
            method: "POST",
            body: PromotionData
         })
      }),
      updPromotion_admin: build.mutation<Iresponse,IPromotionData>({
         query: (PromotionData:IPromotionData)=>({
            url: `/admins/promotion/${PromotionData.id}`,
            method: "PUT",
            body: PromotionData.promotion
         })
      }),
      delPromotion_admin: build.mutation<Iresponse,number>({
         query: (id: number)=>({
            url: `/admins/promotion/${id}`,
            method: "DELETE"
         })
      }),
      //
      getCategory_admin: build.query<Iresponse, number>({
         query: (id: number) => ({
            url: `/admins/category/${id}`, 
         })
      }),
      createCategory_admin: build.mutation<Iresponse,ICategoryWithoutId>({
         query: (CategoryData:ICategoryWithoutId)=>({
            url: "/admins/category/", 
            method: "POST",
            body: CategoryData
         })
      }),
      updCategory_admin: build.mutation<Iresponse,ICategoryData>({
         query: (CategoryData:ICategoryData)=>({
            url: `/admins/category/${CategoryData.id}`,
            method: "PUT",
            body: CategoryData.category
         })
      }),
      delCategory_admin: build.mutation<Iresponse,number>({
         query: (id: number)=>({
            url: `/admins/category/${id}`,
            method: "DELETE"
         })
      }),
      //
      getDelivery_method_admin: build.query<Iresponse, number>({
         query: (id: number) => ({
            url: `/admins/delivery_method/${id}`, 
         })
      }),
      createDelivery_method_admin: build.mutation<Iresponse,IDelivery_methodWithoutId>({
         query: (Delivery_methodData:IDelivery_methodWithoutId)=>({
            url: "/admins/delivery_method/", 
            method: "POST",
            body: Delivery_methodData
         })
      }),
      updDelivery_method_admin: build.mutation<Iresponse,IDelivery_methodData>({
         query: (Delivery_methodData:IDelivery_methodData)=>({
            url: `/admins/delivery_method/${Delivery_methodData.id}`,
            method: "PUT",
            body: Delivery_methodData.delivery_method
         })
      }),
      delDelivery_method_admin: build.mutation<Iresponse,number>({
         query: (id: number)=>({
            url: `/admins/delivery_method/${id}`,
            method: "DELETE"
         })
      }),
      //
      getPayment_method_admin: build.query<Iresponse, number>({
         query: (id: number) => ({
            url: `/admins/payment_method/${id}`, 
         })
      }),
      createPayment_method_admin: build.mutation<Iresponse,IPayment_methodWithoutId>({
         query: (Payment_methodData:IPayment_methodWithoutId)=>({
            url: "/admins/payment_method/", 
            method: "POST",
            body: Payment_methodData
         })
      }),
      updPayment_method_admin: build.mutation<Iresponse,IPayment_methodData>({
         query: (Payment_methodData:IPayment_methodData)=>({
            url: `/admins/payment_method/${Payment_methodData.id}`,
            method: "PUT",
            body: Payment_methodData.payment_method
         })
      }),
      delPayment_method_admin: build.mutation<Iresponse,number>({
         query: (id: number)=>({
            url: `/admins/payment_method/${id}`,
            method: "DELETE"
         })
      }),
   })
})