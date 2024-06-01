import s from "./User.module.sass"
import { useAppSelector } from "../../hooks/hooks"

const User=()=>{
   const user = useAppSelector(state=>state.UserReducer)

   const edit=()=>{
      
   }
return(
<div className={`${s.User} mt10px`}>
   <div> <h2>{user.f_name}</h2> &nbsp; <h2>{user.s_name}</h2> </div>   
   <div className="mt10px"> <p>Ваш emal:</p> &nbsp; <h2>{user.email}</h2> </div>
   <div className={`${s.button} mt10px`}><button onClick={edit}>Редактировать</button></div>
</div>
)}
export default User