import s from './BasketOrderReadyUnReady.module.sass'

const BasketOrderReadyUnReady=(p)=>{
   const back=()=>{
      p.setOrder_is_processed(state=>!state)
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
   )
}

export default BasketOrderReadyUnReady;