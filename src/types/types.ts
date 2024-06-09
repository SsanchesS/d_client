export interface IMethod{
   delivery_methods:{
      id: number,
      method_des: string
   }[],
   payment_methods:{
      id: number,
      method_des: string
   }[]
}
export interface ISneaker{
   id: number,
   img: string // file
   des: string,
   price: number
}
export interface ISneakersState{
   sneakers: ISneaker[] | null,
   overlaySwitch: boolean,
   methods: IMethod | null,
}
export interface IOrder{
   id: number,
   user_id: number,
   order_date: Date,   // мб проблемы
   sum: number,
   status: string,
   delivery_method_id: string,
   payment_method_id: string,
}
export interface IUser{
   id: number,
   f_name: string | null,
   s_name: string | null,
   email: string | null,
   password?: string | null,
   role_id: number | null,

   sneakers_basket: ISneaker[] | null,
   sneakers_orders: IOrder[] | null
}
export interface IMethods{
   delivery_methods: IMethod[],
   payment_methods: IMethod[]
}
export interface Iresponse{
   code: number,
   message: string,
   user?: IUser | null,
   orders?: IOrder[] | null,
   order?: IOrder | null,
   sneakers?: ISneaker[] | null,
   methods?: IMethods | null,
// ....
}