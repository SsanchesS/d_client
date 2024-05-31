import React from "react"
import s from './Sneaker.module.sass'
import { useAppSelector } from "../../../hooks/hooks"
import { useNavigate } from 'react-router-dom'
function Sneaker(p) {
  const navigate = useNavigate()
  const user = useAppSelector(state=>state.UserReducer)
  let [isAdd,setisAdd] = React.useState(false)
  let add_sneaker =()=>{
    console.log("add_sneaker")
    if(!user.id){
      navigate("/auth",{replace:true})
    }
    // setisAdd(isAdd=>!isAdd)
    setisAdd(true)
    // p.callSetSneakers_basket(p.des, p.price, p.img) Положить в корзину
  }
  let del_sneaker =()=>{
    console.log("del_sneaker")
    if(!user.id){
      navigate("/auth",{replace:true})
    }
    // setisAdd(isAdd=>!isAdd)
    setisAdd(true)
    // p.callSetSneakers_basket(p.des, p.price, p.img) Положить в корзину
  }
return (
  <div className={`${s.sneakers_card}`} onClick={user.sneakers_basket?.some(i=>i.id===p.id) ? del_sneaker:add_sneaker}>
    <div className={`${s.sneakers_bg}`}><img src={p.img} alt="sneaker"></img></div>
    <div className={`${s.des}`}><p>{p.des}</p></div>
    <div className={`${s.price_wrap}`}>
      <div className={`${s.price}`}>
        <p>Цена:</p>
        <h3>{p.price} руб.</h3>
      </div>
      {user.sneakers_basket?.some(i=>i.id===p.id) ? <button className={`${s.isAdd_bg} ${s.active}`}></button> : <button className={`${s.isAdd_bg}`}></button>}    
    </div>
  </div>
  );
}
export default Sneaker;
    