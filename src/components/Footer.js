import classNames from "classnames";
import React from "react";
import classes from "./Footer.module.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={classes.Footer}>
      <div className={classes.Footer__container}>
        <div className={classes.Footer__logo}>
          کهربا
          {/* <img src="./images/logo.png" className={classes.Footer__logo__pic} /> */}
        </div>
        <div className={classes.Footer__row}>
          <div className={classes.Footer__column}>
            <ul className={classes.Footer__list}>
              <li className={classes.Footer__item}>
                <a href="#" className={classes.Footer__link}>
                  درباره ما
                </a>
              </li>
              <Link to={"/FAQ"}>
                <li className={classes.Footer__item}>
                  <a href="#" className={classes.Footer__link}>
                    سوالات متداول
                  </a>
                </li>
              </Link>
              <li className={classes.Footer__item}>
                <a href="#" className={classes.Footer__link}>
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>
          <div className={classes.column}>
            <div className={classes.Footer__icon}>
              <i
                className={classNames(
                  "fa-brands fa-instagram",
                  classes["Footer__icon--i1"]
                )}
              />
              <i
                className={classNames(
                  "fa-brands fa-twitter",
                  classes["Footer__icon--i2"]
                )}
              />
              <i
                className={classNames(
                  "fa-brands fa-linkedin",
                  classes["Footer__icon--i3"]
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
