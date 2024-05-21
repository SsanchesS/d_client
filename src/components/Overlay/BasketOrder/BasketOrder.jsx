import SneakerBasket from './SneakerBasket/SneakerBasket';
import s from './BasketOrder.module.sass'

function BasketOrder(p){
return(
   <div className={`${s.basketOrder}`}>
      <div className={`${s.sneaker-basket-wrap}`}>{
      p.sneakers_basket.map((obj,index)=>{
         return(
         <SneakerBasket key = {index} id = {obj.id} des = {obj.name} price = {obj.price} img = {obj.img}/> //  callDelSneakers_basket={p.callDelSneakers_basket}
      )})
      }
      </div>
      <div className={`${s.order-wrap}`}>
         <div className={`${s.result}`}><p>Итого:</p><h3>{`${p.itemsPrice} руб.`}</h3></div>
         <div className={`${s.tax}`}><p>Налог 5%:</p><h3>{`${Math.round(p.itemsPrice*(5/100))} руб.`}</h3></div>
         <button onClick={()=>console.log("p.BasketOrderFunc")}>Оформить заказ<img src='./img/arrow-r.svg' alt='arrow'></img></button>
      </div>
   </div>
   )
}

export default BasketOrder;