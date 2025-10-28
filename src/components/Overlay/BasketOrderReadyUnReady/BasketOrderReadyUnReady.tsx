import s from './BasketOrderReadyUnReady.module.sass'

interface proops{
   img:string,
   h2:string,
   p1:string,
   p2:string,
   closebasket: ()=>void
}
const BasketOrderReadyUnReady=(p:proops)=>{
   const back=()=>{
      p.closebasket()
   }
return(
<div className={`${s.BasketOrderReadyUnReady}`}>
   <center><img src={p.img} alt="BasketOrderReadyUnReady"></img></center>
   <h2>{p.h2}</h2>
   <div className={`${s.BasketOrderReadyUnReady_p}`}>
      <p>{p.p1}</p>
      <p>{p.p2}</p>
   </div>
   <div className={`button ${s.button}`}><button onClick={back}><img src='./img/arrow-l.svg' alt='arrow'></img>Вернуться назад</button></div>
</div>
)}
export default BasketOrderReadyUnReady