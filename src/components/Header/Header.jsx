import {Link} from 'react-router-dom'

function Header(p){
return(
<div className="header">
   <div className="header-left">
      <Link className="logo" to="/"><img src="img/logo.svg" alt="logo"></img></Link>
      <div className="text">
         <h1 className="flex"><div className={"w_y"}>К</div><div className={"b_y"}>Р</div><div className={"w_y"}>О</div><div className={"b_y"}>С</div><div className={"b_y"}>С</div><div className={"w_y"}>О</div><div className={"b_y"}>В</div><div className={"w_y"}>К</div><div className={"b_y"}>И</div></h1>
         <p>Магазин лучших кроссовок</p>
      </div>
   </div>
   <div className="header-right">
      <div className="right-left">
         <button className="basket" onClick={p.openbasket}></button>
         <p>{p.itemsPrice} руб.</p>
      </div>
      <div className="right-right">
         <Link className="like" to="/MyBookmarks"></Link>
         <Link className="user" to="/MyOrders"></Link>
      </div>
   </div>
</div>
)}
export default Header