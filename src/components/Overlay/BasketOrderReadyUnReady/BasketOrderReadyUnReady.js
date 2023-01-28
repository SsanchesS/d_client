
function BasketOrderReadyUnReady(p){

return(
   <div className='BasketOrderReadyUnReady'>
      <center><img src={p.img} alt="BasketOrderReadyUnReady"></img></center>
      <h2>{p.h2}</h2>
      <div className="BasketOrderReadyUnReady-p">
         <p>{p.p1}</p>
         <p>{p.p2}</p>
      </div>
      <button onClick={p.closebasket}><img src='./img/arrow-l.svg' alt='arrow'></img>Вернуться назад</button>
   </div>
   )
}

export default BasketOrderReadyUnReady;