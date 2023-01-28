import Header from "../../components/Header/Header";
import Overlay from "../../components/Overlay/Overlay";
import Banner from '../../components/Banner/Banner';
import SneakerMain from '../../components/SneakerMain/SneakerMain';


function AllSneakers(p) {

  return (
    <div className="App">
      <Overlay 
      overlaySwitch={p.overlaySwitch}
      closebasket={p.closebasket} 
      sneakers_basket={p.sneakers_basket} 
      callDelSneakers_basket={p.callDelSneakers_basket}
      itemsPrice={p.itemsPrice}
      BasketOrderFunc={p.BasketOrderFunc}
      tf={p.tf}
      orderNum={p.orderNum}
      />
      <Header openbasket={p.openbasket} itemsPrice={p.itemsPrice}/>
      <Banner />
      <SneakerMain 
      sneakers={p.sneakers} 
      callSetSneakers_basket={p.callSetSneakers_basket}
      />

    </div>
  );
}

export default AllSneakers;