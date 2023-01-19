import React, { useContext } from "react";
import UserContext from "../store/UserContext";
import Button from "./Button";
import classes from "./MainNavigation.module.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
const loginIcon = <FontAwesomeIcon icon={faArrowRightToBracket} />;
const booksIcon = <FontAwesomeIcon icon={faBook} />;
const infoIcon = <FontAwesomeIcon icon={faCircleInfo} />;
const contactIcon = <FontAwesomeIcon icon={faPhone} />;

function MainNavigation() {
  const { user } = useContext(UserContext);
  // user.auth = true;
  return (
    <header className={classes.header}>
      <div className={classes.content}>
        <div className={classes.containerLogo}>
          <Link to="/" className={classes.link}>
            <div className={classes.logo}>کهربا</div>
          </Link>
        </div>

        <div className={classes.containerNav}>
          <nav className={classes.Navigation}>
            <ul className={classes["Navigation--list"]}>
              <Link to="/books" className={classes.link}>
                <li className={classes["Navigation--item"]}>
                  <i className={classes.header__login_logo}>{booksIcon}</i>
                  <span>کتاب‌ها</span>
                </li>
              </Link>
              <Link to="/" className={classes.link}>
                <li className={classes["Navigation--item"]}>
                  <i className={classes.header__login_logo}>{infoIcon}</i>
                  <span>درباره ما</span>
                </li>
              </Link>
              <Link to={"/"} className={classes.link}>
                <li className={classes["Navigation--item"]}>
                  <i className={classes.header__login_logo}>{contactIcon}</i>
                  <span>تماس با ما</span>
                </li>
              </Link>
            </ul>
          </nav>
          {user.auth ? (
            <div className={classes.container__btns}>
              <Link to="/user-panel" className={classes.link}>
                <Button color="white" className={classes.header__navButton}>
                  <i className={classNames(classes.header__login_logo)} />
                  حساب کاربری
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/account-box" className={classes.link}>
              <Button color="white" className={classes.header__login_btn}>
                <i className={classes.header__login_logo}>{loginIcon}</i>
                <span> ورود | ثبت‌نام</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default MainNavigation;
