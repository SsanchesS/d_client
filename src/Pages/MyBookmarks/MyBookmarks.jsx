import Header from "../../components/Header/Header";
import Overlay from "../../components/Overlay/Overlay";
import SneakerBookmarks from '../../components/SneakerBookmarks/SneakerBookmarks';

import React from "react"

function MyBookmarks(p) {

return (
  <div className="App">
    <Overlay /> {/* state={state} */}
    <Header/> {/* openbasket={state.openbasket} itemsPrice={state.itemsPrice} */}
    
    <SneakerBookmarks/> {/* sneakers_basket={state.sneakers_basket} */}    

  </div>
);
}

export default MyBookmarks;