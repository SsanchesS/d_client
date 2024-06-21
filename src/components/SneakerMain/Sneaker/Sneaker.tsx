import React,{useState,FC} from "react"
import s from './Sneaker.module.sass'
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { useNavigate } from 'react-router-dom'
import {setSneakers_basket} from "../../../store/reducers/SneakersSlice"
import { get_sneakers_basket_full } from "../../../service/servise"
import { ISneaker } from "../../../types/types"

interface proops{
  id: number,
  des: string
  price: number,
  img: string
  category_id: number,
  setMessageError: (message:string)=>void
}
const Sneaker:FC<proops>=(p) =>{                                         // почему здесь never
  const navigate = useNavigate()
  const user = useAppSelector(state=>state.UserReducer)
  const sneakers = useAppSelector(state=>state.SneakersReducer)
  const dispatch = useAppDispatch()

  const sneakers_basket:number[] = sneakers.sneakers_basket || []
  const sneakers_basket_full:ISneaker[] = sneakers.sneakers && sneakers.sneakers_basket ? get_sneakers_basket_full(sneakers.sneakers,sneakers.sneakers_basket) : []

const add_sneaker = async()=>{
  if(!user.id){
    navigate("/auth",{replace:true})
  }else{
    try {      
      const new_sneakers_basket = [...sneakers_basket, p.id];
      dispatch(setSneakers_basket(new_sneakers_basket))
    } catch (error) {
      p.setMessageError("Ошибка")
      console.log(error)
    }
  }
}

const del_sneaker =async()=>{
  if(!user.id){
    navigate("/auth",{replace:true})
  }else{
    try {
      const new_sneakers_basket = sneakers_basket_full?.filter(item=>item.id!==p.id).map(el=>el.id) || []
      dispatch(setSneakers_basket(new_sneakers_basket))      
    } catch (error) {
      p.setMessageError("Ошибка")
      console.log(error)
    }
  }
}

return (
  <div className={`${s.sneakers_card}`} onClick={sneakers_basket_full?.some(i=>i.id===p.id) ? del_sneaker:add_sneaker}>
    <div className={`${s.sneakers_bg}`}><img src={p.img} alt="sneaker"></img></div>
    <div className={`${s.des}`}><p><b>{p.id}</b>&nbsp;{p.des}</p></div>
    <div className={`${s.price_wrap}`}>
      <div className={`${s.price}`}>
        <p>Цена:</p>
        <h3>{p.price} руб.</h3>
      </div>
      {sneakers_basket_full?.some(i=>i.id===p.id) ? <button className={`${s.isAdd_bg} ${s.active}`}></button> : <button className={`${s.isAdd_bg}`}></button>}    
    </div>
  </div>
  );
}
export default Sneaker;    