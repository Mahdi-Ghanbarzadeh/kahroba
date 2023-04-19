import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import axiosInstance from "../../../axios";
// @ts-ignore
import classes from "./plusAcc.module.scss";

export const PlusAccount = () => {
  let [loading, setLoading] = useState(true);
  let [information, setInformation] = useState({});

  useEffect(() => {
    axiosInstance.get(`payment/options/`).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setLoading(false);
        setInformation(res.data);
      }
    });
  }, []);

  const day = Object.keys(information);
  const prices: number[] = Object.values(information);
  const plans = day.map((day, i) => ({ day, price: prices[i] }));

  return (
    <div className={classes.container}>
      <div className={classes.container__headerContainer}>
        <div className={classes.container__headerContainer__header}>
          <span className={classes.container__headerContainer__text}>
            ارتقای حساب کاربری
          </span>
        </div>
      </div>

      <div className={classes.container__loader}>
        {!loading && plans.length === 0 && (
          <span className={classes.container__description}>
            اطلاعات دریافت نشد!
          </span>
        )}
        <BeatLoader
          className={classes.container__description}
          color="#8d5524"
          loading={loading}
          size={30}
        />
      </div>

      {!loading && plans.length !== 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((item, i) => (
            <div
              key={i}
              className="w-full text-2xl font-medium border-2 p-5 rounded-lg border-gray-100 flex flex-col gap-4"
            >
              <div className="font-bold">{item.day} روز</div>
              <div className="text-gray-500">{item.price} تومان</div>
              <button className="bg-yellow-500 bg-opacity-90 hover:bg-opacity-100 transition-colors font-bold px-4 py-1.5 text-[1.2rem] rounded-md text-white mt-2">
                خرید
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
