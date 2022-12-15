import classes from "./ShoppingItem.module.scss";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";

import { CoatHanger } from "phosphor-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { faRulerVertical } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faBrush } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../../axios";
const money = <FontAwesomeIcon icon={faMoneyBill} />;
const check = <FontAwesomeIcon icon={faCircleCheck} />;
const shield = <FontAwesomeIcon icon={faShield} />;
const size = <FontAwesomeIcon icon={faRulerVertical} />;
const trash = <FontAwesomeIcon icon={faTrashCan} />;
const color = <FontAwesomeIcon icon={faBrush} />;

function ShoppingItem({ name, price, img, id, setProducts }) {
  function deleteProductHandler() {
    console.log("delete");
    axiosInstance
      .post(`accounts/delete_from_cart/`, {
        data: id,
      })
      .then((res) => {
        if (res.status === 200) {
          axiosInstance.get(`/accounts/show_cart/`).then((res) => {
            if (res.status === 200) {
              setProducts(res.data);
            }
          });
        }
      });
  }
  return (
    <div id={id} className={classes.ShoppingItem}>
      <img
        // src={"./images/clothes/11.jpg"}
        // src={"./images/clothes/11bg.png"}
        src={img}
        className={classes.ShoppingItem__pic}
        alt={name}
      />
      <div className={classes.ShoppingItem__description}>
        <div className={classes.ShoppingItem__description__container}>
          <CoatHanger
            className={classes.ShoppingItem__description__icon}
            color="#a1a3a8"
            weight="bold"
            size={20}
          />

          <span className={classes.ShoppingItem__description__name}>
            {name}
          </span>
        </div>
        <div className={classes.ShoppingItem__description__container}>
          <span className={classes.ShoppingItem__description__icon}>
            {size}
          </span>
          <span className={classes.ShoppingItem__description__price}>XL</span>
        </div>
        <div className={classes.ShoppingItem__description__container}>
          <span className={classes.ShoppingItem__description__icon}>
            {color}
          </span>
          <span className={classes.ShoppingItem__description__price}>سبز</span>
        </div>
        <div className={classes.ShoppingItem__description__container}>
          <span className={classes.ShoppingItem__description__icon}>
            {shield}
          </span>
          <span className={classes.ShoppingItem__description__price}>
            گارانتی اصالت و سلامت فیزیکی کالا
          </span>
        </div>
        <div className={classes.ShoppingItem__description__container}>
          <span className={classes.ShoppingItem__description__icon}>
            {check}
          </span>
          <span className={classes.ShoppingItem__description__price}>
            موجود در انبار
          </span>
        </div>
        <div className={classes.ShoppingItem__description__container}>
          <span className={classes.ShoppingItem__description__icon}>
            {money}
          </span>
          <span className={classes.ShoppingItem__description__price}>
            {digitsEnToFa(addCommas(price))} تومان
          </span>
        </div>
      </div>
      <button
        className={classes.ShoppingItem__btn}
        onClick={deleteProductHandler}
      >
        {trash}
        &nbsp; حذف
      </button>
    </div>
  );
}

export default ShoppingItem;
