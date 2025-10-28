import {useState} from 'react'
import Header from "../../components/Header/Header"
import Overlay from "../../components/Overlay/Overlay"
import SneakerOrders from '../../components/SneakerOrders/SneakerOrders'
import User from '../../components/User/User'
import s from "./UserPage.module.sass"

interface proops{
  admin?: boolean
}
const UserPage=(p:proops)=>{
  const [MessageError,setMessageError] = useState('')
return (
  <div className={`${s.UserPage}`}>
    {p.admin?
      <>    
        <Header admin={true}/>
        <div className={`${MessageError ? '' : 'hide'} red`}><p className='mb10px'>{MessageError}</p></div>
        <User setMessageError={setMessageError}/>
      </>
      :
      <>
        <Overlay/>
        <Header/>
        <div className={`${MessageError ? '' : 'hide'} red`}><p className='mb10px'>{MessageError}</p></div>
        <User setMessageError={setMessageError}/>
        <SneakerOrders setMessageError={setMessageError}/>
      </>
    }    
  </div>
)}
export default UserPage