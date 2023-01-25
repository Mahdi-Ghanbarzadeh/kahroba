import React, { useState, useContext, useRef } from "react";
import classes from "./../Login/login.module.scss";
import UserContext from "../../../store/UserContext";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";

import { Marginer } from "../../../components/Marginer.jsx";
import { AccountContext } from "../accountContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const eye = <FontAwesomeIcon icon={faEye} />;
const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

export function Signup(props) {
  const notifySuccess = () => {
    toast.success(
      "ثبت‌نام با موفقیت انجام شد. ایمیل خود را تایید کنید و وارد شوید",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  const notifyError = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const form = useRef();

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

    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );

    if (!formData.phoneNumber.startsWith("09")) {
      notifyError("لطفا شماره تلفن صحیح وارد کنید");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      notifyError("لطفا یک ایمیل صحیح وارد کنید");
      return;
    }

    if (formData.password.length < 8) {
      notifyError("لطفا یک پسورد صحیح وارد کنید");
      return;
    }
    console.log(formData);
    axiosInstance
      .post(`auth/register/`, {
        name: formData.fullName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        password: formData.password,
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          console.log("test");
          notifySuccess();
          form.current.reset();
          updateFormData(initialFormData);

          setTimeout(() => {
            // login(
            //   res.data.name,
            //   res.data.user_id,
            //   res.data.phone_number,
            //   res.data.email,
            //   res.data.rooyesh
            // );
            // localStorage.setItem("token", res.data.token);
            // axiosInstance.defaults.headers["Authorization"] =
            // "Token " + localStorage.getItem("token");
            navigate("");
          }, 3000);
        }
      })
      .catch((e) => {
        notifyError("ایمیل وارد شده تکراری است");
      });
  };

  return (
    <div className={classes.boxContainer}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{ fontSize: "16px", fontFamily: "Vazirmatn" }}
      />
      <form ref={form} className={classes.boxContainer__formContainer}>
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
