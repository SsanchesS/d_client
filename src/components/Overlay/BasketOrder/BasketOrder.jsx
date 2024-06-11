import SneakerBasket from './SneakerBasket/SneakerBasket';
import s from './BasketOrder.module.sass'
import { useEffect, useState } from 'react';

function BasketOrder(p){
   const [ItemsPrice,setItemsPrice] = useState(0)
   const sneakers_basket = p.sneakers_basket
   useEffect(()=>{
      const sum = sneakers_basket.reduce((acc,i)=>acc+i.price,0)
      setItemsPrice(sum)
   },[sneakers_basket])   
   
return(
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