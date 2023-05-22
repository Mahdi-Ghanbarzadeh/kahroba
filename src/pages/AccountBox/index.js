import React, { useContext, useEffect, useState } from "react";
import { Login } from "./Login";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { Signup } from "./Signup";
import { Link, useNavigate } from "react-router-dom";
import classes from "./AccountBox.module.scss";
import UserContext from "../../store/UserContext";

function getBackdropVariants() {
  return {
    expanded: {
      width: "233%",
      height: "1050px",
      borderRadius: "20%",
      transform: "rotate(60deg)",
    },
    collapsed: {
      width: window.innerWidth >= 400 ? "139%" : "168%",
      height: "500px",
      borderRadius: "50%",
      transform: window.innerWidth >= 400 ? "rotate(20deg)" : "rotate(60deg)",
    },
  };
}

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export default function AccountBox(props) {
  let { user } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user.auth) {
  //     navigate("/");
  //   }
  // }, [user.auth, navigate]);

  let backdropVariants = getBackdropVariants();
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");
  const [biggerThan400, setBiggerThan400] = useState(
    window.innerWidth >= 400 ? true : false
  );

  useEffect(() => {
    function handleResize() {
      setBiggerThan400(window.innerWidth >= 400 ? true : false);
    }
    window.addEventListener("resize", handleResize);
  });

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <div className={classes.appContainer}>
        {active}
        <div className={classes.appContainer__boxContainer}>
          <div className={classes.appContainer__boxContainer__topContainer}>
            <motion.div
              initial={false}
              animate={isExpanded ? "expanded" : "collapsed"}
              variants={backdropVariants}
              transition={expandingTransition}
              className={
                classes.appContainer__boxContainer__topContainer__backDrop
              }
            />
            {active === "signin" && (
              <div
                className={
                  classes.appContainer__boxContainer__topContainer__headerContainer
                }
              >
                <h2
                  className={
                    classes.appContainer__boxContainer__topContainer__headerContainer__headerText
                  }
                >
                  <Link
                    className={
                      classes.appContainer__boxContainer__topContainer__headerContainer__headerText__link
                    }
                    to={"/"}
                  >
                    کهربا
                  </Link>
                </h2>

                <span
                  className={
                    classes.appContainer__boxContainer__topContainer__headerContainer__bigText
                  }
                >
                  خوش آمدید
                </span>
                <span
                  className={
                    classes.appContainer__boxContainer__topContainer__headerContainer__smallText
                  }
                >
                  لطفا برای ادامه، وارد حساب کاربری خود شوید.
                </span>
              </div>
            )}
            {active === "signup" && (
              <div
                className={
                  classes.appContainer__boxContainer__topContainer__headerContainer
                }
              >
                <h2
                  className={
                    classes.appContainer__boxContainer__topContainer__headerContainer__headerText
                  }
                >
                  <Link
                    className={
                      classes.appContainer__boxContainer__topContainer__headerContainer__headerText__link
                    }
                    to={"/"}
                  >
                    کهربا
                  </Link>
                </h2>
                <span
                  className={
                    classes.appContainer__boxContainer__topContainer__headerContainer__bigText
                  }
                >
                  خوش آمدید
                </span>
                <span
                  className={
                    classes.appContainer__boxContainer__topContainer__headerContainer__smallText
                  }
                >
                  لطفا برای ادامه، حساب کاربری خود را بسازید.
                </span>
              </div>
            )}
          </div>
          <div className={classes.appContainer__boxContainer__innerContainer}>
            {active === "signin" && <Login />}
            {active === "signup" && <Signup />}
          </div>
        </div>
      </div>
    </AccountContext.Provider>
  );
}
