import MainNavigation from "../../components/MainNavigation";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useInView } from "react-intersection-observer";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import classes from "./Books.module.scss";
import axiosInstance from "../../axios";
import BookItem from "./BookItem";

const override = `
  display: inline-block;
  margin: 15rem auto 0;
`;

function Books() {
  let [loading, setLoading] = useState(true);
  let [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("useEffect");
    const delayDebounceFn = setTimeout(() => {
      console.log("first");
      axiosInstance
        .get(`book/all/`, {
          params: {
            search: searchTerm,
            is_donated: false,
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
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const { ref } = useInView({
    threshold: 1,
  });

  return (
    <>
      <MainNavigation />
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

      <section className={classes.Books}>
        <div className={classes.Books__loader}>
          <DotLoader
            data-testid="loader"
            className={classes.Books__description}
            color="#8d5524"
            loading={loading}
            css={override}
            size={60}
          />
        </div>

        {!loading && (
          <div className={classes.Books__headerContainer} ref={ref}>
            <div className={classes.Books__header}>
              <span className={classes.Books__header__text}>کتاب‌ها</span>
              <span className={classes.Books__header__number}>
                {digitsEnToFa(books.length)}
              </span>
            </div>
          </div>
        )}

        {!loading && (
          <div className={classes.BooksContainer__search}>
            <input
              data-testid="search-inp"
              className={classes.BooksContainer__search__input}
              type="text"
              placeholder="لطفا نام کتاب، نویسنده یا توضیحات آن را وارد کنید..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {!loading && books.length === 0 && (
          <span className={classes.Books__description}>کتابی یافت نشد!</span>
        )}

        {books.length !== 0 && (
          <div className={classes.BooksContainer}>
            <div className={classes.BooksContainer__BookItem}>
              {console.log(books.total_price)}
              {books.map((element) => (
                <BookItem
                  key={element.book_id}
                  id={element.book_id}
                  name={element.name}
                  author={element.author}
                  translator={element.translator}
                  print_year={element.publish_year}
                  isbn={element.shabak}
                  description={element.description}
                  picture={element.picture}
                  donator={element.donator}
                  is_donated={element.is_donated}
                  is_received={element.is_received}
                  is_requested_before={element.is_requested_before}
                  setBooks={setBooks}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
export default Books;
