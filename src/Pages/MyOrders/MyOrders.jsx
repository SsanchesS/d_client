import Header from "../../components/Header/Header";
import Overlay from "../../components/Overlay/Overlay";
import SneakerOrders from '../../components/SneakerOrders/SneakerOrders';

import React from "react"

function MyOrders(p) {

return (
  <div className="App">
    <Overlay />
    <Header/>
    <SneakerOrders />

  </div>
);
}

export default MyOrders;