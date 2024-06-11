import {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import BasketOrder from "./BasketOrder/BasketOrder"
import BasketOrderReadyUnReady from "./BasketOrderReadyUnReady/BasketOrderReadyUnReady"
import s from './Overlay.module.sass'
import { useNavigate } from 'react-router-dom'
import {overlaySwitch} from "../../store/reducers/SneakersSlice"
import { userApi } from '../../store/api/user.api'
import {setUser} from "../../store/reducers/UserSlice"
import {setMethods} from "../../store/reducers/SneakersSlice"

const Overlay=()=>{
   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   const user = useAppSelector(state=>state.UserReducer)
   const state = useAppSelector(state=>state.SneakersReducer)

   const [MessageError,setMessageError] = useState('')

   const [delivery_method_id,setdelivery_method_id] = useState(0)
   const [payment_method_id,setpayment_method_id] = useState(0)

   const {data,isLoading,error} = userApi.useGetMethodsQuery() // запрос делается сразу же is bed
   useEffect(()=>{
      if(error){
         setMessageError(`${error.status}: ${error.data?.detail[0].type}: ${error.data?.detail[0].msg}`)
      }else if(data?.code >= 400){
         setMessageError(`${data?.code}: ${data?.message}`)
      }else if (data?.methods) {
         setMessageError(data.message)
         dispatch(setMethods(data.methods))
      }     
   },[data, error, dispatch])   

   const [Order_is_processed,setOrder_is_processed] = useState(false)
   const [createOrder,{data:createOrder_data,isLoading:createOrder_isLoading,error:createOrder_error}] = userApi.useCreateOrderMutation()
   const [UpdUser,{data:UpdUser_data,isLoading:UpdUser_isLoading,error:UpdUser_error}] = userApi.useUpdUserMutation()

   const placeOrder=async()=>{
      if(!user.id){
         navigate("/auth",{replace:true})
      }else{
         try {
            const sum = user.sneakers_basket.reduce((acc,i)=>acc+i.price,0)
            const date = new Date().toISOString().split('T')[0];
            const sneakers = user.sneakers_basket.map(el=>el.id)
            const data={
               user_id: user.id,
               order_date: date,
               sum: sum,
               delivery_method_id: delivery_method_id,
               payment_method_id: payment_method_id,
               sneakers: JSON.stringify(sneakers)
            }
            const onfulfilled = await createOrder(data)
            if(onfulfilled.error){
              setMessageError(`${onfulfilled.error.status}: ${onfulfilled.error.data.detail[0].type}: ${onfulfilled.error.data.detail[0].msg}`)
              return
            }else if(onfulfilled.data.code >= 400){
              setMessageError(`${onfulfilled.data.code}: ${onfulfilled.data.message}`)
              return
            }
            setMessageError(onfulfilled.data.message)      
            // const data = parseData(onfulfilled.data.order)
            const response = onfulfilled.data.order

            // Обновляем корзину            
            const onfulfilled_user = await UpdUser({id:user.id,user:{sneakers_basket: JSON.stringify([])}})
            if(onfulfilled_user.error){
              setMessageError(`${onfulfilled_user.error.status}: ${onfulfilled_user.error.data.detail[0].type}: ${onfulfilled_user.error.data.detail[0].msg}`)
              return
            }else if(onfulfilled_user.data.code >= 400){
              setMessageError(`${onfulfilled_user.data.code}: ${onfulfilled_user.data.message}`)
              return
            }
            setMessageError(onfulfilled_user.data.message)      
            // const data = parseData(onfulfilled_user.data.user)
            const response_user = onfulfilled_user.data.user

            const sneakers_orders = user?.sneakers_orders ? 
               [...user?.sneakers_orders,{id:response.id, user_id:response.user_id, order_date:response.order_date, sum:response.sum, status:response.status, delivery_method_id:response.delivery_method_id, payment_method_id:response.payment_method_id, sneakers:response.sneakers}]
            :
               [{id:response.id, user_id:response.user_id, order_date:response.order_date, sum:response.sum, status:response.status, delivery_method_id:response.delivery_method_id, payment_method_id:response.payment_method_id, sneakers:response.sneakers}]
            
            dispatch(setUser({sneakers_basket:[],sneakers_orders:sneakers_orders}))
            setOrder_is_processed(true)
         } catch (error) {
            setMessageError("Ошибка")
            console.log(error)
         }
      }      
   }
   const closebasket=()=>{
      dispatch(overlaySwitch(false))
   }
return(
   <div className={state.overlaySwitch ? `${s.overlay}`: `${s.overlay} hide`}>
      <div className={`${s.opacity}`} onClick={closebasket}></div>
      <div className= {`${s.right_basket}`}>
         <h2 className='mb10px'>Корзина</h2>
         <div className={`${MessageError ? '' : 'vis_none'} red`}><p className={`mt10px red`}>{MessageError}</p></div>
         { user.sneakers_basket?.length ?
            isLoading ?
            <h2 className={ `white ${isLoading ? "" : "vis_none"}` }>Загрузка...</h2>
            :
            <>
               <div className={"inputs mt10px"}>
                  <label htmlFor="delivery_method" >Способ доставки:</label>
                  <select id="delivery_method" value={delivery_method_id} onChange={event=>setdelivery_method_id(Number(event.target.value))} >
                     {state.methods?.delivery_methods.map(el=><option key={el.id} value={el.id}>{el.method_des}</option>)}                     
                  </select>

                  <label htmlFor="payment_method" >Способ оплаты:</label>
                  <select id="payment_method" value={payment_method_id} onChange={event=>setpayment_method_id(Number(event.target.value))}>
                     {state.methods?.payment_methods.map(el=><option key={el.id} value={el.id}>{el.method_des}</option>)}           
                  </select>
               </div>
               <BasketOrder placeOrder={placeOrder} sneakers_basket={user.sneakers_basket} closebasket={closebasket} setMessageError={setMessageError}/>
            </>   
         :
         Order_is_processed ?
         <BasketOrderReadyUnReady
            img="img/Ready.svg"
            h2="Заказ оформлен!"
            p1= {`Ваш заказ #${user.sneakers_orders[user.sneakers_orders.length - 1].id} скоро будет передан`}
            p2="курьерской доставке"   
            closebasket={closebasket}
         />
         :
         <BasketOrderReadyUnReady
            img="img/UnReady.svg"
            h2="Корзина пустая"
            p1="Добавьте хотя бы одну пару"
            p2="кроссовок, чтобы сделать заказ."
            closebasket={closebasket}
         />         
         }                    
      </div>
   </div>
   )
}
export default Overlay;