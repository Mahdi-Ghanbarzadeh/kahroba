import React, { useContext } from "react";
import UserContext from "../../../store/UserContext";
import classes from "./HeroSection.module.scss";
import Button from "../../../components/Button";
import classNames from "classnames";
import { Link } from "react-router-dom";

function HeroSection() {
  const { user } = useContext(UserContext);
  return (
    <section className={classes.HeroSection}>
      <div className={classes.HeroSection__content}>
        <div className={classes.HeroSection__info}>
          <h1 className={classes["HeroSection__info--header"]}>
            کتاب مورد علاقت رو رایگان دریافت کن و با اهدای کتابت، لذت مطالعه رو
            برای دیگران فراهم کن.
          </h1>

          <div>
            <Link to={user.auth ? "/survey" : "/account-box"}>
              <Button
                color="purple"
                className={classes["HeroSection__button--right"]}
              >
                بزن بریم
              </Button>
            </Link>

            <Link to={"/"}>
              <Button
                color="white"
                className={classes["HeroSection__button--left"]}
              >
                درباره ما
              </Button>
            </Link>
          </div>
        </div>
        <div className={classes.HeroSection__gallery}>
          <img
            src="./images/2.jpg"
            alt="picture 1"
            className={classNames(
              classes.HeroSection__gallery__photo,
              classes["HeroSection__gallery__photo--p1"]
            )}
          />
          <img
            src="../images/5.jpg"
            alt="picture 2"
            className={classNames(
              classes.HeroSection__gallery__photo,
              classes["HeroSection__gallery__photo--p2"]
            )}
          />
          <img
            src="../images/6.jpg"
            alt="picture 3"
            className={classNames(
              classes.HeroSection__gallery__photo,
              classes["HeroSection__gallery__photo--p3"]
            )}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
