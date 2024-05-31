export interface ISneaker{
   id: number,
   img: string // file
   des: string,
   price: number
}
export interface ISneakersState{
   sneakers: ISneaker[] | null,
   overlaySwitch: boolean
}
export interface IOrder{
   id: number,
   user_id: number,
   order_date: Date,   // мб проблемы
   sum: number,
   status: string,
   delivery_method_id: string, // на серсере должено быть переформатирование
   payment_method_id: string,
}
export interface IUser{
   id: number,
   f_name: string,
   s_name: string,
   email: string,
   password?: string,
   role_id: number,

   itemsPrice: number,
   sneakers_basket: ISneaker[] | null,
   sneakers_orders: IOrder[] | null
}
export interface Iresponse{
   code: number,
   message: string,
   user?: IUser | null,
   orders?: IOrder[] | null,
   order?: IOrder | null,
   sneakers?: ISneaker[] | null,
// ....
}