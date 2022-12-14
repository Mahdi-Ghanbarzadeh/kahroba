import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Marginer } from "../../../components/Marginer.jsx";
import classes from "./ForgotPassword.module.scss";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/UserContext";
import axiosInstance from "../../../axios";

export default function ForgotPassword() {
  const navigate = useNavigate();

  let { user } = useContext(UserContext);

  useEffect(() => {
    if (user.auth) {
      navigate("/");
    }
  }, [user.auth, navigate]);

  const initialFormData = Object.freeze({
    email: "",
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
    console.log(formData);
    axiosInstance
      .post(`accounts/reset_password/`, {
        email: formData.email,
      })
      .then((res) => {
        navigate(-1);
      });
    console.log(formData);
  };

  return (
    <div className={classes.appContainer}>
      <div className={classes.appContainer__boxContainer}>
        <div className={classes.appContainer__boxContainer__topContainer}>
          <div
            className={
              classes.appContainer__boxContainer__topContainer__backDrop
            }
          />
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
              لطفا برای بازیابی، ایمیل خود را وارد کنید.
            </span>
          </div>
        </div>
        <div className={classes.appContainer__boxContainer__innerContainer}>
          <input
            className={
              classes.appContainer__boxContainer__innerContainer__input
            }
            type="email"
            placeholder="ایمیل"
            autoFocus
            onChange={handleChange}
            name="email"
          />
          <Marginer direction="vertical" margin={20} />
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={!formData.email}
            className={
              !formData.email
                ? classes.appContainer__boxContainer__innerContainer__btn__disable
                : classes.appContainer__boxContainer__innerContainer__btn
            }
          >
            بازیابی
          </button>
          <Marginer direction="vertical" margin={30} />
          <span
            className={
              classes.appContainer__boxContainer__innerContainer__boldLink
            }
            onClick={() => navigate(-1)}
          >
            ورود | ثبت‌نام
          </span>
        </div>
      </div>
    </div>
  );
}
