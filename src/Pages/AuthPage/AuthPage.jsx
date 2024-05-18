import React,{useState,FC} from 'react'
import s from './AuthPage.module.sass'
import { useAppDispatch } from '../../hooks/hooks'

import {guestApi} from "../../store/api/guest.api"
import {setUser} from "../../store/reducers/UserSlice"
import { Link,useNavigate } from 'react-router-dom'

const AuthPage = () => { // :FC
const dispatch = useAppDispatch()
const navigate = useNavigate()

const [email,setemail] = useState('')
const [password,setpassword] = useState('')

const [MessageError,setMessageError] = useState('')

//
const [auth,{data,isLoading,error}] = guestApi.useAuthMutation()
//
const onClick_auth = async()=>{
  if (!(email && password)){
    setMessageError("Введи поля корректно!")
    return
  }else if(email.length < 5){
    setMessageError("Введи верный email !")
    return
  }else if(password.length < 8 || password.length > 32){
    setMessageError("Введи пароль от 8 до 32 символов!")
    return
  }
  try{
    const user = {password, email}
    const onfulfilled = await auth(user)
    if(onfulfilled.error){
      setMessageError(`${onfulfilled.error.status}: ${onfulfilled.error.data.detail[0].type}: ${onfulfilled.error.data.detail[0].msg}`)
      return
    }else if(onfulfilled.data.code >= 400){
      setMessageError(`${onfulfilled.data.code}: ${onfulfilled.data.message}`)
      return
    }
    const id = onfulfilled.data.user.id
    setMessageError(onfulfilled.data.message)

    dispatch(setUser(onfulfilled.data.user))
    navigate(`/`,{replace:true})
  }catch (error) { //:any
      setMessageError("Ошибка")
      console.log(error)
    }
}
return (
  <>
  <div className={`card ${s.center}`}>
    <div className={s.AuthPage}>

      <div className={s.header}>
        <div className={s.logo}>
          <a href="#"><img src="/img/logo.png" alt="logo" /></a>          
        </div>
        <div className={`${s.text} flex`}>
          <h1>Вход в</h1>
          <h1 className="flex"><div className={"w_y"}>К</div><div className={"b_y"}>Р</div><div className={"w_y"}>О</div><div className={"b_y"}>С</div><div className={"b_y"}>С</div><div className={"w_y"}>О</div><div className={"b_y"}>В</div><div className={"w_y"}>К</div><div className={"b_y"}>И</div></h1>
        </div>
        <div className={`button`}><Link to={"/registration"}><button>Зарегистрироваться</button></Link></div>               
      </div>
      
      <h2 className={ `${s.text} white ${isLoading ? "" : "vis_none"}` }>Загрузка...</h2>

      <div className={s.inputs}>
        <div className='mb10px'><input type="text" placeholder='email' value={email} onChange={e=>setemail(e.target.value)}/></div>
        <div className='mb10px'><input type="password" placeholder='password' value={password} onChange={e=>setpassword(e.target.value)}/></div>
      </div>
      <div className={`${MessageError ? '' : 'hide'} red`}><p className='mb10px'>{MessageError}</p></div>
      <div className={`button`}><button onClick={onClick_auth}>Войти</button></div>
    </div>
  </div>
  </>
)
}
export default AuthPage