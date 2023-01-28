import {Link} from 'react-router-dom'
import Sneaker from '../../components/SneakerMain/Sneaker/Sneaker';

function SneakerBookmarks(p) {
   let helpFunc=()=>{
      if(p.sneakers_basket.length!==0) { return (
      <div className="sneakers-wrap-main">
         <div className="sneakers-header"><h1>{"Мои закладки"}</h1></div>
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
         <div className='SneakerBookmarks'> 
            <center><img src='./img/noBookmarks.png' alt='noBookmarks'></img></center>
            <h2>Закладок нет :(</h2>
            <p>Вы ничего не добавляли в закладки</p>
            <Link to="/"><button><img src='./img/arrow-l.svg' alt='arrow'></img>Вернуться назад</button></Link>
         </div>
      </div>
         ) }

      }
   return (
      helpFunc()
   )
}

export default SneakerBookmarks;