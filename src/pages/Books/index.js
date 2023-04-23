import classes from "./Books.module.scss";
import MainNavigation from "../../components/MainNavigation";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import Button from "../../components/Button";
import BookItem from "./BookItem";

import { useInView } from "react-intersection-observer";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/UserContext";
import { ToastContainer, toast } from "react-toastify";

const override = `
  display: inline-block;
  margin: 15rem auto 0;
`;

function Books() {
  let [loading, setLoading] = useState(true);
  let [books, setBooks] = useState([]);
  console.log(books);
  const navigate = useNavigate();

  let { user } = useContext(UserContext);
  // useEffect(() => {
  //   if (user.type === "seller") {
  //     navigate("/");
  //   }
  // }, [user.auth, user.type, navigate]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);
      // Send Axios request here
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

  // useEffect(() => {
  //   axiosInstance
  //     .get(`book/all/`, {
  //       params: {
  //         is_donated: false,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.status >= 200 && res.status < 300) {
  //         setBooks(res.data);
  //         setLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       // notifyError();
  //       console.log(err);
  //     });
  // }, []);

  const { ref, inView, entry } = useInView({
    threshold: 1,
  });

  // function confirmShoppingHandler() {
  //   axiosInstance.get(`/accounts/checkout/`).then((res) => {
  //     if (res.status === 200) {
  //       // setList(res.data);
  //       // setLoading(false);
  //       navigate("/user-panel/orders", { replace: true });
  //     }
  //   });
  //   console.log("/accounts/checkout/");
  // }

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
