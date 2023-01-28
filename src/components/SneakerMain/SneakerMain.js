import React from 'react';
import Sneaker from './Sneaker/Sneaker';

function SneakerMain(p) {
   let [inputSearch, setinputSearch] = React.useState("")
   let inputChange = (event) => {
      setinputSearch(event.target.value)
   }
   return (
      <div className="sneakers-wrap-main">
         <div className="sneakers-header"><h1>{inputSearch ? `Поиск по: ${inputSearch}` : "Все кроссовки"}</h1><div className='search'><img src='./img/search.svg' alt='search'></img><input placeholder='Поиск...' value={inputSearch} onChange={inputChange} /></div></div>
         <div className='sneakers-wrap'>{
            p.sneakers.filter(obj=>obj.name.toLowerCase().includes(inputSearch.toLowerCase())).map((obj,index) => {
               return (
                  <Sneaker 
                  key={index}
                  des={obj.name} 
                  price={obj.price} 
                  img={obj.img} 
                  callSetSneakers_basket={p.callSetSneakers_basket} 
                  />
               )
            })
         }
         </div>
      </div>
   )
}

export default SneakerMain;