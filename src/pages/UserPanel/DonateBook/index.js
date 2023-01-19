import classes from "./DonateBook.module.scss";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function DonateBook() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (values) => {
    console.log(values);
    axiosInstance.post(``, {}).then((res) => {
      if (res.status === 200) {
        console.log("add product");
        navigate("/user-panel");
      }
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.container__headerContainer}>
        <div className={classes.container__headerContainer__header}>
          <span className={classes.container__headerContainer__text}>
            اهدای کتاب
          </span>
        </div>
      </div>
      <span className={classes.container__description}>
        لطفا مشخصات کتاب را وارد کنید (وارد کردن همه موارد الزامی است).
      </span>
      <form className={classes.form}>
        <label className={classes.input}>
          <input
            className={classes.input__field}
            type="text"
            placeholder=" "
            {...register("book_name", {
              required: true,
            })}
          />
          <span className={classes.input__label}>عنوان کتاب</span>
        </label>
        <label className={classes.input}>
          <input
            className={classes.input__field}
            type="text"
            placeholder=" "
            {...register("author_name", {
              required: true,
            })}
          />
          <span className={classes.input__label}>نویسنده</span>
        </label>
        <label className={classes.input}>
          <input
            className={classes.input__field}
            type="text"
            placeholder=" "
            {...register("translator_name", {
              required: true,
            })}
          />
          <span className={classes.input__label}>مترجم</span>
        </label>
        <label className={classes.input}>
          <input
            className={classes.input__field}
            type="text"
            placeholder=" "
            {...register("print_year", {
              required: true,
            })}
          />
          <span className={classes.input__label}>سال چاپ</span>
        </label>
        <label className={classes.input}>
          <input
            className={classes.input__field}
            type="text"
            placeholder=" "
            {...register("isbn", {
              required: true,
            })}
          />
          <span className={classes.input__label}>شابک</span>
        </label>
        <label className={classes.input}>
          <input
            className={classes.input__field}
            type="text"
            placeholder=" "
            {...register("book_url", {
              required: true,
            })}
          />
          <span className={classes.input__label}>عکس</span>
        </label>
        <label className={classes.input}>
          <input
            className={classes.input__field}
            type="text"
            placeholder=" "
            {...register("description", {
              required: true,
            })}
          />
          <span className={classes.input__label}>توضیحات</span>
        </label>
        <button
          onClick={handleSubmit(onSubmit)}
          className={isValid ? classes.btn : classes["btn--disable"]}
          disabled={!isValid}
        >
          اهدا
        </button>
      </form>
    </div>
  );
}
export default DonateBook;
