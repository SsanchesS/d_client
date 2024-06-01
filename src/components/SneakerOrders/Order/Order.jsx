import s from './Order.module.sass'

const Order=(p)=>{

   const edit=()=>{
      
   }
return(
<div className={`${s.Order}`}>
   <div> <p>Дата заказа:</p> &nbsp; <h2>{p.order_date}</h2> </div>   
   <div className="mt10px"> <p>Сумма:</p> &nbsp; <h2>{p.sum}</h2> </div>
   <div className="mt10px"> <p>Статус:</p> &nbsp; <h2>{p.status}</h2> </div>
   <div className="mt10px"> <p>Метод доставки:</p> &nbsp; <h2>{p.delivery_method}</h2> </div>
   <div className="mt10px"> <p>Способ оплаты:</p> &nbsp; <h2>{p.payment_method}</h2> </div>
   
   <div className={`${s.button} mt10px`}><button onClick={edit}>Редактировать</button></div>
</div>
)}
export default Order