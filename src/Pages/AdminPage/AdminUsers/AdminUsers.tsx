import {useState} from 'react'
import Header from "../../../components/Header/Header"
import {adminApi} from "../../../store/api/admin.api"

const AdminUsers=()=>{
   const [MessageError,setMessageError] = useState('')
   const [id,setid] = useState(0)
   const [f_name,setf_name] = useState("")
   const [s_name,sets_name] = useState("")
   const [email,setemail] = useState("")
   const [password,setpassword] = useState("")
   const [role_id,setrole_id] = useState(1)

   const [GetUser_admin,{data:getUser_data,isLoading:getUser_isLoading,error:getUser_error}] = adminApi.useLazyGetUser_adminQuery()
   const get=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await GetUser_admin(id).unwrap()
         if(data.code >= 400){
            setMessageError(`${data.code}: ${data.message}`)
            return
         }else if (data.user){
            setMessageError(data.message)          
            setf_name(data.user.f_name!)
            sets_name(data.user.s_name!)
            setemail(data.user.email!)
            setpassword(data.user.password!)
            setrole_id(data.user.role_id!)
         }            
      } catch (error:any) {
         setMessageError("Ошибка")
         setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         console.log(error)
      }
   }
   
   const [CreateUser_admin,{data:createUser_data,isLoading:createUser_isLoading,error:createUser_error}] = adminApi.useCreateUser_adminMutation()
   const create=async()=>{
      if (!(id || f_name || s_name || email || password)){
         setMessageError("Введи данные")
         return
      }
      try {
         const role_id_number = role_id && Number(role_id)
         if (isNaN(role_id_number)){
            setMessageError("Введи роль id")
            return
         }
         const data = await CreateUser_admin({f_name,s_name,email,password,role_id:role_id_number}).unwrap()
         if(data.code >= 400){
            setMessageError(`${data.code}: ${data.message}`)
            return
         }else{
            setMessageError(data.message)
         }
      }catch (error:any) {
         setMessageError("Ошибка")
         setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         console.log(error)
      }
   }
   const [UpdUser_admin,{data:updUser_data,isLoading:updUser_isLoading,error:updUser_error}] = adminApi.useUpdUser_adminMutation()
   const upd=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         let role_id_number = 1
         role_id ? role_id_number = Number(role_id) : role_id_number = 1
         if (!role_id_number){
            setMessageError("Введи role_id")
            return
         }
         const data = await UpdUser_admin({id:id,user:{f_name,s_name,email,password,role_id:role_id_number}}).unwrap()
         if(data.code >= 400){
            setMessageError(`${data.code}: ${data.message}`)
            return
         }else{
            setMessageError(data.message)
         }
      } catch (error:any) {
         setMessageError("Ошибка")
         setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         console.log(error)
      }
   }

   const [DelUser_admin,{data:delUser_data,isLoading:delUser_isLoading,error:delUser_error}] = adminApi.useDelUser_adminMutation()
   const del=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await DelUser_admin(id).unwrap()
         if(data.code >= 400){
            setMessageError(`${data.code}: ${data.message}`)
            return
         }else{
            setMessageError(data.message)
         }
      } catch (error:any) {
         setMessageError("Ошибка")
         setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         console.log(error)
      }
   }
return(
<div className={`AdminManager`}>
   <Header admin={true}/>
   <div className={`${MessageError ? '' : 'hide'} red`}><p className='mb10px'>{MessageError}</p></div>
   <div className={`inputs_block mt10px`}>
      <div className='mb10px mr10px'><h2 className='mr10px'>id: </h2><input type="text" placeholder='id' value={id} onChange={e=>setid(Number(e.target.value))}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>Имя: </h2><input type="text" placeholder='Имя' value={f_name} onChange={e=>setf_name(e.target.value)}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>Фамилия: </h2><input type="text" placeholder='Фамилия' value={s_name} onChange={e=>sets_name(e.target.value)}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>email: </h2><input type="text" placeholder='email' value={email} onChange={e=>setemail(e.target.value)}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>password: </h2><input type="text" placeholder='password' value={password} onChange={e=>setpassword(e.target.value)}/></div>
      <div className='mb10px'><h2 className='mr10px'>role_id: </h2><input type="text" placeholder='role_id' value={role_id} onChange={e=>setrole_id(Number(e.target.value))}/></div>
   </div>
   <div className="buttons">
      <div className={`Adminbutton mt10px mr10px`}><button onClick={get}>Получить</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={create}>Создать</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={upd}>Обновить</button></div>
      <div className={`Adminbutton mt10px`}><button onClick={del}>Удалить</button></div>
   </div>
</div>
)}
export default AdminUsers