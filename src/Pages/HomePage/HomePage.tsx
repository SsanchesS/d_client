import Header from "../../components/Header/Header"
import Overlay from "../../components/Overlay/Overlay"
import Banner from '../../components/Banner/Banner'
import SneakerMain from '../../components/SneakerMain/SneakerMain'
import s from "./HomePage.module.sass"

const HomePage = () => {
return (
<div className={`${s.HomePage}`}>
  <Overlay/> 
  <Header/>
  <Banner/>
  <SneakerMain/>
</div>
)}
export default HomePage