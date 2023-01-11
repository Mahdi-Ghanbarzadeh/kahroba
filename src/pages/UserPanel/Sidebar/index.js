import classes from "./Sidebar.module.scss";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../../../store/UserContext";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useInView } from "react-intersection-observer";

function Sidebar() {
  const { user, logout } = useContext(UserContext);
  const menu1 = useRef(null);
  const [currentMenu, setCurretMenu] = useState(menu1);
  const navigate = useNavigate();
  user.username = "مهدی قنبرزاده ";
  user.phoneNumber = "09338682635";

  // useEffect(() => {
  //   navigate("/user-panel/favorites");
  // }, [navigate]);

  function logoutHandler() {
    logout();
    navigate("/");
  }

  const { ref, inView, entry } = useInView({
    threshold: 1,
  });

  // function menuClickHandler(e) {
  //   if (e.target !== currentMenu.current) {
  //     currentMenu.current.className = "side-nav__link";
  //     console.log(currentMenu.current.className);

  //     e.target.className = "side-nav__linkClicked";
  //     console.log(e.target.className);
  //     setCurretMenu(e.target);
  //   }
  //   console.log(currentMenu.current);
  //   console.log(e.target);
  //   console.log(e.target === currentMenu.current);
  //   console.log(e.target.className);
  //   console.log(e.target.classNames);
  //   console.log("clicked!");
  // }

  return (
    <div ref={ref}>
      <nav className={inView ? classes.sidebar : classes.sidebar__sticky}>
        <div className={classes["user-info"]}>
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
          <div className={classes["user-info__description"]}>
            <img
              src={"/assets/user-icon.jpg"}
              alt=""
              className={classes.userImage}
            />
            <div className={classes["user-info__descriptions"]}>
              <div className={classes["user-info__title"]}>{user.username}</div>
              <div className={classes["user-info__phone"]}>
                {digitsEnToFa(user.phoneNumber)}
              </div>
            </div>
          </div>
          <div className={classes["user-info__tokens"]}>
            <span>{`رویش موجود: ${digitsEnToFa(5)} عدد`}</span>
          </div>
        </div>
        <ul className={classes["side-nav"]}>
          <Link to="/user-panel/donate-book" className={classes.link}>
            <li className={classes["side-nav__item"]}>
              <a
                href="#"
                className={classNames(
                  classes["side-nav__link--active"],
                  classes["side-nav__link"]
                )}
                // onClick={menuClickHandler}
                // ref={menu1}
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

          <Link to="/user-panel/donated-books" className={classes.link}>
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

          <Link to="/user-panel/requested-books" className={classes.link}>
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

          <Link to="/user-panel/personal-information" className={classes.link}>
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
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
