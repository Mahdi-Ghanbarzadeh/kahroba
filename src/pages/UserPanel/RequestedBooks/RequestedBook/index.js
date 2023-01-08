import classes from "./DonatedBook.module.scss";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const trash = <FontAwesomeIcon icon={faTrashCan} />;

function DonatedBook({
  book_name,
  book_url,
  author_name,
  translator_name,
  print_year,
  isbn,
}) {
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

        <div className={classes.DonatedBook__description__container}>
          <span className={classes.DonatedBook__description__name}>
            <span className={classes.DonatedBook__description__key}>
              مترجم:{" "}
            </span>
            {translator_name}
          </span>
        </div>

        <div className={classes.DonatedBook__description__container}>
          <span className={classes.DonatedBook__description__name}>
            <span className={classes.DonatedBook__description__key}>
              سال چاپ:{" "}
            </span>
            {digitsEnToFa(print_year)}
          </span>
        </div>

        <div className={classes.DonatedBook__description__container}>
          <span className={classes.DonatedBook__description__name}>
            <span className={classes.DonatedBook__description__key}>
              شابک:{" "}
            </span>
            {digitsEnToFa(isbn)}
          </span>
        </div>

        <div className={classes.DonatedBook__description__container}>
          <span className={classes.DonatedBook__description__name}>
            <span className={classes.DonatedBook__description__key}>
              وضعیت:{" "}
            </span>
            {"اهدا شده؟"}
          </span>
        </div>
      </div>
      <div className={classes.DonatedBook__btns}>
        <button
          className={classes.DonatedBook__btn}

          // onClick={}
        >
          {trash}
          &nbsp; اهدا
        </button>
        <button
          className={classes.DonatedBook__btn}
          // onClick={}
        >
          {trash}
          &nbsp; حذف
        </button>
      </div>
    </div>
  );
}

export default DonatedBook;
