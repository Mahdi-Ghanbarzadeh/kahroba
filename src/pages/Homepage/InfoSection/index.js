import React from "react";
import classes from "./InfoSection.module.scss";
import classNames from "classnames";

function InfoSection() {
  return (
    <>
      <div className={classes.InfoSection}>
        <div className={classes.InfoSection__content}>
          <div className={classes.InfoSection__row}>
            <div>
              <h3 className={classes.InfoSection__row__header}>
                ما به شما دقیق ترین پیشنهاد را ارائه میدهیم
              </h3>
              <p className={classes.InfoSection__row__description}>
                <br />
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                <br />
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                <br />
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              </p>
            </div>

            <img
              //   src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2021%2F02%2F19%2Fnew-york-city-evening-NYCTG0221.jpg&w=1100&h=737&c=sc&poi=face&q=60"
              src="./images/illustration11.png"
              alt=""
              className={classes.InfoSection__row__image}
            />
          </div>
          <div className={classes.InfoSection__row}>
            {/* /<h3></h3> */}
            <img
              src="./images/illustration12.png"
              alt=""
              className={classes.InfoSection__row__image}
            />
            <div>
              <h3 className={classes.InfoSection__row__header}>
                ما یه شما دقیق ترین پیشنهاد را ارائه میدهیم
              </h3>
              <p className={classes.InfoSection__row__description}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                <br />
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                <br />
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                <br />
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              </p>
            </div>
          </div>
          <div className={classes.InfoSection__row}>
            <div>
              <h3 className={classes.InfoSection__row__header}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم{" "}
              </h3>
              <p className={classes.InfoSection__row__description}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                <br />
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                <br />
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                <br />
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              </p>
            </div>

            <img
              src="./images/illustration9.png"
              alt=""
              className={classes.InfoSection__row__image}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoSection;
