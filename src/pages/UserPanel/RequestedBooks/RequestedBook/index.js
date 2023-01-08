import classes from "./RequestedBook.module.scss";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const trash = <FontAwesomeIcon icon={faTrashCan} />;

function RequestedBook({
  book_name,
  book_url,
  author_name,
  translator_name,
  print_year,
  isbn,
  status,
}) {
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

        <div className={classes.RequestedBook__description__container}>
          <span className={classes.RequestedBook__description__name}>
            <span className={classes.RequestedBook__description__key}>
              مترجم:{" "}
            </span>
            {translator_name}
          </span>
        </div>

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
            {status}
          </span>
        </div>
      </div>
      <div className={classes.RequestedBook__btns}>
        <button
          className={classes.RequestedBook__btn}

          // onClick={}
        >
          {trash}
          &nbsp; ثبت شکایت
        </button>
        <button
          className={classes.RequestedBook__btn}

          // onClick={}
        >
          {trash}
          &nbsp; تایید دریافت
        </button>
        <button
          className={classes.RequestedBook__btn}
          // onClick={}
        >
          {trash}
          &nbsp; حذف
        </button>
      </div>
    </div>
  );
}

export default RequestedBook;
