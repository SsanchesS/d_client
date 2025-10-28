import {Routes,Route} from 'react-router-dom'
import { useAppSelector } from "./hooks/hooks"

import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage"
import AuthPage from "./Pages/AuthPage/AuthPage"
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage"
import HomePage from './Pages/HomePage/HomePage'
import UserPage from './Pages/UserPage/UserPage'
import AdminPage from './Pages/AdminPage/AdminPage'
import AdminUsers from './Pages/AdminPage/AdminUsers/AdminUsers'
import AdminOrders from './Pages/AdminPage/AdminOrders/AdminOrders'
import AdminSneakers from './Pages/AdminPage/AdminSneakers/AdminSneakers'
import AdminCategories from './Pages/AdminPage/AdminCategories/AdminCategories'
import AdminPromotions from './Pages/AdminPage/AdminPromotions/AdminPromotions'
import AdminDelivery_methods from './Pages/AdminPage/AdminDelivery_methods/AdminDelivery_methods'
import AdminPayment_methods from './Pages/AdminPage/AdminPayment_methods/AdminPayment_methods'
import AdminRoles from './Pages/AdminPage/AdminRoles/AdminRoles'

function App() {
  const user = useAppSelector(state=>state.UserReducer)
return (
<div className="App">
{ user.id ?
    user.role_id === 2 ? // admin
    <Routes>
      <Route path ='/' element = {<AdminPage/>}/>
      <Route path ='/User' element = {<UserPage admin={true}/>}/>
      <Route path ='/AdminUsers' element = {<AdminUsers/>}/>
      <Route path ='/AdminOrders' element = {<AdminOrders/>}/>
      <Route path ='/AdminSneakers' element = {<AdminSneakers/>}/>
      <Route path ='/AdminCategories' element = {<AdminCategories/>}/>
      <Route path ='/AdminPromotions' element = {<AdminPromotions/>}/>
      <Route path ='/AdminDelivery_methods' element = {<AdminDelivery_methods/>}/>
      <Route path ='/AdminPayment_methods' element = {<AdminPayment_methods/>}/>
      <Route path ='/AdminRoles' element = {<AdminRoles/>}/>
      <Route path="/notFound" element={<NotFoundPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    : 
    <Routes>
      <Route path ='/' element = {<HomePage/>}/>
      <Route path ='/User' element = {<UserPage/>}/>
      <Route path="/notFound" element={<NotFoundPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>    
  :
  <Routes>
    <Route path ='/' element = {<HomePage/>}/>
    <Route path="/registration" element={<RegistrationPage/>}/>
    <Route path="/auth" element={<AuthPage/>}/>
    <Route path="/notFound" element={<NotFoundPage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Routes>
}
</div>
)}
export default App