import {useEffect, useState} from 'react';
import s from './Order.module.sass'
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { userApi } from '../../../store/api/user.api'
import {setUser} from "../../../store/reducers/UserSlice"
import {setMethods} from "../../../store/reducers/SneakersSlice"

const Order=(p)=>{
   const dispatch = useAppDispatch()

   const user = useAppSelector(state=>state.UserReducer)
   const state = useAppSelector(state=>state.SneakersReducer)

   const [delivery_method_id,setdelivery_method_id] = useState(p.delivery_method_id)
   const [payment_method_id,setpayment_method_id] = useState(p.payment_method_id)

   const [updOrder,{data,isLoading,error}] = userApi.useUpdOrderMutation()
   const edit=async()=>{
      try {
         const updatedOrder = {delivery_method_id,payment_method_id}
         const onfulfilled = await updOrder({id:p.id,order:updatedOrder})
         if(onfulfilled.error){
           p.setMessageError(`${onfulfilled.error.status}: ${onfulfilled.error.data.detail[0].type}: ${onfulfilled.error.data.detail[0].msg}`)
           return
         }else if(onfulfilled.data.code >= 400){
           p.setMessageError(`${onfulfilled.data.code}: ${onfulfilled.data.message}`)
           return
         }
         p.setMessageError(onfulfilled.data.message)
   
         // const data = parseData(onfulfilled.data.user)
         const updatedSneakersOrders = user.sneakers_orders.map(order => 
            order.id === p.id ? { ...order, ...updatedOrder } : order
         );
         dispatch(setUser({sneakers_orders:updatedSneakersOrders}))
       } catch (error) {
         p.setMessageError("Ошибка")
         console.log(error)
       }
   }

   const [DelOrder,{data:DelOrder_data,isLoading:DelOrder_isLoading,error:DelOrder_error}] = userApi.useDelOrderMutation()
   const deleteOrder=async()=>{
      try {
         const onfulfilled = await DelOrder(p.id)
         if(onfulfilled.error){
           p.setMessageError(`${onfulfilled.error.status}: ${onfulfilled.error.data.detail[0].type}: ${onfulfilled.error.data.detail[0].msg}`)
           return
         }else if(onfulfilled.data.code >= 400){
           p.setMessageError(`${onfulfilled.data.code}: ${onfulfilled.data.message}`)
           return
         }
         p.setMessageError(onfulfilled.data.message)
   
         // const data = parseData(onfulfilled.data.user)
         const updatedSneakersOrders = user.sneakers_orders.filter(item=>item.id!==p.id)
         dispatch(setUser({sneakers_orders:updatedSneakersOrders}))
       } catch (error) {
         p.setMessageError("Ошибка")
         console.log(error)
       }
   }
return(
<div className={`${s.Order}`}>
   <div className={`${s.flex}`}> <div className="text"><p>Дата заказа:</p> &nbsp; <h2>{p.order_date}</h2></div> <div className="button"><button onClick={deleteOrder}>Удалить</button></div></div>   
   <div className="mt10px"> <p>Сумма:</p> &nbsp; <h2>{p.sum}</h2> </div>
   <div className="mt10px"> <p>Статус:</p> &nbsp; <h2>{p.status}</h2> </div>
   <div className="mt10px"> <p>id кроссовок:</p> &nbsp; <h2>{p.sneakers}</h2> </div>

   <div className={`inputs mt10px ${s.inputs}`}>
      <div className='mb10px'>
         <label htmlFor="delivery_method" >Способ доставки:</label>
         <select id="delivery_method" value={delivery_method_id} onChange={event=>setdelivery_method_id(Number(event.target.value))} >
            {state.methods?.delivery_methods.map(el=><option key={el.id} value={el.id}>{el.method_des}</option>)}                     
         </select>
      </div>

      <div>
         <label htmlFor="payment_method" >Способ оплаты:</label>
         <select id="payment_method" value={payment_method_id} onChange={event=>setpayment_method_id(Number(event.target.value))}>
            {state.methods?.payment_methods.map(el=><option key={el.id} value={el.id}>{el.method_des}</option>)}           
         </select>
      </div>
   </div>
   
   <div className={`${s.button} mt10px`}><button onClick={edit}>Редактировать</button></div>
</div>
)}
export default Order