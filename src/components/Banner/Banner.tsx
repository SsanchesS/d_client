import {FC} from "react"
import s from './Banner.module.sass'
const Banner:FC=()=>{
   const buySneaker=()=>{

   }
return(
   <div className={`${s.banner_wrap}`}>
      <div className={`${s.banner}`}>
         <div className={`${s.banner_logo}`}></div>
         <div className={`${s.banner_des}`}>
            <h1>Stan Smith<p>,</p><p>Forever!</p></h1>
            <button onClick={buySneaker}>Купить</button>
         </div>
      </div>
   </div>
   )
}

export default Banner;