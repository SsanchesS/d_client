import {useState} from 'react'
import Header from "../../../components/Header/Header";
import {adminApi} from "../../../store/api/admin.api"

const AdminRoles=()=>{
   const [MessageError,setMessageError] = useState('')
   const [id,setid] = useState(0)
   const [role,setrole] = useState("")

   const [GetRole_admin,{data:getRole_data,isLoading:getRole_isLoading,error:getRole_error}] = adminApi.useLazyGetRole_adminQuery()
   const get=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await GetRole_admin(id).unwrap()
         if(data.code >= 400){
            setMessageError(`${data.code}: ${data.message}`)
            return
         }else if (data.role){
            setMessageError(data.message)          
            setrole(data.role.role!)
         }            
      } catch (error:any) {
         setMessageError("Ошибка")
         setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         console.log(error)
      }
   }
   
   const [CreateRole_admin,{data:createRole_data,isLoading:createRole_isLoading,error:createRole_error}] = adminApi.useCreateRole_adminMutation()
   const create=async()=>{
      if (!role){
         setMessageError("Введи данные")
         return
      }
      try {   
         const data = await CreateRole_admin({role}).unwrap()
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
   const [UpdRole_admin,{data:updRole_data,isLoading:updRole_isLoading,error:updRole_error}] = adminApi.useUpdRole_adminMutation()
   const upd=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await UpdRole_admin({id:id,role:{role}}).unwrap()
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

   const [DelRole_admin,{data:delRole_data,isLoading:delRole_isLoading,error:delRole_error}] = adminApi.useDelRole_adminMutation()
   const del=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await DelRole_admin(id).unwrap()
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
      <div className='mb10px'><h2 className='mr10px'>Роль: </h2><input type="text" placeholder='Роль' value={role} onChange={e=>setrole(e.target.value)}/></div>
   </div>
   <div className="buttons">
      <div className={`Adminbutton mt10px mr10px`}><button onClick={get}>Получить</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={create}>Создать</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={upd}>Обновить</button></div>
      <div className={`Adminbutton mt10px`}><button onClick={del}>Удалить</button></div>
   </div>
</div>
)}
export default AdminRoles;