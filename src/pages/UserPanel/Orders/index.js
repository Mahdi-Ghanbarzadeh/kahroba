import classes from "./Orders.module.scss";
import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axios";
import { BeatLoader } from "react-spinners";

const override = `
  display: inline-block;
  margin: 15rem auto 0;
`;

function Orders() {
  let [loading, setLoading] = useState(true);
  let [orders, setOrders] = useState([]);
  console.log(orders);

  useEffect(() => {
    axiosInstance.get(`/accounts/user_orders/`).then((res) => {
      if (res.status === 200) {
        setOrders(res.data);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className={classes.container}>
      {/* <h2 className={classes.header}>سفارش‌ها</h2> */}
      <div className={classes.container__headerContainer}>
        <div className={classes.container__headerContainer__header}>
          <span className={classes.container__headerContainer__text}>
            سفارش‌ها
          </span>
        </div>
      </div>
      <BeatLoader color="#6667ab" loading={loading} css={override} size={30} />
      {!loading && (
        <div className={classes.container__orderItems}>
          {orders.map((element) => (
            <OrderItem
              name={element.product_name}
              price={element.product_price}
              img={element.product_image}
              size={element.product_size}
              color={element.product_color}
            />
          ))}
          {/* <OrderItem
            name={" شلوار مردانه سیدونا مدل MSI03072-403"}
            price={199000}
            img={"./images/clothes/11bg.png"}
          />
          <OrderItem
            name={" شلوار مردانه سیدونا مدل MSI03072-403"}
            price={199000}
            img={"./images/clothes/11bg.png"}
          />
          <OrderItem
            name={" شلوار مردانه سیدونا مدل MSI03072-403"}
            price={199000}
            img={"./images/clothes/11bg.png"}
          />
          <OrderItem
            name={" شلوار مردانه سیدونا مدل MSI03072-403"}
            price={199000}
            img={"./images/clothes/11bg.png"}
          />
          <OrderItem
            name={" شلوار مردانه سیدونا مدل MSI03072-403"}
            price={199000}
            img={"./images/clothes/11bg.png"}
          /> */}
        </div>
      )}
    </div>
  );
}
export default Orders;
