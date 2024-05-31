import Header from "../../components/Header/Header";
import Overlay from "../../components/Overlay/Overlay";
import SneakerBookmarks from '../../components/SneakerBookmarks/SneakerBookmarks';

import React from "react"

function MyBookmarks() {

return (
  <div className="App">
    <Overlay />
    <Header/>    
    <SneakerBookmarks/>  
  </div>
);
}

export default MyBookmarks;