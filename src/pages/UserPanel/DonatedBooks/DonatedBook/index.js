import classes from "./DonatedBook.module.scss";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import UserContext from "../../../../store/UserContext";

const trash = <FontAwesomeIcon icon={faTrash} />;
const confirm = <FontAwesomeIcon icon={faCircleCheck} />;

function DonatedBook({
  id,
  book_name,
  book_url,
  author_name,
  translator_name,
  print_year,
  isbn,
  is_donated,
  is_received,
  setBooks,
  number_of_request,
}) {
  const { user, logout } = useContext(UserContext);

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

  function handleDonate() {
    axiosInstance
      .post(`book/confirmdonate/`, {
        book: id,
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          notifySuccess("کتاب با موفقیت اهدا شد");
          setBooks((prev) => [
            {
              book_id: id,
              name: book_name,
              picture: book_url,
              author: author_name,
              translator: translator_name,
              publish_year: print_year,
              shabak: isbn,
              is_donated: true,
              setBooks,
            },
            ...prev.filter((book) => book.book_id !== id),
          ]);
        }
      })
      .catch((err) => {
        if (
          err.request.responseText.substring(
            2,
            err.request.responseText.length - 2
          ) === "No one signed up yet"
        )
          notifyError("درخواستی برای کتاب وجود ندارد");
        else notifyError("خطایی رخ داد");
      });
  }

  function handleDelete() {
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
  }

  return (
    <div className={classes.DonatedBook}>
      <img
        src={book_url}
        className={classes.DonatedBook__pic}
        alt={book_name}
      />
      <div className={classes.DonatedBook__description}>
        <div className={classes.DonatedBook__description__container}>
          <span className={classes.DonatedBook__description__name}>
            <span className={classes.DonatedBook__description__key}>
              عنوان کتاب:{" "}
            </span>
            {book_name}
          </span>
        </div>

        <div className={classes.DonatedBook__description__container}>
          <span className={classes.DonatedBook__description__name}>
            <span className={classes.DonatedBook__description__key}>
              نویسنده:{" "}
            </span>
            {author_name}
          </span>
        </div>

        {translator_name !== "" && (
          <div className={classes.DonatedBook__description__container}>
            <span className={classes.DonatedBook__description__name}>
              <span className={classes.DonatedBook__description__key}>
                مترجم:{" "}
              </span>
              {translator_name}
            </span>
          </div>
        )}

        <div className={classes.DonatedBook__description__container}>
          <span className={classes.DonatedBook__description__name}>
            <span className={classes.DonatedBook__description__key}>
              سال چاپ:{" "}
            </span>
            {digitsEnToFa(print_year.toString())}
          </span>
        </div>

        {/* <div className={classes.DonatedBook__description__container}>
          <span className={classes.DonatedBook__description__name}>
            <span className={classes.DonatedBook__description__key}>
              شابک:{" "}
            </span>
            {digitsEnToFa(isbn)}
          </span>
        </div> */}

        <div className={classes.DonatedBook__description__container}>
          <span className={classes.DonatedBook__description__name}>
            <span className={classes.DonatedBook__description__key}>
              تعداد درخواست:{" "}
            </span>
            {`${digitsEnToFa(number_of_request)} عدد`}
          </span>
        </div>

        <div className={classes.DonatedBook__description__container}>
          <span className={classes.DonatedBook__description__name}>
            <span className={classes.DonatedBook__description__key}>
              وضعیت اهدا:{" "}
            </span>
            {is_donated === true ? "اهدا شده" : "اهدا نشده"}
          </span>
        </div>

        {is_donated === true && (
          <div className={classes.DonatedBook__description__container}>
            <span className={classes.DonatedBook__description__name}>
              <span className={classes.DonatedBook__description__key}>
                وضعیت دریافت:{" "}
              </span>
              {is_received === true ? "دریافت شده" : "دریافت نشده"}
            </span>
          </div>
        )}
      </div>
      <div className={classes.DonatedBook__btns}>
        {is_donated === false && (
          <button className={classes.DonatedBook__btn} onClick={handleDonate}>
            {confirm}
            &nbsp; اهدا
          </button>
        )}
        {is_donated === false && (
          <button className={classes.DonatedBook__btn} onClick={handleDelete}>
            {trash}
            &nbsp; حذف
          </button>
        )}
      </div>
    </div>
  );
}

export default DonatedBook;
