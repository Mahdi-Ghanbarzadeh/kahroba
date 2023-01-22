import classes from "./Sidebar.module.scss";
import classNames from "classnames";
import { Link, useNavigate, useMatch, useResolvedPath } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../../../store/UserContext";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const tokenIcon = <FontAwesomeIcon icon={faSeedling} />;
const donateIcon = <FontAwesomeIcon icon={faShare} />;
const donatedIcon = <FontAwesomeIcon icon={faFileArrowUp} />;
const requestedIcon = <FontAwesomeIcon icon={faFileArrowDown} />;
const informationIcon = <FontAwesomeIcon icon={faUser} />;
const logoutIcon = <FontAwesomeIcon icon={faArrowRightFromBracket} />;

function Sidebar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/user-panel/favorites");
  // }, [navigate]);

  function logoutHandler(e) {
    e.preventDefault();
    logout();
    navigate("/");
    window.scroll(0, 0);
  }

  const { ref, inView, entry } = useInView({
    threshold: 1,
  });

  return (
    <div ref={ref}>
      <nav className={inView ? classes.sidebar : classes.sidebar__sticky}>
        <div className={classes["user-info"]}>
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
            <span>{tokenIcon}</span>
            <span>{`رویش : ${digitsEnToFa(user.rooyesh)} عدد`}</span>
          </div>
        </div>
        <ul className={classes["side-nav"]}>
          <CustomLink to="/user-panel/donate-book" icon={donateIcon}>
            اهدای کتاب
          </CustomLink>

          <CustomLink to="/user-panel/donated-books" icon={donatedIcon}>
            کتاب‌های اهدایی
          </CustomLink>

          <CustomLink to="/user-panel/requested-books" icon={requestedIcon}>
            کتاب‌های درخواستی
          </CustomLink>

          <CustomLink
            to="/user-panel/personal-information"
            icon={informationIcon}
          >
            اطلاعات حساب کاربری
          </CustomLink>

          <li onClick={logoutHandler} className={classes["side-nav__item"]}>
            <i className={classes["side-nav__icon"]}>{logoutIcon}</i>
            <a href="#/" className={classNames(classes["side-nav__link"])}>
              <span>خروج</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function CustomLink({ to, icon, children }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link to={to} className={classes.link}>
      <li
        className={
          isActive
            ? classes["side-nav__item--active"]
            : classes["side-nav__item"]
        }
      >
        <i className={classes["side-nav__icon"]}>{icon}</i>
        <a href="#" className={classNames(classes["side-nav__link"])}>
          {children}
        </a>
      </li>
    </Link>
  );
}

export default Sidebar;
