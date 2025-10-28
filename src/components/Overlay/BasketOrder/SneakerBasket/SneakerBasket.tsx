import s from './SneakerBasket.module.sass'
import type { ISneaker } from '../../../../types/types'
import { useAppDispatch } from "../../../../hooks/hooks"
import { setSneakers_basket } from '../../../../store/reducers/SneakersSlice'

interface proops{
  id:number,
  des:string,
  price:number,
  img:string,  
  setMessageError:(message:string)=>void,
  sneakers_basket_full:ISneaker[]
}
const SneakerBasket=(p:proops)=>{
  const dispatch = useAppDispatch()
  const deleteFromBasket=()=>{
    try {
      const upd_sneakers_basket = p.sneakers_basket_full?.filter(item=>item.id!==p.id).map(el=>el.id) || []
      dispatch(setSneakers_basket(upd_sneakers_basket))  
    } catch (error) {
      p.setMessageError("Ошибка")
      console.log(error)
    }
  }
return (
<div className={`${s.sneaker_basket}`}>
  <img src={p.img} alt='sneaker'></img> 
  <div className={`${s.des_basket}`}><p>{p.des}</p><h3>{p.price}</h3></div>
  <button onClick={deleteFromBasket}></button>
</div>
)}
export default SneakerBasket