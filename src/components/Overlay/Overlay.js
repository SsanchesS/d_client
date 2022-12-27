import SneakerBasket from './SneakerBasket/SneakerBasket';

function Overlay(p){
// let find_over =()=>{
//    if(p.sneakers_basket){

//    }
// }
return(
   <div className={p.overlaySwitch ? 'overlay': "overlay hide"}>
      <div className='opacity' onClick={p.closebasket}></div>
      <div className='right-basket'>

      <h2>Корзина</h2>
      <div className='sneaker-basket-wrap'>{
      p.sneakers_basket.map((obj,index)=>{
         return(
         <SneakerBasket key ={index} des = {obj["name"]} price = {obj["price"]} img = {obj["img"]}/>
      )})
      }
      </div>
      <div className='order-wrap'>
         <div className='result'><p>Итого:</p><h3>21 498 руб.</h3></div>
         <div className='tax'><p>Налог 5%:</p><h3>1074 руб.</h3></div>
         <button>Оформить заказ<img src='./img/arrow.svg' alt='arrow'></img></button>
         </div>
         
      </div>
   </div>
   )
}

export default Overlay;