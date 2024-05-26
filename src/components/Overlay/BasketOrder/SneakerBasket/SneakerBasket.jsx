import s from './SneakerBasket.module.sass'

function SneakerBasket(p) {
  let deleteFromBasket =()=>{
    console.log("Удадение из корзины...")
  }
return (
    <div className={`${s.sneaker_basket}`}>
      <img src={p.img} alt='sneaker'></img> 
      <div className={`${s.des_basket}`}><p>{p.des}</p><h3>{p.price}</h3></div>
      <button onClick={deleteFromBasket}></button>
    </div>
  );
}

export default SneakerBasket;