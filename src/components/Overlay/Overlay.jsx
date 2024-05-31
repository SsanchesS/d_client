import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import BasketOrder from "./BasketOrder/BasketOrder"
import BasketOrderReadyUnReady from "./BasketOrderReadyUnReady/BasketOrderReadyUnReady"
import s from './Overlay.module.sass'
import {overlaySwitch} from "../../store/reducers/SneakersSlice"

function Overlay(){
   const dispatch = useAppDispatch()
   const user = useAppSelector(state=>state.UserReducer)
   const sneakers = useAppSelector(state=>state.SneakersReducer)

   const closebasket=()=>{
      dispatch(overlaySwitch(false))
   }


let helpFunc=()=>{
   if(user.sneakers_basket.length!==0) { return (<BasketOrder sneakers_basket={user.sneakers_basket} itemsPrice={user.itemsPrice}/>) 
   }else if(sneakers.overlaySwitch){
   return(
   // //Ready
   // <BasketOrderReadyUnReady
   // img="img/Ready.svg"
   // h2="Заказ оформлен!"
   // // p1= {`Ваш заказ #${state.orderNum} скоро будет передан`}
   // p2="курьерской доставке"   
   // // closebasket={closebasket}
   // />) }
   // else if(sneakers.tf===false){ return (
   // //UnReady
   // <BasketOrderReadyUnReady
   // img="img/UnReady.svg"
   // h2="Корзина пустая"
   // p1="Добавьте хотя бы одну пару"
   // p2="кроссовок, чтобы сделать заказ."
   // // closebasket={closebasket}
   // />)
  
      //UnReady
      <BasketOrderReadyUnReady
      img="img/UnReady.svg"
      h2="Корзина пустая"
      p1="Добавьте хотя бы одну пару"
      p2="кроссовок, чтобы сделать заказ."
      closebasket={closebasket}
      />
)}}
return(
   <div className={sneakers.overlaySwitch ? `${s.overlay}`: `${s.overlay} hide`}>
      <div className={`${s.opacity}`} onClick={closebasket}></div>
      <div className= {`${s.right_basket}`}>
         <h2>Корзина</h2>
         {/* {helpFunc()} */}
         {                          // !==0
            user.sneakers_basket?.length ? <BasketOrder sneakers_basket={user.sneakers_basket} itemsPrice={user.itemsPrice}/>
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