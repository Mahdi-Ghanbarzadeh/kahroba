import classes from "./RequestedBooks.module.scss";
import RequestedBook from "./RequestedBook";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../../axios";
import { BeatLoader } from "react-spinners";
import UserContext from "../../../store/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override = `
  display: inline-block;
  margin: 15rem auto 0;
`;

function RequestedBooks() {
  const notifyError = () => {
    toast.error("خطایی هنگام دریافت کتاب‌های درخواستی رخ داد", {
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

  const { user, logout } = useContext(UserContext);
  console.log("requested books");
  console.log(user);

  let [loading, setLoading] = useState(true);
  let [books, setBooks] = useState([]);
  console.log("--books--");
  console.log(books);

  // books = [
  //   {
  //     book_name: "نبرد من",
  //     book_url: "https://img.ketabrah.ir/img/l/2299213907953408.jpg",
  //     author_name: "آدولف هيتلر",
  //     translator_name: "فرشته اكبرپور",
  //     print_year: "1390",
  //     isbn: "۹۷۸۹۶۴۳۵۱۸۰۷۳",
  //     status: "نامشخص",
  //   },
  //   {
  //     book_name: "نبرد من",
  //     book_url: "https://img.ketabrah.ir/img/l/2299213907953408.jpg",
  //     author_name: "آدولف هيتلر",
  //     translator_name: "فرشته اكبرپور",
  //     print_year: "1390",
  //     isbn: "۹۷۸۹۶۴۳۵۱۸۰۷۳",
  //     status: "پذیرفته شده",
  //   },
  //   {
  //     book_name: "نبرد من",
  //     book_url: "https://img.ketabrah.ir/img/l/2299213907953408.jpg",
  //     author_name: "آدولف هيتلر",
  //     translator_name: "فرشته اكبرپور",
  //     print_year: "1390",
  //     isbn: "۹۷۸۹۶۴۳۵۱۸۰۷۳",
  //     status: "پذیرفته نشده",
  //   },
  //   {
  //     book_name: "نبرد من",
  //     book_url: "https://img.ketabrah.ir/img/l/2299213907953408.jpg",
  //     author_name: "آدولف هيتلر",
  //     translator_name: "فرشته اكبرپور",
  //     print_year: "1390",
  //     isbn: "۹۷۸۹۶۴۳۵۱۸۰۷۳",
  //     status: "نامشخص ",
  //   },
  // ];

  useEffect(() => {
    axiosInstance
      .get(`book/request/myrequests/`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setBooks(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        notifyError();
      });
  }, []);

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
            کتاب‌های درخواستی
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
            <RequestedBook
              id={book.book.book_id}
              book_name={book.book.name}
              book_url={book.book.picture}
              author_name={book.book.author}
              translator_name={book.book.translator}
              print_year={book.book.publish_year}
              isbn={book.book.shabak}
              status={book.status}
              is_reported={book.is_reported}
              is_donated={book.book.is_donated}
              is_received={book.book.is_received}
              user={book.user}
              description={book.book.description}
              donator={book.book.donator}
              setBooks={setBooks}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default RequestedBooks;
