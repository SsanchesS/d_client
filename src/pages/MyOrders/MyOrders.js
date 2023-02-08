import Header from "../../components/Header/Header";
import Overlay from "../../components/Overlay/Overlay";
import SneakerOrders from '../../components/SneakerOrders/SneakerOrders';

import React from "react"
import {AppContext} from "../../App"

function MyOrders(p) {
  let state = React.useContext(AppContext)
  return (
    <div className="App">
      <Overlay 
      state={state}
      />
      <Header openbasket={state.openbasket} itemsPrice={state.itemsPrice}/>
      <SneakerOrders 
      sneakers_orders={p.sneakers_orders} 
      />

    </div>
  );
}

export default MyOrders;