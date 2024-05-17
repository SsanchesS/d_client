export interface IUser{
   id: number,
   f_name: string,
   s_name: string,
   email: string,
   password?: string
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
export interface Iresponse{
   code: number,
   message: string,
   user?: IUser | null,
   orders?: IOrder[] | null,
   order?: IOrder | null
// ....
}