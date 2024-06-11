import React,{useState, useEffect ,FC} from 'react'
import s from './AdminPage.module.sass'
import Header from "../../components/Header/Header";
import AdminMain from '../../components/AdminMain/AdminMain';

const AdminPage=()=>{

return(
<div className={`${s.AdminPage}`}>
   <Header admin={true}/>
   <AdminMain/>
</div>
)}
export default AdminPage