import classes from "./DonateBook.module.scss";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DonateBook() {
  const notifySuccess = () => {
    toast.success("کتاب با موفقیت افزوده شد", {
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

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (values) => {
    console.log(values);
    console.log(values.book_name);

    const emailRegex = new RegExp(/^\d+$/);

    if (
      !(
        (values.print_year > 1200 && values.print_year <= 1401) ||
        (values.print_year > 1900 && values.print_year <= 2023)
      )
    ) {
      notifyError("سال چاپ را صحیح وارد کنید");
      return;
    }

    if (!emailRegex.test(values.isbn)) {
      notifyError("شابک را صحیح وارد کنید");
      return;
    }

    console.log(values.book_url[0]);

    axiosInstance.defaults.headers["Content-Type"] = "multipart/form-data";
    console.log(axiosInstance.defaults.headers);
    console.log("---");
    const formData = new FormData();
    // formData.append("file", values.book_url);
    console.log(values.book_url);
    console.log(values.book_url[0]);
    formData.append("name", values.book_name);
    formData.append("description", values.description);
    formData.append("author", values.author_name);
    formData.append("picture", values.book_url[0]);
    // formData.append("picture", values.book_url);
    formData.append("translator", values.translator_name);
    formData.append("shabak", values.isbn);
    formData.append("publish_year", values.print_year);
    console.log(formData);
    console.log(axiosInstance.defaults.headers["Content-Type"]);
    // console.log(axiosInstance.defaults.headers.common);
    // console.log(axiosInstance.defaults.headers.common["Content-Type"]);
    // console.log(axiosInstance.defaults.headers.post["Content-Type"]);

    // axiosInstance.defaults.headers.common["Auth-Token"] = "foo bar";

    axiosInstance
      .post(
        `book/register/`,
        formData,
        // {
        //   name: values.book_name,
        //   description: values.description,
        //   author: values.author_name,
        //   picture: values.book_url,
        //   translator: values.translator_name,
        //   shabak: values.isbn,
        //   publish_year: values.print_year,
        // }
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          console.log(res);
          notifySuccess();
          console.log("add book");
          reset({
            book_name: "",
            description: "",
            author_name: "",
            book_url: "",
            translator_name: "",
            isbn: "",
            print_year: "",
          });
        }
      })
      .catch((err) => {
        notifyError("خطایی رخ داد");
      });

    console.log("---");
    axiosInstance.defaults.headers["Content-Type"] = "application/json";
    console.log(axiosInstance.defaults.headers);
  };

  // let myPromise;
  // const onSubmit = (values) => {
  // console.log(values);
  // console.log(values.book_name);
  // myPromise = new Promise((resolve) =>
  //   axiosInstance
  //     .post(`book/register/`, {
  //       name: values.book_name,
  //       description: values.description,
  //       author: values.book_name,
  //       picture: values.book_url,
  //       translator: values.translator_name,
  //       shabak: values.isbn,
  //       publish_year: values.print_year,
  //     })
  //     .then((res) => {
  //       if (res.status >= 200 && res.status < 300) {
  //         console.log(res);
  //         setTimeout(() => resolve(res), 3000);
  //         // notify();
  //         console.log("add book");
  //         // navigate("/user-panel");
  //       }
  //     })
  // );
  // };

  // useEffect(() => {
  //   toast.promise(myPromise, {
  //     pending: "Promise is pending",
  //     success: "Promise  Loaded",
  //     error: "error",
  //   });
  // }, [myPromise]);

  return (
    <div className={classes.container}>
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
      <div className={classes.container__headerContainer}>
        <div className={classes.container__headerContainer__header}>
          <span className={classes.container__headerContainer__text}>
            اهدای کتاب
          </span>
        </div>
      </div>
      <span className={classes.container__description}>
        لطفا مشخصات کتاب را وارد کنید (وارد کردن همه موارد به جز مترجم الزامی
        است).
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
              required: false,
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
              required: false,
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
            {...register("description", {
              required: true,
            })}
          />
          <span className={classes.input__label}>خلاصه کتاب</span>
        </label>

        <label className={classes.input}>
          <br />
          {/* <input
            className={classes.input__field}
            type="text"
            placeholder=" "
            {...register("book_url", {
              required: true,
            })}
          /> */}
          <input
            type="file"
            accept="image/png, image/jpeg"
            {...register("book_url", {
              required: true,
            })}
          />
          <span className={classes.input__picture}>عکس</span>
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
