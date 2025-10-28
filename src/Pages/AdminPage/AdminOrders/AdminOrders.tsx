import {useState} from 'react'
import Header from "../../../components/Header/Header";
import {adminApi} from "../../../store/api/admin.api"

const AdminOrders=()=>{
   const [MessageError,setMessageError] = useState('')
   const [id,setid] = useState(0)
   const [user_id,setuser_id] = useState(0)
   const [order_date,setorder_date] = useState("")
   const [sum,setsum] = useState(0)
   const [status,setstatus] = useState("")
   const [delivery_method_id,setdelivery_method_id] = useState(0)
   const [payment_method_id,setpayment_method_id] = useState(0)
   const [sneakers,setsneakers] = useState("[]")
   
   const [GetOrder_admin,{data:getOrder_data,isLoading:getOrder_isLoading,error:getOrder_error}] = adminApi.useLazyGetOrder_adminQuery()
   const get=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await GetOrder_admin(id).unwrap()
         if(data.code >= 400){
            setMessageError(`${data.code}: ${data.message}`)
            return
         }else if (data.order){
            setMessageError(data.message)          
            setuser_id(data.order?.user_id!)
            setorder_date(data.order?.order_date!)
            setsum(data.order?.sum!)
            setstatus(data.order?.status!)
            setdelivery_method_id(data.order?.delivery_method_id!)
            setpayment_method_id(data.order?.payment_method_id!)
            setsneakers(data.order?.sneakers!)
         }            
      } catch (error:any) {
         setMessageError("Ошибка")
         setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         console.log(error)
      }
   }
   
   const [UpdOrder_admin,{data:updOrder_data,isLoading:updOrder_isLoading,error:updOrder_error}] = adminApi.useUpdOrder_adminMutation()
   const upd=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const sum_number = sum && Number(sum)
         if (!sum_number){
            setMessageError("Введи сумму")
            return
         }
         const delivery_method_id_number = delivery_method_id && Number(delivery_method_id)
         if (!delivery_method_id_number){
            setMessageError("Введи id способа доставки")
            return
         }
         const payment_method_id_number = payment_method_id && Number(payment_method_id)
         if (!payment_method_id_number){
            setMessageError("Введи id способа оплаты")
            return
         }
         const sneakers_parse:number[] = JSON.parse(sneakers)
         if(!Array.isArray(sneakers_parse) || !sneakers_parse.every((item: any) => typeof item === 'number')){
            setMessageError("Введи id кроссовок")
            return
         }
         const data = await UpdOrder_admin({id:id,order:{order_date,sum,status,delivery_method_id,payment_method_id,sneakers}}).unwrap()
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

   const [DelOrder_admin,{data:delOrder_data,isLoading:delOrder_isLoading,error:delOrder_error}] = adminApi.useDelOrder_adminMutation()
   const del=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await DelOrder_admin(id).unwrap()
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
      <div className='mb10px mr10px'><h2 className='mr10px'>user_id: </h2><input type="text" placeholder='user_id' value={user_id} onChange={e=>setuser_id(Number(e.target.value))}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>Дата заказа: </h2><input type="text" placeholder='Дата заказа' value={order_date} onChange={e=>setorder_date(e.target.value)}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>Сумма: </h2><input type="text" placeholder='Сумма' value={sum} onChange={e=>setsum(Number(e.target.value))}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>Статус: </h2><input type="text" placeholder='Статус' value={status} onChange={e=>setstatus(e.target.value)}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>id способа доставки: </h2><input type="text" placeholder='id способа доставки' value={delivery_method_id} onChange={e=>setdelivery_method_id(Number(e.target.value))}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>id способа оплаты: </h2><input type="text" placeholder='id способа оплаты' value={payment_method_id} onChange={e=>setpayment_method_id(Number(e.target.value))}/></div>
      <div className='mb10px'><h2 className='mr10px'>id кроссовок: </h2><input type="text" placeholder='id кроссовок' value={sneakers} onChange={e=>setsneakers(e.target.value)}/></div>
   </div>
   <div className="buttons">
      <div className={`Adminbutton mt10px mr10px`}><button onClick={get}>Получить</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={upd}>Обновить</button></div>
      <div className={`Adminbutton mt10px`}><button onClick={del}>Удалить</button></div>
   </div>
</div>
)}
export default AdminOrders;