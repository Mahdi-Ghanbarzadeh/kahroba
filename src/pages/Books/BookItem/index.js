import classes from "./BookItem.module.scss";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import axiosInstance from "../../../axios";
import { useContext } from "react";
import UserContext from "../../../store/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookItem({
  id,
  name,
  author,
  translator,
  print_year,
  isbn,
  description,
  picture,
  donator,
  is_donated,
  is_received,
  is_requested_before,
  setBooks,
}) {
  console.log("--test--");
  const { user, logout } = useContext(UserContext);
  console.log(user.userId);

  function handleBook() {
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

    if (donator === user.userId) {
      axiosInstance
        .post(`book/delete/`, {
          book: id,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            notifySuccess("کتاب با موفقیت حذف شد");
            setBooks((prev) => prev.filter((book) => book.book_id !== id));
          }
        })
        .catch((err) => {
          notifyError("خطایی رخ داد");
        });
    } else {
      if (is_requested_before) {
        axiosInstance
          .post(`book/request/delete/`, {
            book: id,
          })
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              notifySuccess("درخواست کتاب با موفقیت حذف شد");
              setBooks((prev) => [
                {
                  book_id: id,
                  name: name,
                  author: author,
                  translator: translator,
                  publish_year: print_year,
                  shabak: isbn,
                  description: description,
                  picture: picture,
                  donator: donator,
                  is_donated: is_donated,
                  is_received: is_received,
                  is_requested_before: false,
                  setBooks: setBooks,
                },
                ...prev.filter((book) => book.book_id !== id),
              ]);
            }
          })
          .catch((err) => {
            notifyError("خطایی رخ داد");
          });
      } else {
        axiosInstance
          .post(`book/request/register/`, {
            book: id,
          })
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              notifySuccess("درخواست کتاب با موفقیت افزوده شد");

              setBooks((prev) => [
                {
                  book_id: id,
                  name: name,
                  author: author,
                  translator: translator,
                  publish_year: print_year,
                  shabak: isbn,
                  description: description,
                  picture: picture,
                  donator: donator,
                  is_donated: is_donated,
                  is_received: is_received,
                  is_requested_before: true,
                  setBooks: setBooks,
                },
                ...prev.filter((book) => book.book_id !== id),
              ]);
            }
          })
          .catch((err) => {
            notifyError("موجودی رویش شما کافی نیست");
          });
      }
    }
  }
  return (
    <div className={classes.BookItem}>
      <img src={picture} className={classes.BookItem__pic} alt={name} />
      <div className={classes.BookItem__description}>
        <div className={classes.BookItem__description__container}>
          <span className={classes.BookItem__description__name}>
            <span className={classes.BookItem__description__key}>
              عنوان کتاب:{" "}
            </span>
            {name}
          </span>
        </div>

        <div className={classes.BookItem__description__container}>
          <span className={classes.BookItem__description__name}>
            <span className={classes.BookItem__description__key}>
              نویسنده:{" "}
            </span>
            {author}
          </span>
        </div>

        {translator !== "" && (
          <div className={classes.BookItem__description__container}>
            <span className={classes.BookItem__description__name}>
              <span className={classes.BookItem__description__key}>
                مترجم:{" "}
              </span>
              {translator}
            </span>
          </div>
        )}

        <div className={classes.BookItem__description__container}>
          <span className={classes.BookItem__description__name}>
            <span className={classes.BookItem__description__key}>
              سال چاپ:{" "}
            </span>
            {digitsEnToFa(print_year)}
          </span>
        </div>

        <div className={classes.BookItem__description__container}>
          <span className={classes.BookItem__description__name}>
            <span className={classes.BookItem__description__key}>شابک: </span>
            {digitsEnToFa(isbn)}
          </span>
        </div>

        <div className={classes.BookItem__description__container}>
          <span className={classes.BookItem__description__name}>
            <span className={classes.BookItem__description__longKey}>
              توضیحات:{" "}
            </span>
            {description}
          </span>
        </div>
      </div>
      <div className={classes.BookItem__btns}>
        <button className={classes.effect} onClick={handleBook}>
          {donator === user.userId
            ? "حذف کتاب"
            : is_requested_before
            ? "حذف درخواست"
            : "ثبت درخواست"}
        </button>
      </div>
    </div>
  );
}

export default BookItem;
