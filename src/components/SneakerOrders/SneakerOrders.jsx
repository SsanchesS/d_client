import {Link} from 'react-router-dom'
import Sneaker from '../SneakerMain/Sneaker/Sneaker';
import s from './SneakerOrders.module.sass'
function SneakerOrders(p) {
   let helpFunc=()=>{
      if(p.sneakers_orders.length!==0) { return (
      <div className={`${s.sneakers_wrap_main}`}>
         <div className={`${s.sneakers_header}`}><h1>{"Мои покупки"}</h1></div>
         <div className={`${s.sneakers_wrap}`}>{
            p.sneakers_orders.map((obj,index) => {
               return (
                  <Sneaker 
                  key={index}
                  des={obj.name} 
                  price={obj.price} 
                  img={obj.img}
                  />
               )
            })
         }
         </div>
      </div>
         ) }
         else{ return(
      <div className={`${s.sneakers_wrap_main}`}>
         <div className={`${s.SneakerOrders}`}> 
            <center><img src='./img/noOrders.png' alt='noOrders'></img></center>
            <h2>У вас нет заказов</h2>
            <p>Вы нищеброд?</p>
            <p className={`${s.SneakerOrders_p_mb}`}>Оформите хотя бы один заказ.</p>
            <Link to="/"><button><img src='./img/arrow-l.svg' alt='arrow'></img>Вернуться назад</button></Link>
         </div>
      </div>
         ) }

      }
   return (
      helpFunc()
   )
}

export default SneakerOrders;