function Header(p){

return(
   <div className="header">
      <div className="header-left">
      <div className="logo"><img src="img/logo.svg" alt="logo"></img></div>
      <div className="text">
         <h2>React Sneakers</h2>
         <p>Магазин лучших кроссовок</p>
      </div>
      </div>
      <div className="header-right">
      <div className="right-left">
         <button className="basket" onClick={p.openbasket}></button>
         <p>1205 руб.</p>
      </div>
      <div className="right-right">
         <button className="like"></button>
         <button className="user"></button>
      </div>
      </div>
   </div>
   )
}

export default Header