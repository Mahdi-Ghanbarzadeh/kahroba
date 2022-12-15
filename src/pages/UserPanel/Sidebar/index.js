import classes from "./Sidebar.module.scss";
import MainNavigation from "../../../components/MainNavigation";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../../store/UserContext";

function Sidebar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  function logoutHandler() {
    logout();
    navigate("/");
  }

  return (
    <>
      <nav className={classes.sidebar}>
        <div className={classes["seller-info"]}>
          <img src="./images/user1.png" className={classes.userImage} />
          <div className={classes["seller-info__description"]}>
            <div className={classes["seller-info__title"]}>{user.username}</div>
            <div className={classes["seller-info__phone"]}>
              {user.phoneNumber}
            </div>
          </div>
        </div>

        <ul className={classes["side-nav"]}>
          <Link to="/user-panel/favorites" className={classes.link}>
            <li className={classes["side-nav__item"]}>
              <a
                href="#"
                className={classNames(
                  classes["side-nav__link--active"],
                  classes["side-nav__link"]
                )}
              >
                <i
                  className={classNames(
                    classes["side-nav__icon"],
                    "fa-solid fa-bookmark"
                  )}
                />
                اهدای کتاب
              </a>
            </li>
          </Link>

          <Link to="/user-panel/orders" className={classes.link}>
            <li className={classes["side-nav__item"]}>
              <a
                href="#"
                className={classNames(
                  classes["side-nav__link--active"],
                  classes["side-nav__link"]
                )}
              >
                <i
                  className={classNames(
                    classes["side-nav__icon"],
                    "fa-solid fa-bag-shopping"
                  )}
                />
                کتاب‌های اهدایی
              </a>
            </li>
          </Link>

          <Link to="/user-panel/orders" className={classes.link}>
            <li className={classes["side-nav__item"]}>
              <a
                href="#"
                className={classNames(
                  classes["side-nav__link--active"],
                  classes["side-nav__link"]
                )}
              >
                <i
                  className={classNames(
                    classes["side-nav__icon"],
                    "fa-solid fa-bag-shopping"
                  )}
                />
                کتاب‌های درخواستی
              </a>
            </li>
          </Link>

          <Link to="/user-panel/personal-info" className={classes.link}>
            <li className={classes["side-nav__item"]}>
              <a
                href="#"
                className={classNames(
                  classes["side-nav__link--active"],
                  classes["side-nav__link"]
                )}
              >
                <i
                  className={classNames(
                    classes["side-nav__icon"],
                    "fa-solid fa-user"
                  )}
                />
                اطلاعات حساب کاربری
              </a>
            </li>
          </Link>

          {/* <Link to={"/"} className={classes.link}> */}
          <li onClick={logoutHandler} className={classes["side-nav__item"]}>
            <a href="#/" className={classNames(classes["side-nav__link"])}>
              <i
                className={classNames(
                  classes["side-nav__icon"],
                  "fa-solid fa-arrow-right-from-bracket"
                )}
              />
              <span>خروج</span>
            </a>
          </li>
          {/* </Link> */}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
