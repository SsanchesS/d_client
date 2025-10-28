import {Link} from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import s from './AdminMain.module.sass'

const AdminMain=()=>{
   const user = useAppSelector(state=>state.UserReducer)
return(
<div className={`${s.AdminMain}`}>  
   {`Привет, ${user.f_name}!`}
   <div className={`${s.button} mb10px mt10px`}><Link to="/AdminUsers" className={`${s.link} `}>Работа с пользователями</Link></div>
   <div className={`${s.button} mb10px`}><Link to="/AdminRoles" className={`${s.link}`}>Работа с ролями</Link></div>
   <div className={`${s.button} mb10px`}><Link to="/AdminOrders" className={`${s.link}`}>Работа с заказами</Link></div>
   <div className={`${s.button} mb10px`}><Link to="/AdminSneakers" className={`${s.link}`}>Работа с кроссовками</Link></div>
   <div className={`${s.button} mb10px`}><Link to="/AdminCategories" className={`${s.link}`}>Работа с категориями</Link></div>
   <div className={`${s.button} mb10px`}><Link to="/AdminPromotions" className={`${s.link}`}>Работа с акциями</Link></div>
   <div className={`${s.button} mb10px`}><Link to="/AdminDelivery_methods" className={`${s.link}`}>Работа с способами доставки</Link></div>
   <div className={`${s.button}`}><Link to="/AdminPayment_methods" className={`${s.link}`}>Работа с способами оплаты</Link></div>
</div>
)}
export default AdminMain