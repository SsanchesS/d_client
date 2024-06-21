export interface IMethod{
   id: number,
   method_des: string
}
export interface IMethods{
   delivery_methods: IMethod[] | [],
   payment_methods: IMethod[] | []
}
export interface ISneaker{
   id: number,
   img: string // file
   des: string,
   price: number,
   category_id: number
}
export interface ISneakersState{
   sneakers: ISneaker[] | [],
   overlaySwitch: boolean,
   methods: IMethods,
   sneakers_basket: number[] | []
}
export interface IOrder{
   id: number,
   user_id?: number,
   order_date?: string,   // date
   sum?: number,
   status?: string,
   delivery_method_id?: number,
   payment_method_id?: number,
   sneakers?: string
}
export interface IUser{
   id: number,
   f_name?: string,
   s_name?: string,
   email?: string,
   password?: string,
   role_id?: number
}
export interface IRole{
   id: number,
   role: string
}
export interface Ipromotion{
   name: string,
   des: string,
   discount: number
}
export interface Icategory{
   name: string,
   des: string
}
export interface Iresponse{
   code: number,
   message: string,
   user?: IUser | null,
   orders?: IOrder[] | null,
   order?: IOrder | null,
   sneakers?: ISneaker[] | null,
   sneaker?: ISneaker | null,
   methods?: IMethods | null,
   role?: IRole | null,
   promotion?: Ipromotion | null,
   payment_method: IMethod | null,
   delivery_method: IMethod | null,
   category: Icategory | null
}