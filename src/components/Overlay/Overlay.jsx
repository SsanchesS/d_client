import { useAppSelector } from "../../hooks/hooks"
import BasketOrder from "./BasketOrder/BasketOrder"
import BasketOrderReadyUnReady from "./BasketOrderReadyUnReady/BasketOrderReadyUnReady"
import s from './Overlay.module.sass'

function Overlay(){
   const state = useAppSelector(state=>state.UserReducer)
let helpFunc=()=>{
if(state.sneakers_basket.length!==0) { return ( //  && state.tf===false
   <BasketOrder
   sneakers_basket={state.sneakers_basket}
   // callDelSneakers_basket={state.callDelSneakers_basket}
   itemsPrice={state.itemsPrice}
   // BasketOrderFunc={state.BasketOrderFunc}
   />) }
   else if(state.overlaySwitch){ // state.tf 
      // axios.put(`https://63a0a96a24d74f9fe83eb686.mockapi.io/card`,[])  // удаляем все из корзины если прошел заказ (но это не точно)
   return(
   //Ready
   <BasketOrderReadyUnReady
   img="img/Ready.svg"
   h2="Заказ оформлен!"
   // p1= {`Ваш заказ #${state.orderNum} скоро будет передан`}
   p2="курьерской доставке"   
   // closebasket={closebasket}
   />) }
   else if(state.tf===false){ return (
   //UnReady
   <BasketOrderReadyUnReady
   img="img/UnReady.svg"
   h2="Корзина пустая"
   p1="Добавьте хотя бы одну пару"
   p2="кроссовок, чтобы сделать заказ."
   // closebasket={closebasket}
   />) }
}
return(
   <div className={state.overlaySwitch ? `${s.overlay}`: `${s.overlay} hide`}>
      {/* <div className={`${s.opacity}`} onClick={state.closebasket}></div> */}
      <div className= {`${s.right_basket}`}>
         <h2>Корзина</h2>
         {helpFunc()}
      </div>
   </div>
   )
}

export default Overlay;