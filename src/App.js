import React from 'react';
import Header from "./components/Header/Header";
import Overlay from "./components/Overlay/Overlay";
import Banner from './components/Banner/Banner';
import SneakerMain from './components/SneakerMain/SneakerMain';


function App() {
  let[sneakers,setsneakers] = React.useState([])
  let[sneakers_basket,setsneakers_basket] = React.useState([])
  let callSetSneakers_basket=(des=null, price=null, img=null)=>{
    let obj ={"name":des,"price":price,"img":img}
    setsneakers_basket(sneakers_basket=>[...sneakers_basket,obj])
  }
  let [overlaySwitch,setoverlaySwitch] = React.useState(false)

  //
  
  React.useEffect(()=>{
    fetch("https://63a0a96a24d74f9fe83eb686.mockapi.io/items")
    .then(res=>res.json())
    .then(resJson=>setsneakers(resJson)) 
  },[])

  //

  let openbasket=()=>{
    setoverlaySwitch(!overlaySwitch)
  }
  let closebasket=()=>{
    setoverlaySwitch(!overlaySwitch)
  }

  //

return (
  <div className="App">
      <Overlay overlaySwitch={overlaySwitch} closebasket={closebasket} sneakers_basket={sneakers_basket} />
      <Header openbasket={openbasket}/>
      <Banner/>
      <SneakerMain sneakers={sneakers} callSetSneakers_basket={callSetSneakers_basket}/>

  </div>
  );
}

export default App;