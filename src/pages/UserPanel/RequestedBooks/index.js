import classes from "./RequestedBooks.module.scss";
import RequestedBook from "./RequestedBook";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axios";
import { BeatLoader } from "react-spinners";

const override = `
  display: inline-block;
  margin: 15rem auto 0;
`;

function RequestedBooks() {
  let [loading, setLoading] = useState(false);
  let [books, setBooks] = useState([]);
  console.log(books);

  books = [
    {
      book_name: "نبرد من",
      book_url: "https://img.ketabrah.ir/img/l/2299213907953408.jpg",
      author_name: "آدولف هيتلر",
      translator_name: "فرشته اكبرپور",
      print_year: "1390",
      isbn: "۹۷۸۹۶۴۳۵۱۸۰۷۳",
      status: "اهدا شده",
    },
    {
      book_name: "نبرد من",
      book_url: "https://img.ketabrah.ir/img/l/2299213907953408.jpg",
      author_name: "آدولف هيتلر",
      translator_name: "فرشته اكبرپور",
      print_year: "1390",
      isbn: "۹۷۸۹۶۴۳۵۱۸۰۷۳",
      status: "اهدا شده",
    },
    {
      book_name: "نبرد من",
      book_url: "https://img.ketabrah.ir/img/l/2299213907953408.jpg",
      author_name: "آدولف هيتلر",
      translator_name: "فرشته اكبرپور",
      print_year: "1390",
      isbn: "۹۷۸۹۶۴۳۵۱۸۰۷۳",
      status: "اهدا شده",
    },
    {
      book_name: "نبرد من",
      book_url: "https://img.ketabrah.ir/img/l/2299213907953408.jpg",
      author_name: "آدولف هيتلر",
      translator_name: "فرشته اكبرپور",
      print_year: "1390",
      isbn: "۹۷۸۹۶۴۳۵۱۸۰۷۳",
      status: "اهدا شده",
    },
  ];

  // useEffect(() => {
  //   axiosInstance.get(`/accounts/user_orders/`).then((res) => {
  //     if (res.status === 200) {
  //       setBooks(res.data);
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  return (
    <div className={classes.container}>
      <div className={classes.container__headerContainer}>
        <div className={classes.container__headerContainer__header}>
          <span className={classes.container__headerContainer__text}>
            کتاب‌های درخواستی
          </span>
        </div>
      </div>
      <BeatLoader color="#6667ab" loading={loading} css={override} size={30} />
      {!loading && (
        <div className={classes.container__donatedItems}>
          {books.map((book) => (
            <RequestedBook
              book_name={book.book_name}
              book_url={book.book_url}
              author_name={book.author_name}
              translator_name={book.translator_name}
              print_year={book.print_year}
              isbn={book.isbn}
              status={book.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default RequestedBooks;
