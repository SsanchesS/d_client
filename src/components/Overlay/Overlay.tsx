import {useState, FC} from 'react';
import { useNavigate } from 'react-router-dom'
import s from './Overlay.module.sass'
import BasketOrder from "./BasketOrder/BasketOrder"
import BasketOrderReadyUnReady from "./BasketOrderReadyUnReady/BasketOrderReadyUnReady"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { userApi } from '../../store/api/user.api'
import {setSneakers_basket,overlaySwitch} from "../../store/reducers/SneakersSlice"
import { JSON_stringify, get_sneakers_basket_full } from '../../service/servise';

const Overlay:FC=()=>{
   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   const user = useAppSelector(state=>state.UserReducer)
   const sneakers = useAppSelector(state=>state.SneakersReducer)
   const sneakers_basket_full = sneakers.sneakers && sneakers.sneakers_basket ? get_sneakers_basket_full(sneakers.sneakers,sneakers.sneakers_basket) : []

   const [MessageError,setMessageError] = useState('')
   const [delivery_method_id,setdelivery_method_id] = useState(1)
   const [payment_method_id,setpayment_method_id] = useState(1)

   const [Order_is_processed,setOrder_is_processed] = useState(false)
   const [createOrder,{data,isLoading,error}] = userApi.useCreateOrderMutation()

   const placeOrder=async()=>{
      if(!user.id){
         navigate("/auth",{replace:true})
      }else{
         try {
            const sum = sneakers_basket_full?.reduce((acc,i)=>acc+i.price,0) || 0
            const date = new Date().toISOString().split('T')[0];
            const sneakers_stringify = JSON_stringify(sneakers.sneakers_basket)     
            if(!sneakers_stringify){
               setMessageError(`Error parsing JSON`)
               return
            }
            const data = await createOrder({
               user_id: user.id,
               order_date: date,
               sum: sum,
               delivery_method_id: delivery_method_id,
               payment_method_id: payment_method_id,
               sneakers:sneakers_stringify
            }).unwrap()  
            if(data.code >= 400){
              setMessageError(`${data.code}: ${data.message}`)
              return
            }else if(data.order){
               setMessageError(data.message)          
               dispatch(setSneakers_basket([]))
               setOrder_is_processed(true)
            }            
         } catch (error:any) {
            setMessageError("Ошибка")
            setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         }
      }      
   }
   const closebasket=()=>{
      dispatch(overlaySwitch(false))
   }
return(
   <div className={sneakers.overlaySwitch ? `${s.overlay}`: `${s.overlay} hide`}>
      <div className={`${s.opacity}`} onClick={closebasket}></div>
      <div className= {`${s.right_basket}`}>
         <h2 className='mb10px'>Корзина</h2>
         <div className={`${MessageError ? '' : 'vis_none'} red`}><p className={`mt10px red`}>{MessageError}</p></div>
         { sneakers.sneakers_basket?.length ?
            isLoading ?
            <h2 className={ `white ${isLoading ? "" : "vis_none"}` }>Загрузка...</h2>
            :
            <>
               <div className={"inputs mt10px mb10px"}>
                  <label htmlFor="delivery_method">Способ доставки:</label>
                  <select id="delivery_method" value={delivery_method_id} onChange={event=>setdelivery_method_id(Number(event.target.value))} >
                     {sneakers.methods.delivery_methods.map(el=><option key={el.id} value={el.id}>{el.method_des}</option>)}                     
                  </select>

                  <label htmlFor="payment_method" >Способ оплаты:</label>
                  <select id="payment_method" value={payment_method_id} onChange={event=>setpayment_method_id(Number(event.target.value))}>
                     {sneakers.methods.payment_methods.map(el=><option key={el.id} value={el.id}>{el.method_des}</option>)}           
                  </select>
               </div>
               <BasketOrder placeOrder={placeOrder} sneakers_basket_full={sneakers_basket_full} sneakers_basket={sneakers.sneakers_basket} closebasket={closebasket} setMessageError={setMessageError}/>
            </>   
         :
         Order_is_processed ?
         <BasketOrderReadyUnReady
            img="img/Ready.svg"
            h2="Заказ оформлен!"
            p1= {`Ваш заказ #${data?.order?.id} скоро будет передан`}
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