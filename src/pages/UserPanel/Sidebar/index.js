import classes from "./Sidebar.module.scss";
import MainNavigation from "../../../components/MainNavigation";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../../store/UserContext";
import { digitsEnToFa } from "@persian-tools/persian-tools";

function Sidebar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  user.username = "مهدی قنبرزاده ";
  user.phoneNumber = "09338682635";

  function logoutHandler() {
    logout();
    navigate("/");
  }

  return (
    <>
      <nav className={classes.sidebar}>
        <div className={classes["seller-info"]}>
          {/* <img src="./user-icon.jpg" className={classes.userImage} /> */}
          {/* <img
            src={"./../../../../public/user-icon.jpg"}
            className={classes.userImage}
          /> */}

          {/* <img
            src={`${process.env.PUBLIC_URL}/assets/user-icon.jpg`}
            className={classes.userImage}
            alt="logo"
          /> */}
          <div className={classes["seller-info__description"]}>
            <img
              src={"/assets/user-icon.jpg"}
              alt=""
              className={classes.userImage}
            />
            <div className={classes["seller-info__descriptions"]}>
              <div className={classes["seller-info__title"]}>
                {user.username}
              </div>
              <div className={classes["seller-info__phone"]}>
                {digitsEnToFa(user.phoneNumber)}
              </div>
            </div>
          </div>
          <div className={classes["seller-info__tokens"]}>
            {/* <span>رویش موجود: 5 عدد</span> */}
            <span>{`رویش موجود: ${digitsEnToFa(5)} عدد`}</span>
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
