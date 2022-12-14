import React, { useState, useContext } from "react";
import classes from "./../Login/login.module.scss";
import UserContext from "../../../store/UserContext";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";

import { Marginer } from "../../../components/Marginer.jsx";
import { AccountContext } from "../accountContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const eye = <FontAwesomeIcon icon={faEye} />;
const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

export function Signup(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const { login } = useContext(UserContext);
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    // console.log(e.target.name);
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // console.log("before axios");
    axiosInstance
      .post(`accounts/register/`, {
        username: formData.fullName,
        email: formData.email,
        user_phone_number: formData.phoneNumber,
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
          // history.push("/login");
          // console.log("axios");
          console.log(res);
          console.log(res.data);
        }
      });
  };

  return (
    <div className={classes.boxContainer}>
      <form className={classes.boxContainer__formContainer}>
        <input
          className={classes.boxContainer__formContainer__input}
          name="fullName"
          type="text"
          placeholder="نام و نام‌خانوادگی"
          autoFocus
          onChange={handleChange}
        />
        <Marginer direction="vertical" margin={10} />
        <input
          className={classes.boxContainer__formContainer__input}
          name="email"
          type="email"
          placeholder="ایمیل"
          onChange={handleChange}
        />
        <Marginer direction="vertical" margin={10} />
        <input
          className={classes.boxContainer__formContainer__input}
          name="phoneNumber"
          type="tel"
          placeholder="شماره موبایل"
          onChange={handleChange}
        />
        <Marginer direction="vertical" margin={10} />
        <div className={classes.boxContainer__formContainer__passWrapper}>
          <input
            className={classes.boxContainer__formContainer__input}
            name="password"
            type={passwordShown ? "text" : "password"}
            placeholder="رمز عبور"
            onChange={handleChange}
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
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={
          !formData.fullName ||
          !formData.email ||
          !formData.phoneNumber ||
          !formData.password
        }
        className={
          !formData.fullName ||
          !formData.email ||
          !formData.phoneNumber ||
          !formData.password
            ? classes.boxContainer__btn__disable
            : classes.boxContainer__btn
        }
      >
        ثبت‌نام
      </button>
      <Marginer direction="vertical" margin="1.5rem" />
      <a className={classes.boxContainer__mutedLink} href="#">
        عضو سایت هستید؟
        <a
          className={classes.boxContainer__boldLink}
          href="#"
          onClick={switchToSignin}
        >
          وارد شوید
        </a>
      </a>
    </div>
  );
}
