import React from 'react';
import {Routes,Route} from 'react-router-dom'
import { useAppSelector } from "./hooks/hooks";

import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import HomePage from './Pages/HomePage/HomePage';
import UserPage from './Pages/UserPage/UserPage';

function App() {
  const user = useAppSelector(state=>state.UserReducer)
return (
<div className="App">
{ user.id ?
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
);}
export default App;