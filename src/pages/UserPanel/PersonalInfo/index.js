import classes from "./PersonalInfo.module.scss";
import InfoCard from "./InfoCard";
import BeatLoader from "react-spinners/BeatLoader";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axios";
import { ToastContainer, toast } from "react-toastify";

const override = `
  display: inline-block;
  margin: 15rem auto 0;
`;

function PersonalInfo() {
  let [loading, setLoading] = useState(true);
  let [information, setInformation] = useState([]);
  console.log(information);

  useEffect(() => {
    axiosInstance.get(`auth/info/`).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        console.log(res);
        setLoading(false);
        setInformation(res.data);
      }
    });
  }, []);

  return (
    <div className={classes.container}>
      <ToastContainer
        position="top-right"
        autoClose={1500}
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
            اطلاعات حساب کاربری
          </span>
        </div>
      </div>

      <div className={classes.container__loader}>
        {!loading && information.length === 0 && (
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

      {!loading && information.length !== 0 && (
        <div className={classes.container__infoCards}>
          <InfoCard
            title={"نام و نام خانوادگی"}
            value={information.name}
            type={"text"}
            name={"fullName"}
            information={information}
            setInformation={setInformation}
          />
          <InfoCard
            title={"شماره موبایل"}
            value={information.phone_number}
            type={"tel"}
            name={"phoneNumber"}
            information={information}
            setInformation={setInformation}
          />
          <InfoCard
            title={"ایمیل"}
            value={information.email}
            type={"email"}
            name={"email"}
            information={information}
            setInformation={setInformation}
          />
          <InfoCard
            title={"آدرس"}
            value={information.post_address}
            type={"text"}
            name={"address"}
            information={information}
            setInformation={setInformation}
          />
          {/* <InfoCard
            title={"رمز عبور"}
            value={"••••••••"}
            type={"password"}
            name={"password"}
            information={information}
            setInformation={setInformation}
          /> */}
        </div>
      )}
    </div>
  );
}
export default PersonalInfo;
