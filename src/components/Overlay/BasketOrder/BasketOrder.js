import SneakerBasket from './SneakerBasket/SneakerBasket';

function BasketOrder(p){

return(
   <div className='basketOrder'>
      <div className='sneaker-basket-wrap'>{
      p.sneakers_basket.map((obj,index)=>{
         return(
         <SneakerBasket key = {index} id = {obj.id} des = {obj.name} price = {obj.price} img = {obj.img} callDelSneakers_basket={p.callDelSneakers_basket}/>
      )})
      }
      </div>
      <div className='order-wrap'>
         <div className='result'><p>Итого:</p><h3>{`${p.itemsPrice} руб.`}</h3></div>
         <div className='tax'><p>Налог 5%:</p><h3>{`${Math.round(p.itemsPrice*(5/100))} руб.`}</h3></div>
         <button onClick={p.BasketOrderFunc}>Оформить заказ<img src='./img/arrow-r.svg' alt='arrow'></img></button>
      </div>
   </div>
   )
}

export default BasketOrder;