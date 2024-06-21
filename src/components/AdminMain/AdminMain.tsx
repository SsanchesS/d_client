import {FC} from "react"
import {Link} from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import s from './AdminMain.module.sass'

const AdminMain:FC=()=>{
   const user = useAppSelector(state=>state.UserReducer)
return(
<div className={`${s.AdminMain}`}>  
   {`Привет, ${user.f_name}!`}
   <div className={`${s.button} mb10px mt10px`}><button><Link to="/AdminUsers" className={`${s.link}`}>Работа с пользователями</Link></button></div>
   <div className={`${s.button} mb10px`}><button><Link to="/AdminRoles" className={`${s.link}`}>Работа с ролями</Link></button></div>
   <div className={`${s.button} mb10px`}><button><Link to="/AdminOrders" className={`${s.link}`}>Работа с заказами</Link></button></div>
   <div className={`${s.button} mb10px`}><button><Link to="/AdminSneakers" className={`${s.link}`}>Работа с кроссовками</Link></button></div>
   <div className={`${s.button} mb10px`}><button><Link to="/AdminCategories" className={`${s.link}`}>Работа с категориями</Link></button></div>
   <div className={`${s.button} mb10px`}><button><Link to="/AdminPromotions" className={`${s.link}`}>Работа с акциями</Link></button></div>
   <div className={`${s.button} mb10px`}><button><Link to="/AdminDelivery_methods" className={`${s.link}`}>Работа с способами доставки</Link></button></div>
   <div className={`${s.button}`}><button><Link to="/AdminPayment_methods" className={`${s.link}`}>Работа с способами оплаты</Link></button></div>
</div>
)}
export default AdminMain