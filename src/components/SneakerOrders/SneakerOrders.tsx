import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import Order from './Order/Order'
import s from './SneakerOrders.module.sass'
import {useAppSelector} from "../../hooks/hooks"
import { userApi } from '../../store/api/user.api'

interface proops{
   setMessageError:(message: string) => void
}
const SneakerOrders=(p:proops) =>{
   const user = useAppSelector(state=>state.UserReducer)
   const {data,isLoading,error} = userApi.useGetOrdersQuery(user.id)
   const error_any:any = error
   useEffect(()=>{
      if(error_any){
         p.setMessageError(`${error_any.status}: ${error_any.data?.detail[0].type}: ${error_any.data?.detail[0].msg}`)
      }else if(error_any?.code !== undefined && error_any?.code >= 400){
         p.setMessageError(`${data?.code}: ${data?.message}`)
      }else if (data?.methods) {
         p.setMessageError(data.message)
      }     
   },[data, error])   
return (
<>
{
   data?.orders?.length ?
   <div className={`${s.sneakers_wrap_main}`}>
      <div className={`${s.sneakers_header}`}><h1>{"Мои заказы"}</h1></div>
      <div className={`${s.sneakers_wrap}`}>{
         data.orders.map((obj,index) => {
            return (
               <Order 
                  key={obj.id}
                  id={obj.id}
                  order_date={obj.order_date!}
                  sum={obj.sum!}
                  status={obj.status!}
                  delivery_method_id={obj.delivery_method_id!}
                  payment_method_id={obj.payment_method_id!}
                  sneakers={obj.sneakers!}
                  setMessageError={p.setMessageError}
               />
            )
         })
      }
      </div>
   </div>
      :
   <div className={`${s.sneakers_wrap_main}`}>
      <div className={`${s.SneakerOrders}`}> 
         <center><img src='./img/noOrders.png' alt='noOrders'></img></center>
         <h2>У вас нет заказов</h2>
         <p>Вы нищеброд?</p>
         <p className={`${s.SneakerOrders_p_mb}`}>Оформите хотя бы один заказ.</p>
         <Link to="/"><button><img src='./img/arrow-l.svg' alt='arrow'></img>Вернуться назад</button></Link>
      </div>
   </div>
}
</>
)}
export default SneakerOrders