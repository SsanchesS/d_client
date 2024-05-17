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
  let [sneakers_orders,setsneakers_orders] = React.useState([])

  let [isLoading,setisLoading] = React.useState()

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
    setisLoading(true)
    axios.get("https://63a0a96a24d74f9fe83eb686.mockapi.io/card")
      .then(resdata => setsneakers_basket(resdata.data))
        .then(axios.get("https://63a0a96a24d74f9fe83eb686.mockapi.io/items")
          .then(resdata => {
            setsneakers(resdata.data[1].data) 
            setorderNum(resdata.data[0].orderNum)
            setitemsPrice(resdata.data[0].itemsPrice)
          })
        )
            .then(setisLoading(false))
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
    .then(sneakers_basket.forEach(obj=>{
      axios.delete(`https://63a0a96a24d74f9fe83eb686.mockapi.io/card/${obj.id}`)
      setsneakers_orders(sneakers_orders=>[...sneakers_orders,obj])
    }
    ))
    .then(setsneakers_basket([])).then(setitemsPrice(0))

  }
  return (
      <Routes>
        <Route path='/' element={<AllSneakers callSetSneakers_basket={callSetSneakers_basket} isLoading={isLoading}/>}/>
        <Route path='/MyBookmarks' element={<MyBookmarks/>}/>
        <Route path='/MyOrders' element={<MyOrders sneakers_orders={sneakers_orders} />}/>
      </Routes>
  );
}
export default App;
  // sneaker_json
  // [
  //   {
  //    "id": "1",
  //    "orderNum": 10
  //   },
  //   {
  //    "id": "2",
  //    "data": [
  //     {
  //      "name": "Мужские Кроссовки Nike Blazer Mid Suede",
  //      "price": 12999,
  //      "img": "./img/1.png"
  //     },
  //     {
  //      "name": "Мужские Кроссовки Nike Air Max 270",
  //      "price": 12999,
  //      "img": "./img/2.png"
  //     },
  //     {
  //      "name": "Мужские Кроссовки Nike Blazer Mid Suede",
  //      "price": 8499,
  //      "img": "./img/3.png"
  //     },
  //     {
  //      "name": "Мужские Кроссовки Under Armour Curry 8",
  //      "price": 15199,
  //      "img": "./img/4.png"
  //     },
  //     {
  //      "name": "Мужские Кроссовки Nike Kyrie 7",
  //      "price": 11299,
  //      "img": "./img/5.png"
  //     },
  //     {
  //      "name": "Мужские Кроссовки Jordan Air Jordan 11",
  //      "price": 12999,
  //      "img": "./img/6.png"
  //     },
  //     {
  //      "name": "Мужские Кроссовки Nike Blazer Mid Suede",
  //      "price": 10799,
  //      "img": "./img/7.png"
  //     },
  //     {
  //      "name": "Мужские Кроссовки Nike LeBron XVIII",
  //      "price": 16499,
  //      "img": "./img/8.png"
  //     },
  //     {
  //      "name": "Мужские Кроссовки Nike Lebron XVIII Low",
  //      "price": 13999,
  //      "img": "./img/9.png"
  //     },
  //     {
  //      "name": "Мужские Кроссовки Nike Blazer Mid Suede",
  //      "price": 8499,
  //      "img": "./img/10.png"
  //     },
  //     {
  //      "name": "Кроссовки Puma X Aka Boku Future Rider",
  //      "price": 8999,
  //      "img": "./img/11.png"
  //     },
  //     {
  //      "name": "Мужские Кроссовки Nike Kyrie Flytrap IV",
  //      "price": 11399,
  //      "img": "./img/12.png"
  //     }
  //    ]
  //   }
  //  ]