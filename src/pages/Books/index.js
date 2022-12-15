import classes from "./ShoppingList.module.scss";
import MainNavigation from "../../components/layout/MainNavigation";
import Footer from "../../components/layout/Footer";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import Button from "../../components/shared/Button";
import ShoppingItem from "./ShoppingItem";

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

function ShoppingList() {
  let [loading, setLoading] = useState(true);
  let [list, setList] = useState([]);
  const navigate = useNavigate();

  let { user } = useContext(UserContext);
  useEffect(() => {
    if (user.type === "seller") {
      navigate("/");
    }
  }, [user.auth, user.type, navigate]);

  useEffect(() => {
    axiosInstance.get(`/accounts/show_cart/`).then((res) => {
      if (res.status === 200) {
        setList(res.data);
        setLoading(false);
      }
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
        <section className={classes.ShoppingList}>
          <div className={classes.ShoppingList__headerContainer} ref={ref}>
            <div className={classes.ShoppingList__header}>
              <span className={classes.ShoppingList__header__text}>
                سبد خرید
              </span>
              <span className={classes.ShoppingList__header__number}>
                {digitsEnToFa(list.products.length)}
              </span>
            </div>
          </div>

          {list.products.length !== 0 && (
            <>
              <div className={classes.ShoppingList__shoppingItems}>
                {console.log(list.total_price)}
                {list.products.map((element) => (
                  <ShoppingItem
                    id={element.id}
                    name={element.product_name}
                    price={element.product_price}
                    img={element.upload}
                    setProducts={setList}
                  />
                ))}
              </div>

              <div
                className={
                  inView
                    ? classes.ShoppingList__confirmBox
                    : classes.ShoppingList__confirmBox__sticky
                }
              >
                <div className={classes.ShoppingList__confirmContainer}>
                  <div className={classes.ShoppingList__confirmBox__totalPrice}>
                    <span
                      className={
                        classes.ShoppingList__confirmBox__totalPrice__text
                      }
                    >
                      قیمت کل سفارش
                    </span>
                    <span
                      className={
                        classes.ShoppingList__confirmBox__totalPrice__price
                      }
                    >
                      {digitsEnToFa(addCommas(list.total_price))} تومان
                    </span>
                  </div>
                  <div className={classes.ShoppingList__confirmBox__payable}>
                    <span
                      className={
                        classes.ShoppingList__confirmBox__payable__text
                      }
                    >
                      قیمت قابل پرداخت
                    </span>
                    <span
                      className={
                        classes.ShoppingList__confirmBox__payable__price
                      }
                    >
                      {digitsEnToFa(addCommas(list.total_price_with_discount))}{" "}
                      تومان
                    </span>
                  </div>
                  <span className={classes.ShoppingList__confirmBox__note}>
                    افزودن کالا به سبد خرید به معنی رزرو آن نیست. با توجه به
                    محدودیت موجودی، سبد خود را ثبت و خرید را تکمیل کنید.
                  </span>
                  <Button
                    color="purple"
                    className={classes["ShoppingList__confirmBox__btn"]}
                    onClickHandler={confirmShoppingHandler}
                  >
                    تکمیل خرید
                  </Button>
                </div>
              </div>
            </>
          )}
        </section>
      )}

      <Footer />
    </>
  );
}
export default ShoppingList;
