import React from "react"
import s from './Sneaker.module.sass'
function Sneaker(p) {
  let [isAdd,setisAdd] = React.useState(false)
  let add_sneaker =()=>{
    // setisAdd(isAdd=>!isAdd)
    setisAdd(true)
    // p.callSetSneakers_basket(p.des, p.price, p.img) Положить в корзину
  }
return (
  <div className={`${s.sneakers_card}`}>
    <div className={`${s.sneakers_bg}`}><img src={p.img} alt="sneaker"></img></div>
    <div className={`${s.des}`}><p>{p.des}</p></div>
    <div className={`${s.price_wrap}`}>
      <div className={`${s.price}`}>
        <p>Цена:</p>
        <h3>{p.price} руб.</h3>
      </div>
      {p.callSetSneakers_basket ? <button className={isAdd ? `${s.isAdd_bg} ${s.active}`: `${s.isAdd_bg}`} onClick={add_sneaker}></button> : null} {/* это хз что пока */}      
    </div>
  </div>
  );
}
export default Sneaker;
    