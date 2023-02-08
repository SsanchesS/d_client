import React from "react"
import MyLoader from '../MyLoader/MyLoader';

function Sneaker(p) {
  let [isAdd,setisAdd] = React.useState(false)
  let add_sneaker =()=>{
    // setisAdd(isAdd=>!isAdd)
    setisAdd(true)
    p.callSetSneakers_basket(p.des, p.price, p.img)
  }
return (
  <div className="sneakers-card">{
    p.isLoading ? <MyLoader/> :
      <>
      <div className="sneakers-bg"><img src={p.img} alt="sneaker"></img></div>
      <div className="des"><p>{p.des}</p></div>
      <div className="price-wrap">
        <div className="price">
          <p>Цена:</p>
          <h3>{p.price} руб.</h3>
        </div>
        {p.callSetSneakers_basket ? <button className={isAdd ? "isAdd-bg active": "isAdd-bg"} onClick={add_sneaker}></button> : null}
      </div>
      </>
    }
  </div>
  );
}
export default Sneaker;
    