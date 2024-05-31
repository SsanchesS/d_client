import {Link} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import s from './Header.module.sass'
import {overlaySwitch} from "../../store/reducers/SneakersSlice"
function Header(){
   const dispatch = useAppDispatch()
   const user = useAppSelector(state=>state.UserReducer)
   const openbasket=()=>{
      dispatch(overlaySwitch(true))
   }
return(
<div className={`${s.header}`}>
   <div className={`${s.header_left}`}>
      <Link className={`${s.logo}`} to="/"><img src="img/logo.svg" alt="logo"></img></Link>
      <div className={`${s.text}`}>
         <h1 className="flex"><div className={"w_y"}>К</div><div className={"b_y"}>Р</div><div className={"w_y"}>О</div><div className={"b_y"}>С</div><div className={"b_y"}>С</div><div className={"w_y"}>О</div><div className={"b_y"}>В</div><div className={"w_y"}>К</div><div className={"b_y"}>И</div></h1>
         <p>Магазин лучших кроссовок</p>
      </div>
   </div>
   <div className={`${s.header_right}`}>
      <div className={`${s.right_left}`}>
         <button className={`${s.basket}`} onClick={openbasket}></button>       
         <p>{user.itemsPrice} руб.</p>
      </div>
      <div className={`${s.right_right}`}>
         <Link className={`${s.like}`} to={`${user.id?"/MyBookmarks":"/auth"}`}></Link>
         <Link className={`${s.user}`} to={`${user.id?"/User":"/auth"}`}></Link>
      </div>
   </div>
</div>
)}
export default Header