import classes from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import axiosInstance from "../../../../axios";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Marginer } from "../../../../components/Marginer";
import UserContext from "../../../../store/UserContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const eye = <FontAwesomeIcon icon={faEye} />;
const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
const close = <FontAwesomeIcon icon={faXmark} />;

function Modal(props) {
  const notifySuccess = (message) => {
    toast.success(message, {
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

  const notifyError = (message) => {
    toast.error(message, {
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

  const [passwordShown1, setPasswordShown1] = useState(false);
  const togglePasswordVisiblity1 = () => {
    setPasswordShown1(passwordShown1 ? false : true);
  };

  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePasswordVisiblity2 = () => {
    setPasswordShown2(passwordShown2 ? false : true);
  };

  const initialFormData = Object.freeze({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    postalCode: "",
    currentPassword: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const { updateName, updatePhone } = useContext(UserContext);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  function cancelHandler() {
    props.onCancel();
  }

  function confirmHandler() {
    axiosInstance
      .patch(`auth/update/`, {
        ...(formData.email && { email: formData.email }),
        ...(formData.fullName && { name: formData.fullName }),
        ...(formData.phoneNumber && {
          phone_number: formData.phoneNumber,
        }),
        ...(formData.address && { post_address: formData.address }),
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          notifySuccess("ویرایش با موفقیت انجام شد");
          setTimeout(() => {
            props.onConfirm();
            formData.fullName && updateName(formData.fullName);
            formData.phoneNumber && updatePhone(formData.phoneNumber);
            props.setInformation(res.data);
          }, 1500);
        }
      })
      .catch((err) => {
        notifyError("خطایی رخ داد");
      });
  }

  return (
    <div className={classes.modal}>
      <div className={classes.modal__header}>
        <h2 className={classes.modal__header__title}>ویرایش {props.title}</h2>
        <span className={classes.modal__header__icon} onClick={cancelHandler}>
          {close}
        </span>
      </div>
      <form onSubmit={confirmHandler} className={classes.modal__inputWrapper}>
        {props.type === "password" && (
          <div className={classes.modal__inputWrapper__inputBox}>
            <input
              className={classes.modal__inputWrapper__inputBox__input}
              type={passwordShown1 ? "text" : props.type}
              placeholder={`${props.title} فعلی`}
              autoFocus
              required
              onChange={handleChange}
              name="currentPassword"
            />
            <i
              className={classes.modal__inputWrapper__inputBox__icon}
              onClick={togglePasswordVisiblity1}
            >
              {passwordShown1 ? eye : eye_slash}
            </i>
            <Marginer direction="vertical" margin="2rem" />
          </div>
        )}
        <div className={classes.modal__inputWrapper__inputBox}>
          {props.type === "password" ? (
            <input
              className={classes.modal__inputWrapper__inputBox__input}
              type={passwordShown2 ? "text" : props.type}
              placeholder={
                props.type === "password" ? `${props.title} جدید` : props.title
              }
              required
              onChange={handleChange}
              name={props.name}
            />
          ) : (
            <input
              className={classes.modal__inputWrapper__inputBox__input}
              type={passwordShown2 ? "text" : props.type}
              placeholder={
                props.type === "password" ? `${props.title} جدید` : props.title
              }
              autoFocus
              required
              onChange={handleChange}
              name={props.name}
            />
          )}

          {props.type === "password" && (
            <i
              className={classes.modal__inputWrapper__inputBox__icon}
              onClick={togglePasswordVisiblity2}
            >
              {passwordShown2 ? eye : eye_slash}
            </i>
          )}
        </div>
      </form>
      <button
        className={
          props.type === "password"
            ? !formData[props.name] || !formData.currentPassword
              ? classes.modal__btn__disable
              : classes.modal__btn
            : !formData[props.name]
            ? classes.modal__btn__disable
            : classes.modal__btn
        }
        onClick={confirmHandler}
        disabled={
          props.type === "password"
            ? !formData[props.name] || !formData.currentPassword
            : !formData[props.name]
        }
      >
        ویرایش
      </button>
    </div>
  );
}

export default Modal;
