import s from './AdminMain.module.sass'
import { Link,useNavigate } from 'react-router-dom'

const AdminMain=()=>{

return(
<div className={`${s.AdminMain}`}>
   Hi Admin
   <div className={`${s.button} mb10px mt10px`}><button>Работа с Пользователями</button></div>
   <div className={`${s.button} mb10px`}><button>Работа с заказами</button></div>
   <div className={`${s.button} mb10px`}><button>Работа с Кроссовками</button></div>
   <div className={`${s.button} mb10px`}><button>Работа с Категориями</button></div>
   <div className={`${s.button} mb10px`}><button>Работа с Акциями</button></div>
   <div className={`${s.button} mb10px`}><button>Работа с способами доставки</button></div>
   <div className={`${s.button}`}><button>Работа с способами оплаты</button></div>
</div>
)}
export default AdminMain