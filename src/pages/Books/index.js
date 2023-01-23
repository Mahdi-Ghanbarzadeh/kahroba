import classes from "./Books.module.scss";
import MainNavigation from "../../components/MainNavigation";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import Button from "../../components/Button";
import BookItem from "./BookItem";

import { useInView } from "react-intersection-observer";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/UserContext";

const override = `
  display: inline-block;
  margin: 15rem auto 0;
`;

function Books() {
  let [loading, setLoading] = useState(false);
  let [books, setBooks] = useState([]);
  console.log(books);
  const navigate = useNavigate();

  let { user } = useContext(UserContext);
  // useEffect(() => {
  //   if (user.type === "seller") {
  //     navigate("/");
  //   }
  // }, [user.auth, user.type, navigate]);

  useEffect(() => {
    axiosInstance
      .get(`book/all/`, null, {
        params: {
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
        // notifyError();
        console.log(err);
      });
  }, []);

  const { ref, inView, entry } = useInView({
    threshold: 1,
  });

  function confirmShoppingHandler() {
    axiosInstance.get(`/accounts/checkout/`).then((res) => {
      if (res.status === 200) {
        // setList(res.data);
        // setLoading(false);
        navigate("/user-panel/orders", { replace: true });
      }
    });
    console.log("/accounts/checkout/");
  }

  return (
    <>
      <MainNavigation />
      {loading && (
        <div className={classes.spinner}>
          <PuffLoader
            color="#6667ab"
            loading={loading}
            css={override}
            size={100}
          />
        </div>
      )}

      {!loading && (
        <section className={classes.Books}>
          <div className={classes.Books__headerContainer} ref={ref}>
            <div className={classes.Books__header}>
              <span className={classes.Books__header__text}>کتاب‌ها</span>
              <span className={classes.Books__header__number}>
                {digitsEnToFa(books.length)}
              </span>
            </div>
          </div>

          {books.length !== 0 && (
            <>
              <div className={classes.Books__BookItem}>
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
                    setBooks={setBooks}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
export default Books;
