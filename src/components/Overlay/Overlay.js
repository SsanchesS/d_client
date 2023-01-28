import axios from "axios"
import BasketOrder from "./BasketOrder/BasketOrder"
import BasketOrderReadyUnReady from "./BasketOrderReadyUnReady/BasketOrderReadyUnReady"

function Overlay(p){
      
   let helpFunc=()=>{
   if(p.sneakers_basket.length!==0 && p.tf===false) { return (
      <BasketOrder
      sneakers_basket={p.sneakers_basket}
      callDelSneakers_basket={p.callDelSneakers_basket}
      itemsPrice={p.itemsPrice}
      BasketOrderFunc={p.BasketOrderFunc}
      />) }
      else if(p.tf){ 
      // p.sneakers_basket.forEach(item=>axios.delete(`https://63a0a96a24d74f9fe83eb686.mockapi.io/card/${item.id}`))
      return(
      //Ready
      <BasketOrderReadyUnReady
      img="img/Ready.svg"
      h2="Заказ оформлен!"
      p1= {`Ваш заказ #${p.orderNum} скоро будет передан`}
      p2="курьерской доставке"   
      closebasket={p.closebasket}
      />) }
      else if(p.tf===false){ return (
      //UnReady
      <BasketOrderReadyUnReady
      img="img/UnReady.svg"
      h2="Корзина пустая"
      p1="Добавьте хотя бы одну пару"
      p2="кроссовок, чтобы сделать заказ."
      closebasket={p.closebasket}
      />) }
   }
return(
   <div className={p.overlaySwitch ? 'overlay': "overlay hide"}>
      <div className='opacity' onClick={p.closebasket}></div>
      <div className='right-basket'>
         <h2>Корзина</h2>
         {helpFunc()}
      </div>
   </div>
   )
}

export default Overlay;