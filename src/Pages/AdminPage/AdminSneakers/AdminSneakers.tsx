import {useState} from 'react'
import Header from "../../../components/Header/Header"
import {adminApi} from "../../../store/api/admin.api"

const AdminSneakers=()=>{
   const [MessageError,setMessageError] = useState('')
   const [id,setid] = useState(0)
   const [img,setimg] = useState("")
   const [des,setdes] = useState("")
   const [price,setprice] = useState(0)
   const [category_id,setcategory_id] = useState(0)

   const [GetSneaker_admin,{data:getSneaker_data,isLoading:getSneaker_isLoading,error:getSneaker_error}] = adminApi.useLazyGetSneaker_adminQuery()
   const get=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await GetSneaker_admin(id).unwrap()
         if(data.code >= 400){
            setMessageError(`${data.code}: ${data.message}`)
            return
         }else if (data.sneaker){
            setMessageError(data.message)          
            setimg(data.sneaker?.img!)
            setdes(data.sneaker?.des!)
            setprice(data.sneaker?.price!)
            setcategory_id(data.sneaker?.category_id!)
         }            
      } catch (error:any) {
         setMessageError("Ошибка")
         setMessageError(`${error.status}: ${error.data.detail[0].type}: ${error.data.detail[0].msg}`)
         console.log(error)
      }
   }
   
   const [CreateSneaker_admin,{data:createSneaker_data,isLoading:createSneaker_isLoading,error:createSneaker_error}] = adminApi.useCreateSneaker_adminMutation()
   const create=async()=>{
      if (!(img || des || price || category_id)){
         setMessageError("Введи данные")
         return
      }
      try {   
         const category_id_number = category_id && Number(category_id)
         if (isNaN(category_id_number)){
            setMessageError("Введи категорию")
            return
         }
         const price_number = price && Number(price)
         if (isNaN(price_number)){
            setMessageError("Введи цену")
            return
         }
         const data = await CreateSneaker_admin({img,des,price,category_id}).unwrap()
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
   const [UpdSneaker_admin,{data:updSneaker_data,isLoading:updSneaker_isLoading,error:updSneaker_error}] = adminApi.useUpdSneaker_adminMutation()
   const upd=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const category_id_number = category_id && Number(category_id)
         if (isNaN(category_id_number)){
            setMessageError("Введи категорию")
            return
         }
         const price_number = price && Number(price)
         if (isNaN(price_number)){
            setMessageError("Введи цену")
            return
         }
         const data = await UpdSneaker_admin({id:id,sneaker:{img,des,price,category_id}}).unwrap()
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

   const [DelSneaker_admin,{data:delSneaker_data,isLoading:delSneaker_isLoading,error:delSneaker_error}] = adminApi.useDelSneaker_adminMutation()
   const del=async()=>{
      if (!id){
         setMessageError("Введи id")
         return
      }
      try {   
         const data = await DelSneaker_admin(id).unwrap()
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
      <div className='mb10px mr10px'><h2 className='mr10px'>img: </h2><input type="text" placeholder='img' value={img} onChange={e=>setimg(e.target.value)}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>Описание: </h2><input type="text" placeholder='Описание' value={des} onChange={e=>setdes(e.target.value)}/></div>
      <div className='mb10px mr10px'><h2 className='mr10px'>Цена: </h2><input type="text" placeholder='Цена' value={price} onChange={e=>setprice(Number(e.target.value))}/></div>
      <div className='mb10px'><h2 className='mr10px'>Категория id: </h2><input type="text" placeholder='Категория id' value={category_id} onChange={e=>setcategory_id(Number(e.target.value))}/></div>
   </div>
   <div className="buttons">
      <div className={`Adminbutton mt10px mr10px`}><button onClick={get}>Получить</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={create}>Создать</button></div>
      <div className={`Adminbutton mt10px mr10px`}><button onClick={upd}>Обновить</button></div>
      <div className={`Adminbutton mt10px`}><button onClick={del}>Удалить</button></div>
   </div>
</div>
)}
export default AdminSneakers