import classes from "./UserPanel.module.scss";
import MainNavigation from "../../components/MainNavigation";
import Sidebar from "./Sidebar";
// import AddProduct from "./AddProduct";
// import Orders from "./Orders";
// import Favorites from "./Favorites";
// import EditProduct from "./EditProduct";
import { Outlet } from "react-router-dom";

function UserPanel() {
  return (
    <>
      <MainNavigation />
      <div className={classes.SellerPanel}>
        <div className={classes.SellerPanel__container}>
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserPanel;
