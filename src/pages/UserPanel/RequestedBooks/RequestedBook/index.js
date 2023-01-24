import classes from "./RequestedBook.module.scss";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const trash = <FontAwesomeIcon icon={faTrash} />;
const confirm = <FontAwesomeIcon icon={faCircleCheck} />;
const flag = <FontAwesomeIcon icon={faFlag} />;

function RequestedBook({
  id,
  book_name,
  book_url,
  author_name,
  translator_name,
  print_year,
  isbn,
  status,
  is_reported,
  is_donated,
  is_received,
  user,
  description,
  donator,
  setBooks,
  phoneNumber,
}) {
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

  function handleDelete() {
    axiosInstance
      .post(`book/request/delete/`, {
        book: id,
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          notifySuccess("درخواست کتاب با موفقیت حذف شد");
          setBooks((prev) => prev.filter((book) => book.book.book_id !== id));
        }
      })
      .catch((err) => {
        notifyError("خطایی رخ داد");
      });
  }

  function handleConfirm() {
    axiosInstance
      .post(`book/request/receivebook/`, {
        book: id,
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          notifySuccess("دریافت کتاب با موفقیت ثبت شد");
          setBooks((prev) => [
            {
              book: {
                author: author_name,
                book_id: id,
                description: description,
                donator: donator,
                is_donated: is_donated,
                is_received: true,
                name: book_name,
                picture: book_url,
                publish_year: print_year,
                shabak: isbn,
                translator: translator_name,
                setBooks,
              },
              is_reported: is_reported,
              status: status,
              user: user,
              phone_number: phoneNumber,
            },
            ...prev.filter((book) => book.book.book_id !== id),
          ]);
        }
      })
      .catch((err) => {
        notifyError("خطایی رخ داد");
      });
  }

  function handleReport() {
    axiosInstance
      .post(`book/request/report/`, {
        book: id,
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          notifySuccess("شکایت با موفقیت ثبت شد");
          setBooks((prev) => [
            {
              book: {
                author: author_name,
                book_id: id,
                description: description,
                donator: donator,
                is_donated: is_donated,
                is_received: is_received,
                name: book_name,
                picture: book_url,
                publish_year: print_year,
                shabak: isbn,
                translator: translator_name,
                setBooks,
              },
              is_reported: true,
              status: status,
              user: user,
              phone_number: phoneNumber,
            },
            ...prev.filter((book) => book.book.book_id !== id),
          ]);
        }
      })
      .catch((err) => {
        notifyError("خطایی رخ داد");
      });
  }

  return (
    <div className={classes.RequestedBook}>
      <img
        src={book_url}
        className={classes.RequestedBook__pic}
        alt={book_name}
      />
      <div className={classes.RequestedBook__description}>
        <div className={classes.RequestedBook__description__container}>
          <span className={classes.RequestedBook__description__name}>
            <span className={classes.RequestedBook__description__key}>
              عنوان کتاب:{" "}
            </span>
            {book_name}
          </span>
        </div>

        <div className={classes.RequestedBook__description__container}>
          <span className={classes.RequestedBook__description__name}>
            <span className={classes.RequestedBook__description__key}>
              نویسنده:{" "}
            </span>
            {author_name}
          </span>
        </div>

        {translator_name !== "" && (
          <div className={classes.RequestedBook__description__container}>
            <span className={classes.RequestedBook__description__name}>
              <span className={classes.RequestedBook__description__key}>
                مترجم:{" "}
              </span>
              {translator_name}
            </span>
          </div>
        )}

        <div className={classes.RequestedBook__description__container}>
          <span className={classes.RequestedBook__description__name}>
            <span className={classes.RequestedBook__description__key}>
              سال چاپ:{" "}
            </span>
            {digitsEnToFa(print_year)}
          </span>
        </div>

        <div className={classes.RequestedBook__description__container}>
          <span className={classes.RequestedBook__description__name}>
            <span className={classes.RequestedBook__description__key}>
              شابک:{" "}
            </span>
            {digitsEnToFa(isbn)}
          </span>
        </div>

        <div className={classes.RequestedBook__description__container}>
          <span className={classes.RequestedBook__description__name}>
            <span className={classes.RequestedBook__description__key}>
              وضعیت:{" "}
            </span>
            {status === "Pending"
              ? "در حال بررسی"
              : status === "Approved"
              ? "پذیرفته شده"
              : "پذیرفته نشده"}
          </span>
        </div>

        {status === "Approved" && (
          <div className={classes.RequestedBook__description__container}>
            <span className={classes.RequestedBook__description__name}>
              <span className={classes.RequestedBook__description__key}>
                شماره تلفن اهداکننده:{" "}
              </span>
              {digitsEnToFa(phoneNumber)}
            </span>
          </div>
        )}
      </div>
      <div className={classes.RequestedBook__btns}>
        {status === "Approved" &&
          is_received === false &&
          is_reported === false && (
            <button
              className={classes.RequestedBook__btn}
              onClick={handleReport}
            >
              {flag}
              &nbsp; ثبت شکایت
            </button>
          )}
        {status === "Approved" &&
          is_received === false &&
          is_reported === false && (
            <button
              className={classes.RequestedBook__btn}
              onClick={handleConfirm}
            >
              {confirm}
              &nbsp; تایید دریافت
            </button>
          )}
        {status === "Pending" && is_donated === false && (
          <button className={classes.RequestedBook__btn} onClick={handleDelete}>
            {trash}
            &nbsp; حذف
          </button>
        )}
      </div>
    </div>
  );
}

export default RequestedBook;
