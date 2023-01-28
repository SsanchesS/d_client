import {Link} from 'react-router-dom'
import Sneaker from '../../components/SneakerMain/Sneaker/Sneaker';

function SneakerOrders(p) {
   let helpFunc=()=>{
      if(p.sneakers_basket.length!==0) { return (
      <div className="sneakers-wrap-main">
         <div className="sneakers-header"><h1>{"Мои покупки"}</h1></div>
         <div className='sneakers-wrap'>{
            p.sneakers_basket.map((obj,index) => {
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
      <div className="sneakers-wrap-main">
         <div className='SneakerOrders'> 
            <center><img src='./img/noOrders.png' alt='noOrders'></img></center>
            <h2>У вас нет заказов</h2>
            <p>Вы нищеброд?</p>
            <p className='SneakerOrders-p-mb'>Оформите хотя бы один заказ.</p>
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