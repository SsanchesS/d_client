import {useState} from 'react'
import Header from "../../../components/Header/Header";
import {adminApi} from "../../../store/api/admin.api"

const AdminDelivery_methods=()=>{
   const [MessageError,setMessageError] = useState('')
   const [id,setid] = useState(0)
   const [method_des,setmethod_des] = useState("")
   
   const [GetDelivery_method_admin,{data:getDelivery_method_data,isLoading:getDelivery_method_isLoading,error:getDelivery_method_error}] = adminApi.useLazyGetDelivery_method_adminQuery()
   const get=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await GetDelivery_method_admin(id).unwrap()
         if(data.code >= 400){
            setMessageError(`${data.code}: ${data.message}`)
            return
         }else if (data.delivery_method){
            setMessageError(data.message)          
            setmethod_des(data.delivery_method?.method_des!)
         }            
      } catch (error:any) {
         setMessageError("Ошибка")
         setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         console.log(error)
      }
   }
   
   const [CreateDelivery_method_admin,{data:createDelivery_method_data,isLoading:createDelivery_method_isLoading,error:createDelivery_method_error}] = adminApi.useCreateDelivery_method_adminMutation()
   const create=async()=>{
      if (!method_des){
         setMessageError("Введи данные")
         return
      }
      try {   
         const data = await CreateDelivery_method_admin({method_des}).unwrap()
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
   const [UpdDelivery_method_admin,{data:updDelivery_method_data,isLoading:updDelivery_method_isLoading,error:updDelivery_method_error}] = adminApi.useUpdDelivery_method_adminMutation()
   const upd=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await UpdDelivery_method_admin({id:id,delivery_method:{method_des}}).unwrap()
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

   const [DelDelivery_method_admin,{data:delDelivery_method_data,isLoading:delDelivery_method_isLoading,error:delDelivery_method_error}] = adminApi.useDelDelivery_method_adminMutation()
   const del=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await DelDelivery_method_admin(id).unwrap()
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
      <div className='mb10px'><h2 className='mr10px'>Описание: </h2><input type="text" placeholder='Описание' value={method_des} onChange={e=>setmethod_des(e.target.value)}/></div>
   </div>
   <div className="buttons">
      <div className={`Adminbutton mt10px mr10px`}><button onClick={get}>Получить</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={create}>Создать</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={upd}>Обновить</button></div>
      <div className={`Adminbutton mt10px`}><button onClick={del}>Удалить</button></div>
   </div>
</div>
)}
export default AdminDelivery_methods;