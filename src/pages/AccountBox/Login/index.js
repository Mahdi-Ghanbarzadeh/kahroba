import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../axios";
import classes from "./login.module.scss";

import UserContext from "../../../store/UserContext";
import { Marginer } from "../../../components/Marginer.jsx";
import { AccountContext } from "../accountContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

export function Login(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const { login } = useContext(UserContext);

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`accounts/api/token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        if (res.status === 200) {
          login(res.data.type, res.data.username, res.data.user_phone_number);
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");
          navigate(-1);
        }
      });
  };

  return (
    <div className={classes.boxContainer}>
      <Marginer direction="vertical" margin="2rem" />
      <form className={classes.boxContainer__formContainer}>
        <input
          className={classes.boxContainer__formContainer__input}
          type="email"
          placeholder="ایمیل"
          autoFocus
          onChange={handleChange}
          name="email"
        />
        <Marginer direction="vertical" margin={10} />
        <div className={classes.boxContainer__formContainer__passWrapper}>
          <input
            className={classes.boxContainer__formContainer__input}
            type={passwordShown ? "text" : "password"}
            placeholder="رمز عبور"
            onChange={handleChange}
            name="password"
          />
          <i
            className={classes.boxContainer__formContainer__passWrapper__icon}
            onClick={togglePasswordVisibility}
          >
            {passwordShown ? eye : eye_slash}
          </i>
        </div>
      </form>
      <Marginer direction="vertical" margin={20} />
      <Link
        to={"/forgot-password"}
        className={classes.boxContainer__forgotLink}
      >
        رمز عبور خود را فراموش کرده‌اید؟
      </Link>
      <Marginer direction="vertical" margin="1.2em" />
      <button
        onClick={handleSubmit}
        type="submit"
        disabled={!formData.email || !formData.password}
        className={
          !formData.email || !formData.password
            ? classes.boxContainer__btn__disable
            : classes.boxContainer__btn
        }
      >
        ورود
      </button>
      <Marginer direction="vertical" margin="1.5rem" />
      <a className={classes.boxContainer__mutedLink} href="#">
        عضو نیستید؟{" "}
        <a
          className={classes.boxContainer__boldLink}
          href="#"
          onClick={switchToSignup}
        >
          ثبت‌نام کنید
        </a>
      </a>
    </div>
  );
}
