import Sneaker from './Sneaker/Sneaker';

function SneakerMain(p){
return(
   <div className="sneakers-wrap-title">
      <div className="sneakers-header"><h1>Все кроссовки</h1><div className='search'><img src='./img/search.svg' alt='search'></img><input placeholder='Поиск...'/></div></div>
      <div className='sneakers-wrap'>{
      p.sneakers.map((obj,index)=>{
         return(
         <Sneaker key ={index} des = {obj["name"]} price = {obj["price"]} img = {obj["img"]} favorite = './img/love_unactive.svg' callSetSneakers_basket={p.callSetSneakers_basket}/>
      )})
      }
      </div>
   </div>
   )
}

export default SneakerMain;