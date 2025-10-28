import {useState} from 'react'
import Header from "../../../components/Header/Header";
import {adminApi} from "../../../store/api/admin.api"

const AdminPromotions=()=>{
   const [MessageError,setMessageError] = useState('')
   const [id,setid] = useState(0)
   const [name,setname] = useState("")
   const [des,setdes] = useState("")
   const [discount,setdiscount] = useState(0)
   
   const [GetPromotion_admin,{data:getPromotion_data,isLoading:getPromotion_isLoading,error:getPromotion_error}] = adminApi.useLazyGetPromotion_adminQuery()
   const get=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await GetPromotion_admin(id).unwrap()
         if(data.code >= 400){
            setMessageError(`${data.code}: ${data.message}`)
            return
         }else if (data.promotion){
            setMessageError(data.message)          
            setname(data.promotion?.name!)
            setdes(data.promotion?.des!)
            setdiscount(data.promotion?.discount!)
         }            
      } catch (error:any) {
         setMessageError("Ошибка")
         setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         console.log(error)
      }
   }
   
   const [CreatePromotion_admin,{data:createPromotion_data,isLoading:createPromotion_isLoading,error:createPromotion_error}] = adminApi.useCreatePromotion_adminMutation()
   const create=async()=>{
      if (!(name || des || discount)){
         setMessageError("Введи данные")
         return
      }
      try {   
         const discount_number = discount && Number(discount)
         if (isNaN(discount_number)){
            setMessageError("Введи скидку")
            return
         }
         const data = await CreatePromotion_admin({name,des,discount}).unwrap()
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
   const [UpdPromotion_admin,{data:updPromotion_data,isLoading:updPromotion_isLoading,error:updPromotion_error}] = adminApi.useUpdPromotion_adminMutation()
   const upd=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const discount_number = discount && Number(discount)
         if (isNaN(discount_number)){
            setMessageError("Введи скидку")
            return
         }
         const data = await UpdPromotion_admin({id:id,promotion:{name,des,discount}}).unwrap()
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

   const [DelPromotion_admin,{data:delPromotion_data,isLoading:delPromotion_isLoading,error:delPromotion_error}] = adminApi.useDelPromotion_adminMutation()
   const del=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await DelPromotion_admin(id).unwrap()
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
      <div className='mb10px mr10px'><h2 className='mr10px'>Имя: </h2><input type="text" placeholder='Имя' value={name} onChange={e=>setname(e.target.value)}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>Описание: </h2><input type="text" placeholder='Описание' value={des} onChange={e=>setdes(e.target.value)}/></div>
      <div className='mb10px'><h2 className='mr10px'>Скидка: </h2><input type="text" placeholder='Скидка' value={discount} onChange={e=>setdiscount(Number(e.target.value))}/></div>
   </div>
   <div className="buttons">
      <div className={`Adminbutton mt10px mr10px`}><button onClick={get}>Получить</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={create}>Создать</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={upd}>Обновить</button></div>
      <div className={`Adminbutton mt10px`}><button onClick={del}>Удалить</button></div>
   </div>
</div>
)}
export default AdminPromotions;