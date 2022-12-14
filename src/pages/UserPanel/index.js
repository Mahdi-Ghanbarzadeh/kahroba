import classes from "./UserPanel.module.scss";
import MainNavigation from "../../components/MainNavigation";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function UserPanel() {
  return (
    <>
      <MainNavigation />
      <div className={classes.UserPanel}>
        <div className={classes.UserPanel__container}>
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserPanel;
