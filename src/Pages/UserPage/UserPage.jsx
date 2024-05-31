import Header from "../../components/Header/Header";
import Overlay from "../../components/Overlay/Overlay";
import SneakerOrders from '../../components/SneakerOrders/SneakerOrders';
import User from '../../components/User/User';
import s from "./UserPage.module.sass"

function UserPage(p) {

return (
  <div className={`${s.UserPage}`}>
    <Overlay/>
    <Header/>
    <User/>
    <SneakerOrders/>
  </div>
);
}
export default UserPage;