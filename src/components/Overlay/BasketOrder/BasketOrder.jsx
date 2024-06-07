import SneakerBasket from './SneakerBasket/SneakerBasket';
import BasketOrderReadyUnReady from "../BasketOrderReadyUnReady/BasketOrderReadyUnReady"
import s from './BasketOrder.module.sass'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from "../../../hooks/hooks"

function BasketOrder(p){
   const [Order_is_processed,setOrder_is_processed] = useState(false)
   const navigate = useNavigate()
   const user = useAppSelector(state=>state.UserReducer)

   const placeOrder=()=>{
      if(!user.id){
         navigate("/auth",{replace:true})
      }else{
         console.log("Заказ оформлен")
         setOrder_is_processed(state=>!state)
      }      
   }
return(
Order_is_processed ?
   <BasketOrderReadyUnReady
      img="img/Ready.svg"
      h2="Заказ оформлен!"
      // p1= {`Ваш заказ #${state.orderNum} скоро будет передан`}
      p2="курьерской доставке"   
      closebasket={p.closebasket}
   />
:
   <div className={`${s.basketOrder}`}>
      <div className={`${s.sneaker_basket_wrap}`}>{
      p.sneakers_basket.map((obj,index)=>{
         return(
         <SneakerBasket key = {index} id = {obj.id} des = {obj.name} price = {obj.price} img = {obj.img} setMessageError={p.setMessageError}/>
      )})
      }
      </div>
      <div className={`${s.order_wrap}`}>
         <div className={`${s.result}`}><p>Итого:</p><h3>{`${p.itemsPrice} руб.`}</h3></div>
         <div className={`${s.tax}`}><p>Налог 5%:</p><h3>{`${Math.round(p.itemsPrice*(5/100))} руб.`}</h3></div>
         <div className="button"><button onClick={placeOrder}>Оформить заказ<img src='./img/arrow-r.svg' alt='arrow'></img></button></div>
      </div>
   </div>
)}
export default BasketOrder;