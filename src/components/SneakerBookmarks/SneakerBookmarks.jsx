import {Link} from 'react-router-dom'
import Sneaker from '../SneakerMain/Sneaker/Sneaker';
import s from './SneakerBookmarks.module.sass'
function SneakerBookmarks(p) {
   let helpFunc=()=>{
      if(p.sneakers_basket.length!==0) { return (
      <div className={`${s.sneakers_wrap_main}`}>
         <div className={`${s.sneakers_header}`}><h1>Мои закладки</h1></div>
         <div className={`${s.sneakers_wrap}`}>{
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
      <div className={`${s.sneakers_wrap_main}`}>
         <div className={`${s.SneakerBookmarks}`}> 
            <center><img src='./img/noBookmarks.png' alt='noBookmarks'></img></center>
            <h2>Закладок нет :(</h2>
            <p>Вы ничего не добавляли в закладки</p>
            <Link to="/"><button><img src='./img/arrowl.svg' alt='arrow'></img>Вернуться назад</button></Link>
         </div>
      </div>
         ) }

      }
   return (
      helpFunc()
   )
}

export default SneakerBookmarks;