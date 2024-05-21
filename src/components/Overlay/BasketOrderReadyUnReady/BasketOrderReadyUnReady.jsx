import s from './BasketOrderReadyUnReady.module.sass'

function BasketOrderReadyUnReady(p){
return(
   <div className={`${s.BasketOrderReadyUnRead}`}>
      <center><img src={p.img} alt="BasketOrderReadyUnReady"></img></center>
      <h2>{p.h2}</h2>
      <div className={`${s.BasketOrderReadyUnReady-p}`}>
         <p>{p.p1}</p>
         <p>{p.p2}</p>
      </div>
      {/* <button onClick={p.closebasket}><img src='./img/arrow-l.svg' alt='arrow'></img>Вернуться назад</button> */}
   </div>
   )
}

export default BasketOrderReadyUnReady;