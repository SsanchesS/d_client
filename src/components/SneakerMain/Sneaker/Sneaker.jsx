import React,{useState,FC} from "react"
import s from './Sneaker.module.sass'
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { useNavigate } from 'react-router-dom'
import {userApi} from "../../../store/api/user.api"
import {setUser} from "../../../store/reducers/UserSlice"

function Sneaker(p) {
  const navigate = useNavigate()
  const user = useAppSelector(state=>state.UserReducer)
  const dispatch = useAppDispatch()

  const [updUser,{data,isLoading,error}] = userApi.useUpdUserMutation()

const add_sneaker = async()=>{
  if(!user.id){
    navigate("/auth",{replace:true})
  }else{
    try {
      const id_sneakers_basket = user.sneakers_basket.map(el=>el.id)
      const user_sneakers_basket = [...id_sneakers_basket, p.id]

      const onfulfilled = await updUser({id:user.id,user:{sneakers_basket:JSON.stringify(user_sneakers_basket)}})
      if(onfulfilled.error){
        p.setMessageError(`${onfulfilled.error.status}: ${onfulfilled.error.data.detail[0].type}: ${onfulfilled.error.data.detail[0].msg}`)
        return
      }else if(onfulfilled.data.code >= 400){
        p.setMessageError(`${onfulfilled.data.code}: ${onfulfilled.data.message}`)
        return
      }
      p.setMessageError(onfulfilled.data.message)

      // const data = parseData(onfulfilled.data.user)
      
      dispatch(setUser({sneakers_basket:[...user.sneakers_basket,{id:p.id, des:p.des, price:p.price, img:p.img, category_id:p.category_id}]}))
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
      const id_sneakers_basket = user.sneakers_basket.map(el=>el.id)
      const user_sneakers_basket = id_sneakers_basket.filter(item=>item!==p.id)
      
      const onfulfilled = await updUser({id:user.id,user:{sneakers_basket:JSON.stringify(user_sneakers_basket)}})
      if(onfulfilled.error){
        p.setMessageError(`${onfulfilled.error.status}: ${onfulfilled.error.data.detail[0].type}: ${onfulfilled.error.data.detail[0].msg}`)
        return
      }else if(onfulfilled.data.code >= 400){
        p.setMessageError(`${onfulfilled.data.code}: ${onfulfilled.data.message}`)
        return
      }
      p.setMessageError(onfulfilled.data.message)

      // const data = parseData(onfulfilled.data.user)
      const new_sneakers_basket = user.sneakers_basket.filter(item=>item.id!==p.id)
      dispatch(setUser({sneakers_basket:new_sneakers_basket}))
      
    } catch (error) {
      p.setMessageError("Ошибка")
      console.log(error)
    }
  }
}

return (
  <div className={`${s.sneakers_card}`} onClick={user.sneakers_basket?.some(i=>i.id===p.id) ? del_sneaker:add_sneaker}>
    <div className={`${s.sneakers_bg}`}><img src={p.img} alt="sneaker"></img></div>
    <div className={`${s.des}`}><p><b>{p.id}</b>&nbsp;{p.des}</p></div>
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