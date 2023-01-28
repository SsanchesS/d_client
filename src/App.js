import React from 'react';
import {Route,Routes} from 'react-router-dom'
import axios from "axios"
import AllSneakers from './pages/AllSneakers/AllSneakers';
import MyBookmarks from './pages/MyBookmarks/MyBookmarks';
import MyOrders from './pages/MyOrders/MyOrders';

function App() {
  
  let [sneakers, setsneakers] = React.useState([])
  let [sneakers_basket, setsneakers_basket] = React.useState([])
  let [orderNum,setorderNum] = React.useState(0)

  let callSetSneakers_basket = (des = null, price = null, img = null) => {
    let obj = {"id": null, "name": des, "price": price, "img": img }
    axios.post("https://63a0a96a24d74f9fe83eb686.mockapi.io/card",obj)
    .then(resdata => {
      obj.id = resdata.data.id
      setsneakers_basket(sneakers_basket => [...sneakers_basket, obj])
    })
  }
  let callDelSneakers_basket = (id = null) => {
    axios.delete(`https://63a0a96a24d74f9fe83eb686.mockapi.io/card/${id}`)
    setsneakers_basket(sneakers_basket => sneakers_basket.filter(obj=>obj.id!==id))
  }

  let [overlaySwitch, setoverlaySwitch] = React.useState(false)

  //

  React.useEffect(() => {
    axios.get("https://63a0a96a24d74f9fe83eb686.mockapi.io/items").then(resdata => {
    setsneakers(resdata.data[1].data) 
    setorderNum(resdata.data[0].orderNum)
    setitemsPrice(resdata.data[0].itemsPrice)
  })
    axios.get("https://63a0a96a24d74f9fe83eb686.mockapi.io/card").then(resdata => setsneakers_basket(resdata.data))
  }, [])

  React.useEffect(() => {
    calculatePrices()
  }, [sneakers_basket])
  /////////////////////////////////////////////////////////////////////////////////////////

  let [itemsPrice, setitemsPrice] = React.useState(0)
  let calculatePrices =()=>{
    sneakers_basket.length!==0  ? setitemsPrice(sneakers_basket.reduce((sum,item)=> sum+item.price,0)) : setitemsPrice(0)
  }

  //

  let openbasket = () => {
    setoverlaySwitch(!overlaySwitch)
  }
  let closebasket = () => {
    setoverlaySwitch(!overlaySwitch)
    settf(false)
  }

  let [tf,settf] = React.useState(false) // для страницы заказов мб я уже не помню
  let BasketOrderFunc=()=>{
    settf(true)
    setorderNum(orderNum=>orderNum=orderNum+1)
    let data={"id":1,"orderNum":orderNum+1}
    axios.put("https://63a0a96a24d74f9fe83eb686.mockapi.io/items/1",data)
  }
  return (
    <Routes>
      <Route 
      path='/' 
      element={
        <AllSneakers 
        overlaySwitch={overlaySwitch}
        closebasket={closebasket} 
        sneakers_basket={sneakers_basket} 
        callDelSneakers_basket={callDelSneakers_basket}
        itemsPrice={itemsPrice}
        BasketOrderFunc={BasketOrderFunc}
        tf={tf}
        orderNum={orderNum}
        openbasket={openbasket} 
        callSetSneakers_basket={callSetSneakers_basket}
        sneakers={sneakers} 
        />
      }
      />

      <Route 
      path='/MyBookmarks' 
      element={
        <MyBookmarks
        overlaySwitch={overlaySwitch}
        closebasket={closebasket} 
        callDelSneakers_basket={callDelSneakers_basket}
        itemsPrice={itemsPrice}
        BasketOrderFunc={BasketOrderFunc}
        tf={tf}
        orderNum={orderNum}
        openbasket={openbasket} 

        sneakers_basket={sneakers_basket} 
        />
      }
      />

      <Route 
      path='/MyOrders' 
      element={
        <MyOrders
        overlaySwitch={overlaySwitch}
        closebasket={closebasket} 
        callDelSneakers_basket={callDelSneakers_basket}
        itemsPrice={itemsPrice}
        BasketOrderFunc={BasketOrderFunc}
        tf={tf}
        orderNum={orderNum}
        openbasket={openbasket} 

        sneakers_basket={sneakers_basket} 
        />
      }
      />
    </Routes>

  );
}

export default App;