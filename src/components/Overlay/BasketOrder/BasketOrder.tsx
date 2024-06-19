import { useEffect, useState, FC } from 'react';
import s from './BasketOrder.module.sass'
import { ISneaker } from '../../../types/types';
import SneakerBasket from './SneakerBasket/SneakerBasket';

interface proops{
   placeOrder:()=>void,
   sneakers_basket:number[],
   sneakers_basket_full: ISneaker[]
   closebasket: ()=>void,
   setMessageError:(message:string)=>void
}
const BasketOrder:FC<proops>=(p)=>{
   const sneakers_basket = p.sneakers_basket
   const sneakers_basket_full = p.sneakers_basket_full
   const [ItemsPrice,setItemsPrice] = useState(0)   
   useEffect(()=>{      
      const sum = sneakers_basket_full?.reduce((acc,i)=>acc+i.price,0) || 0
      setItemsPrice(sum)
   },[sneakers_basket])   
   
return(
<div className={`${s.basketOrder}`}>
   <div className={`${s.sneaker_basket_wrap}`}>{
   sneakers_basket_full?.map((obj,index)=>{
      return(
      <SneakerBasket key = {index} sneakers_basket_full = {sneakers_basket_full} id = {obj.id} des = {obj.des} price = {obj.price} img = {obj.img} setMessageError={p.setMessageError}/>
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