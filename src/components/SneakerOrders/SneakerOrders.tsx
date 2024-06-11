import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import Order from './Order/Order';
import s from './SneakerOrders.module.sass'
import { useAppSelector} from '../../hooks/hooks';

interface proops{
   setMessageError:void
}
const SneakerOrders=(p:proops) =>{
   const user = useAppSelector(state=>state.UserReducer)
return (
<>
{
   user.sneakers_orders?.length ?
   <div className={`${s.sneakers_wrap_main}`}>
      <div className={`${s.sneakers_header}`}><h1>{"Мои заказы"}</h1></div>
      <div className={`${s.sneakers_wrap}`}>{
         user.sneakers_orders.map((obj,index) => {
            return (
               <Order 
                  key={obj.id}
                  id={obj.id}
                  order_date={obj.order_date}
                  sum={obj.sum}
                  status={obj.status}
                  delivery_method_id={obj.delivery_method_id}
                  payment_method_id={obj.payment_method_id}
                  sneakers={obj.sneakers}
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
export default SneakerOrders;