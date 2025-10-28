import {useState} from 'react'
import Header from "../../../components/Header/Header";
import {adminApi} from "../../../store/api/admin.api"

const AdminCategories=()=>{
   const [MessageError,setMessageError] = useState('')
   const [id,setid] = useState(0)
   const [name,setname] = useState("")
   const [des,setdes] = useState("")
   
   const [GetCategory_admin,{data:getCategory_data,isLoading:getCategory_isLoading,error:getCategory_error}] = adminApi.useLazyGetCategory_adminQuery()
   const get=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await GetCategory_admin(id).unwrap()
         if(data.code >= 400){
            setMessageError(`${data.code}: ${data.message}`)
            return
         }else if (data.category){
            setMessageError(data.message)          
            setname(data.category?.name!)
            setdes(data.category?.des!)
         }            
      } catch (error:any) {
         setMessageError("Ошибка")
         setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         console.log(error)
      }
   }
   
   const [CreateCategory_admin,{data:createCategory_data,isLoading:createCategory_isLoading,error:createCategory_error}] = adminApi.useCreateCategory_adminMutation()
   const create=async()=>{
      if (!(name||des)){
         setMessageError("Введи данные")
         return
      }
      try {   
         const data = await CreateCategory_admin({name,des}).unwrap()
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
   const [UpdCategory_admin,{data:updCategory_data,isLoading:updCategory_isLoading,error:updCategory_error}] = adminApi.useUpdCategory_adminMutation()
   const upd=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await UpdCategory_admin({id:id,category:{name,des}}).unwrap()
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

   const [DelCategory_admin,{data:delCategory_data,isLoading:delCategory_isLoading,error:delCategory_error}] = adminApi.useDelCategory_adminMutation()
   const del=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await DelCategory_admin(id).unwrap()
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
      <div className='mb10px mr10px'><h2 className='mr10px'>Название: </h2><input type="text" placeholder='Название' value={name} onChange={e=>setname(e.target.value)}/></div>
      <div className='mb10px'><h2 className='mr10px'>Описание: </h2><input type="text" placeholder='Описание' value={des} onChange={e=>setdes(e.target.value)}/></div>
   </div>
   <div className="buttons">
      <div className={`Adminbutton mt10px mr10px`}><button onClick={get}>Получить</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={create}>Создать</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={upd}>Обновить</button></div>
      <div className={`Adminbutton mt10px`}><button onClick={del}>Удалить</button></div>
   </div>
</div>
)}
export default AdminCategories;