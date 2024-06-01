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
return(
   <div className={sneakers.overlaySwitch ? `${s.overlay}`: `${s.overlay} hide`}>
      <div className={`${s.opacity}`} onClick={closebasket}></div>
      <div className= {`${s.right_basket}`}>
         <h2>Корзина</h2>
         {
            user.sneakers_basket ? <BasketOrder sneakers_basket={user.sneakers_basket} closebasket={closebasket}/> // orderNum={user.orderNum}
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