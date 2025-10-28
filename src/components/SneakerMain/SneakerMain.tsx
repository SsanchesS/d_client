import React,{useState,useEffect, type ChangeEvent} from 'react'
import Sneaker from './Sneaker/Sneaker'
import { useAppSelector,useAppDispatch } from "../../hooks/hooks"
import s from './SneakerMain.module.sass'
import { userApi } from '../../store/api/user.api'
import {setSneakers,setMethods} from "../../store/reducers/SneakersSlice"

const SneakerMain=()=>{
   const state = useAppSelector(state=>state.SneakersReducer)

   const [MessageError,setMessageError] = useState('')
   const dispatch = useAppDispatch()  
   
   let [inputSearch, setinputSearch] = React.useState("")
   let inputChange = (event:ChangeEvent<HTMLInputElement>) => {
      setinputSearch(event.target.value)
   }
   
   const {data:methods_data,isLoading:methods_isLoading,error:methods_error} = userApi.useGetMethodsQuery(null)
   const error_methods_any:any = methods_error
   useEffect(()=>{
      if(error_methods_any){
         setMessageError(`${error_methods_any.status}: ${error_methods_any.data?.detail[0].type}: ${error_methods_any.data?.detail[0].msg}`)
      }else if(methods_data?.code !== undefined && methods_data?.code >= 400){
         setMessageError(`${methods_data?.code}: ${methods_data?.message}`)
      }else if (methods_data?.methods) {
         setMessageError(methods_data.message)
         dispatch(setMethods(methods_data.methods))
      }     
   },[methods_data, methods_error, dispatch])   

   const {data,isLoading,error} = userApi.useGetSneakersQuery(null)
   const error_any:any = error
   useEffect(() => {
      if(error){
         setMessageError(`${error_any.status}: ${error_any.data?.detail[0].type}: ${error_any.data?.detail[0].msg}`)
      }else if(data && data.code !== undefined && data?.code >= 400){
         setMessageError(`${data?.code}: ${data?.message}`)
      }else if (data?.sneakers) {
         setMessageError(data.message)
         dispatch(setSneakers(data.sneakers))
      }
  }, [data, error, dispatch])
return (
<div className={`${s.sneakers_wrap_main}`}>
   <div className={`${MessageError ? '' : 'vis_none'} red`}><p className={`mt10px ${s.MessageError} red`}>{MessageError}</p></div>
   <div className={`${s.sneakers_header}`}><h1>{inputSearch ? `Поиск по: ${inputSearch}` : "Все кроссовки"}</h1><div className={`${s.search}`}><img src='./img/search.svg' alt='search'></img><input placeholder='Поиск...' value={inputSearch} onChange={inputChange} /></div></div>
   <div className={`${s.sneakers_wrap}`}>{
      isLoading ?
      <h2 className={ `white ${isLoading ? "" : "vis_none"}` }>Загрузка...</h2>
      :
      state.sneakers?.filter(obj=>obj.des?.toLowerCase().includes(inputSearch.toLowerCase())).map((obj,index) => {
         return (
            <Sneaker 
            key={index}
            id={obj.id}
            des={obj.des} 
            price={obj.price} 
            img={obj.img} 
            category_id={obj.category_id}
            setMessageError={setMessageError}
            />
         )
      })
   }
   </div>
</div>
)}
export default SneakerMain