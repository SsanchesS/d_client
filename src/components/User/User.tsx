import {useState,FC} from 'react'
import s from "./User.module.sass"
import { useNavigate } from 'react-router-dom'
import { useAppDispatch,useAppSelector } from "../../hooks/hooks"
import {userApi} from "../../store/api/user.api"
import {setUser} from "../../store/reducers/UserSlice"

interface proops{
   setMessageError:(message:string)=>void
}
const User:FC<proops>=(p)=>{
   const user = useAppSelector(state=>state.UserReducer)
   const dispatch = useAppDispatch()

   const [f_name,setf_name] = useState(user.f_name)
   const [s_name,sets_name] = useState(user.s_name)
   const [email,setemail] = useState(user.email)
   const [password,setpassword] = useState(user.password)

   const [updUser,{data,isLoading,error}] = userApi.useUpdUserMutation()
   const edit=async()=>{
      try {   
         const data = await updUser({id:user.id,user:{f_name,s_name,email,password}}).unwrap()
         if(data.code >= 400){
           p.setMessageError(`${data.code}: ${data.message}`)
           return
         }else if(data.user){
            p.setMessageError(data.message)                
            dispatch(setUser({id:user.id,f_name,s_name,email,password}))
         }         
       } catch (error:any) {
         p.setMessageError("Ошибка")
         p.setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         console.log(error)
       }
   }
   const navigate = useNavigate()
   const logOut=()=>{
      const user = {id: 0, f_name: "", s_name: "", email: "", password: "", role_id: 1}
      dispatch(setUser(user))
      navigate("/",{replace:true})
   }
return(
<div className={`${s.User} mt10px`}>
   <div className={`${s.button} mb10px`}><button onClick={logOut}>Выход</button></div>
   <div className={`${s.inputs_block}`}>
      <div className='mb10px mr10px'><h2 className='mr10px'>Имя: </h2><input type="text" placeholder='Имя' value={f_name} onChange={e=>setf_name(e.target.value)}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>Фамилия: </h2><input type="text" placeholder='Фамилия' value={s_name} onChange={e=>sets_name(e.target.value)}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>email: </h2><input type="text" placeholder='email' value={email} onChange={e=>setemail(e.target.value)}/></div>
      <div className='mb10px'><h2 className='mr10px'>password: </h2><input type="text" placeholder='password' value={password} onChange={e=>setpassword(e.target.value)}/></div>
   </div>
   <div className={`${s.button} mt10px`}><button onClick={edit}>Редактировать</button></div>
</div>
)}
export default User