import SneakerBasket from './SneakerBasket/SneakerBasket';
import BasketOrderReadyUnReady from "../BasketOrderReadyUnReady/BasketOrderReadyUnReady"
import s from './BasketOrder.module.sass'
import { useAppSelector } from "../../../hooks/hooks"
import { useEffect, useState } from 'react';

function BasketOrder(p){
   const user = useAppSelector(state=>state.UserReducer)

   const [ItemsPrice,setItemsPrice] = useState(0)
   const sneakers_basket = p.sneakers_basket
   useEffect(()=>{
      const sum = sneakers_basket.reduce((acc,i)=>acc+i.price,0)
      setItemsPrice(sum)
   },[sneakers_basket])   

   
return(
p.Order_is_processed ?
   <BasketOrderReadyUnReady
      img="img/Ready.svg"
      h2="Заказ оформлен!"
      p1= {`Ваш заказ #${user.sneakers_orders[user.sneakers_orders.length - 1].id} скоро будет передан`}
      p2="курьерской доставке"   
      closebasket={p.closebasket}
      setOrder_is_processed={p.setOrder_is_processed}
   />
:
   <div className={`${s.basketOrder}`}>
      <div className={`${s.sneaker_basket_wrap}`}>{
      sneakers_basket.map((obj,index)=>{
         return(
         <SneakerBasket key = {index} id = {obj.id} des = {obj.name} price = {obj.price} img = {obj.img} setMessageError={p.setMessageError}/>
      )})
      }
      </div>
      <div className={`${s.order_wrap}`}>
         <div className={`${s.result}`}><p>Итого:</p><h3>{`${ItemsPrice} руб.`}</h3></div>
         <div className={`${s.tax}`}><p>Налог 5%:</p><h3>{`${Math.round(ItemsPrice*(5/100))} руб.`}</h3></div>
         <div className="button"><button onClick={p.placeOrder}>Оформить заказ<img src='./img/arrow-r.svg' alt='arrow'></img></button></div>
      </div>
   </div>
)}
export default BasketOrder;