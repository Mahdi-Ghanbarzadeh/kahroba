import classes from "./DonatedBooks.module.scss";
import DonatedBook from "./DonatedBook";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../../axios";
import { BeatLoader } from "react-spinners";
import UserContext from "../../../store/UserContext";

const override = `
  display: inline-block;
  margin: 15rem auto 0;
`;

function DonatedBooks() {
  const { user, logout } = useContext(UserContext);
  console.log("donated books");
  console.log(user);

  let [loading, setLoading] = useState(true);
  let [books, setBooks] = useState([]);
  console.log(books);
  console.log(books.length);

  // books = [
  //   {
  //     book_name: "نبرد من",
  //     book_url: "https://img.ketabrah.ir/img/l/2299213907953408.jpg",
  //     author_name: "آدولف هيتلر",
  //     translator_name: "فرشته اكبرپور",
  //     print_year: "1390",
  //     isbn: "۹۷۸۹۶۴۳۵۱۸۰۷۳",
  //   },
  //   {
  //     book_name: "نبرد من",
  //     book_url: "https://img.ketabrah.ir/img/l/2299213907953408.jpg",
  //     author_name: "آدولف هيتلر",
  //     translator_name: "فرشته اكبرپور",
  //     print_year: "1390",
  //     isbn: "۹۷۸۹۶۴۳۵۱۸۰۷۳",
  //   },
  //   {
  //     book_name: "نبرد من",
  //     book_url: "https://img.ketabrah.ir/img/l/2299213907953408.jpg",
  //     author_name: "آدولف هيتلر",
  //     translator_name: "فرشته اكبرپور",
  //     print_year: "1390",
  //     isbn: "۹۷۸۹۶۴۳۵۱۸۰۷۳",
  //   },
  //   {
  //     book_name: "نبرد من",
  //     book_url: "https://img.ketabrah.ir/img/l/2299213907953408.jpg",
  //     author_name: "آدولف هيتلر",
  //     translator_name: "فرشته اكبرپور",
  //     print_year: "1390",
  //     isbn: "۹۷۸۹۶۴۳۵۱۸۰۷۳",
  //   },
  // ];

  useEffect(() => {
    axiosInstance
      .get(`book/all/`, null, {
        params: {
          donator: user.userId,
        },
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setBooks(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.container__headerContainer}>
        <div className={classes.container__headerContainer__header}>
          <span className={classes.container__headerContainer__text}>
            کتاب‌های اهدایی
          </span>
        </div>
      </div>

      <div className={classes.container__loader}>
        {!loading && books.length === 0 && (
          <span className={classes.container__description}>
            کتابی یافت نشد!
          </span>
        )}
        <BeatLoader
          className={classes.container__description}
          color="#8d5524"
          loading={loading}
          css={override}
          size={30}
        />
      </div>

      {!loading && books.length !== 0 && (
        <div className={classes.container__donatedItems}>
          {books.map((book) => (
            <DonatedBook
              book_name={book.name}
              book_url={book.picture}
              author_name={book.author}
              translator_name={book.translator}
              print_year={book.publish_year}
              isbn={book.shabak}
              is_donated={book.is_donated}
              is_received={book.is_received}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default DonatedBooks;
