import s from './SneakerBasket.module.sass'
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks"
import {userApi} from "../../../../store/api/user.api"
import {setUser} from "../../../../store/reducers/UserSlice"

const SneakerBasket=(p)=>{

  const user = useAppSelector(state=>state.UserReducer)
  const dispatch = useAppDispatch()

  const [updUser,{data,isLoading,error}] = userApi.useUpdUserMutation()

const deleteFromBasket = async()=>{
  try {
    const id_sneakers_basket = user.sneakers_basket.map(el=>el.id)
    const user_sneakers_basket = id_sneakers_basket.filter(item=>item!==p.id)
    
    const onfulfilled = await updUser({id:user.id,user:{sneakers_basket:JSON.stringify(user_sneakers_basket)}})
    if(onfulfilled.error){
      p.setMessageError(`${onfulfilled.error.status}: ${onfulfilled.error.data.detail[0].type}: ${onfulfilled.error.data.detail[0].msg}`)
      return
    }else if(onfulfilled.data.code >= 400){
      p.setMessageError(`${onfulfilled.data.code}: ${onfulfilled.data.message}`)
      return
    }
    p.setMessageError(onfulfilled.data.message)

    // const data = parseData(onfulfilled.data.user)
    const new_sneakers_basket = user.sneakers_basket.filter(item=>item.id!==p.id)
    dispatch(setUser({sneakers_basket:new_sneakers_basket}))
    
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
  );
}
export default SneakerBasket;