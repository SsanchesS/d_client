import Header from "../../components/Header/Header";
import Overlay from "../../components/Overlay/Overlay";
import Banner from '../../components/Banner/Banner';
import SneakerMain from '../../components/SneakerMain/SneakerMain';

import React from 'react';
import {AppContext} from "../../App"

function AllSneakers(p) {
  let state = React.useContext(AppContext)
  return (
    <div className="App">
      <Overlay 
      state={state}
      />
      <Header openbasket={state.openbasket} itemsPrice={state.itemsPrice}/>
      <Banner />
      <SneakerMain 
      sneakers={state.sneakers} 

      callSetSneakers_basket={p.callSetSneakers_basket}
      isLoading={p.isLoading}
      />

    </div>
  );
}

export default AllSneakers;