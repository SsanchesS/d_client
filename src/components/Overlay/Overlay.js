import BasketOrder from "./BasketOrder/BasketOrder"
import BasketOrderReadyUnReady from "./BasketOrderReadyUnReady/BasketOrderReadyUnReady"

function Overlay(p){
   let helpFunc=()=>{
   if(p.state.sneakers_basket.length!==0 && p.state.tf===false) { return (
      <BasketOrder
      sneakers_basket={p.state.sneakers_basket}
      callDelSneakers_basket={p.state.callDelSneakers_basket}
      itemsPrice={p.state.itemsPrice}
      BasketOrderFunc={p.state.BasketOrderFunc}
      />) }
      else if(p.state.tf){ 
         // axios.put(`https://63a0a96a24d74f9fe83eb686.mockapi.io/card`,[])  // удаляем все из корзины если прошел заказ (но это не точно)
      return(
      //Ready
      <BasketOrderReadyUnReady
      img="img/Ready.svg"
      h2="Заказ оформлен!"
      p1= {`Ваш заказ #${p.state.orderNum} скоро будет передан`}
      p2="курьерской доставке"   
      closebasket={p.state.closebasket}
      />) }
      else if(p.state.tf===false){ return (
      //UnReady
      <BasketOrderReadyUnReady
      img="img/UnReady.svg"
      h2="Корзина пустая"
      p1="Добавьте хотя бы одну пару"
      p2="кроссовок, чтобы сделать заказ."
      closebasket={p.state.closebasket}
      />) }
   }
return(
   <div className={p.state.overlaySwitch ? 'overlay': "overlay hide"}>
      <div className='opacity' onClick={p.state.closebasket}></div>
      <div className='right-basket'>
         <h2>Корзина</h2>
         {helpFunc()}
      </div>
   </div>
   )
}

export default Overlay;