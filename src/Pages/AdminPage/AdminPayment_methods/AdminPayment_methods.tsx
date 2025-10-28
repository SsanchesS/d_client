import {useState} from 'react'
import Header from "../../../components/Header/Header";
import {adminApi} from "../../../store/api/admin.api"

const AdminPayment_methods=()=>{
   const [MessageError,setMessageError] = useState('')
   const [id,setid] = useState(0)
   const [method_des,setmethod_des] = useState("")
   
   const [GetPayment_method_admin,{data:getPayment_method_data,isLoading:getPayment_method_isLoading,error:getPayment_method_error}] = adminApi.useLazyGetPayment_method_adminQuery()
   const get=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await GetPayment_method_admin(id).unwrap()
         if(data.code >= 400){
            setMessageError(`${data.code}: ${data.message}`)
            return
         }else if (data.payment_method){
            setMessageError(data.message)          
            setmethod_des(data.payment_method?.method_des!)
         }            
      } catch (error:any) {
         setMessageError("Ошибка")
         setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         console.log(error)
      }
   }
   
   const [CreatePayment_method_admin,{data:createPayment_method_data,isLoading:createPayment_method_isLoading,error:createPayment_method_error}] = adminApi.useCreatePayment_method_adminMutation()
   const create=async()=>{
      if (!method_des){
         setMessageError("Введи данные")
         return
      }
      try {   
         const data = await CreatePayment_method_admin({method_des}).unwrap()
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
   const [UpdPayment_method_admin,{data:updPayment_method_data,isLoading:updPayment_method_isLoading,error:updPayment_method_error}] = adminApi.useUpdPayment_method_adminMutation()
   const upd=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await UpdPayment_method_admin({id:id,payment_method:{method_des}}).unwrap()
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

   const [DelPayment_method_admin,{data:delPayment_method_data,isLoading:delPayment_method_isLoading,error:delPayment_method_error}] = adminApi.useDelPayment_method_adminMutation()
   const del=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await DelPayment_method_admin(id).unwrap()
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
export default AdminPayment_methods;