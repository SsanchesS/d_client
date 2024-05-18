import React, { FC,useState,useRef } from 'react'
import s from './RegistrationPage.module.sass'
import { useAppDispatch } from '../../hooks/hooks'

import {guestApi} from "../../store/api/guest.api"
import {setUser} from "../../store/reducers/UserSlice"
import { Link,useNavigate } from 'react-router-dom'

const RegistrationPage = () => {               // :FC
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [f_name,set_f_name] = useState('')
  const [s_name,set_s_name] = useState('')
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')

  const [MessageError,setMessageError] = useState('')

  // 
  const [registration,{data,isLoading,error}] = guestApi.useRegistrationMutation()
  //

  const onClick_registration = async()=>{

    if(!(f_name && s_name && email && password)){
      setMessageError("Введи поля корректно!")
      return
    }else if(email.length < 5){
      setMessageError("Введи верный email !")
      return
    }else if(password.length < 8 || password.length > 32){
      setMessageError("Введи пароль от 8 до 32 символов!")
      return
    }else if(f_name.length < 2 || s_name.length < 2){
      setMessageError("Ваше имя слишком мало!")
      return
    }

    const registration_data = {f_name,s_name,email,password} // Partial<IUser>

    try {
      await registration(registration_data).then(onfulfilled=>{ // data or error                                     ////////////////////////////////////// ПОПРОБОВАТЬ БЕЗ then //////////////////////////////////////
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
      })
    } catch (error) { //:any
        setMessageError("Ошибка")
        console.log(error)
    }
}
return (
  <>
  <div className={`card ${s.center}`}>

    <div className={s.RegistrationPage}>

      <div className={s.header}>
        <div className={s.logo}>
          <a href="#"><img src="/img/logo.png" alt="logo" /></a>          
        </div>
        <div className={s.text}>
          <div className="flex">
            <h1>Впервые в</h1>
            <h1 className="flex"><div className={"w_y"}>К</div><div className={"b_y"}>Р</div><div className={"w_y"}>О</div><div className={"b_y"}>С</div><div className={"b_y"}>С</div><div className={"w_y"}>О</div><div className={"b_y"}>В</div><div className={"w_y"}>К</div><div className={"b_y"}>И</div></h1> 
          </div>
          <p>Моментальная регистрация</p>
        </div>
        <div className={`button`}><Link to={"/auth"}><button>Войти</button></Link></div>               
      </div>

      <h2 className={ `${s.text} white ${isLoading ? "" : "vis_none"}` }>Загрузка...</h2>

      <div className={s.inputs}>
        <div className='mb10px'><input type="text" placeholder='Ваше имя' value={f_name} onChange={e=>set_f_name(e.target.value)}/></div>
        <div className='mb10px'><input type="text" placeholder='Ваша фамилия' value={s_name} onChange={e=>set_s_name(e.target.value)}/></div>

        <div className='mb10px'><input type="text" placeholder='email' value={email} onChange={e=>setemail(e.target.value)}/></div>
        <div className='mb10px'><input type="password" placeholder='password' value={password} onChange={e=>setpassword(e.target.value)}/></div>
      </div>
      
      <div className={`button`}><button onClick={onClick_registration} disabled={isLoading}>Зарегистрироваться</button></div>
      
      <div className={`${MessageError ? '' : 'vis_none'} red`}><p className={`mt10px ${s.MessageError}`}>{MessageError}</p></div>
    </div>

  </div>
  </>
)
}
export default RegistrationPage