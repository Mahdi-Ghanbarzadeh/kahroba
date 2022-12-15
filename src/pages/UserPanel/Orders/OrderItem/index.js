import classes from "./OrderItem.module.scss";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";

import { CoatHanger } from "phosphor-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { faRulerVertical } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faBrush } from "@fortawesome/free-solid-svg-icons";
const money = <FontAwesomeIcon icon={faMoneyBill} />;
const check = <FontAwesomeIcon icon={faCircleCheck} />;
const shield = <FontAwesomeIcon icon={faShield} />;
const sizeIcon = <FontAwesomeIcon icon={faRulerVertical} />;
const trash = <FontAwesomeIcon icon={faTrashCan} />;
const colorIcon = <FontAwesomeIcon icon={faBrush} />;

function OrderItem({ name, price, img, size, color }) {
  return (
    <div className={classes.OrderItem}>
      <img src={img} className={classes.OrderItem__pic} alt={name} />
      <div className={classes.OrderItem__description}>
        <div className={classes.OrderItem__description__container}>
          <CoatHanger
            className={classes.OrderItem__description__icon}
            color="#a1a3a8"
            weight="bold"
            size={20}
          />

          <span className={classes.OrderItem__description__name}>{name}</span>
        </div>
        <div className={classes.OrderItem__description__container}>
          <span className={classes.OrderItem__description__icon}>
            {sizeIcon}
          </span>
          <span className={classes.OrderItem__description__price}>{size}</span>
        </div>
        <div className={classes.OrderItem__description__container}>
          <span className={classes.OrderItem__description__icon}>
            {colorIcon}
          </span>
          <span className={classes.OrderItem__description__price}>{color}</span>
        </div>
        <div className={classes.OrderItem__description__container}>
          <span className={classes.OrderItem__description__icon}>{money}</span>
          <span className={classes.OrderItem__description__price}>
            {digitsEnToFa(addCommas(price))} تومان
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
