import React,{useEffect} from 'react';
import {Routes,Route} from 'react-router-dom'
import { useAppSelector } from "./hooks/hooks";

import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import HomePage from './Pages/HomePage/HomePage';
import UserPage from './Pages/UserPage/UserPage';
import AdminPage from './Pages/AdminPage/AdminPage';

function App() {
  // useEffect(() => {
  //   const ws = new WebSocket("wss://swfnhkr9-3000.euw.devtunnels.ms:3000/ws");

  //   ws.onopen = () => {
  //     console.log("Connected to WebSocket server");
  //   };

  //   ws.onmessage = (event) => {
  //     console.log("Received message:", event.data);
  //   };

  //   ws.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   ws.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };
  //   // Cleanup on component unmount
  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  const user = useAppSelector(state=>state.UserReducer)
return (
<div className="App">
{ user.id ?
    user.role_id === 1 ?
    <Routes>
      <Route path ='/' element = {<HomePage/>}/>
      <Route path ='/User' element = {<UserPage/>}/>
      <Route path="/notFound" element={<NotFoundPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    :
    <Routes>
      <Route path ='/' element = {<AdminPage/>}/>
      <Route path ='/User' element = {<UserPage admin={true}/>}/>
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