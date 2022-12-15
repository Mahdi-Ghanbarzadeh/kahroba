import classes from "./PersonalInfo.module.scss";
import InfoCard from "./InfoCard";
import BeatLoader from "react-spinners/BeatLoader";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axios";

const override = `
  display: inline-block;
  margin: 15rem auto 0;
`;

function PersonalInfo() {
  let [loading, setLoading] = useState(true);
  let [information, setInformation] = useState([]);

  useEffect(() => {
    axiosInstance.get(`accounts/show_user_info/`).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        setInformation(res.data);
      }
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.container__headerContainer}>
        <div className={classes.container__headerContainer__header}>
          <span className={classes.container__headerContainer__text}>
            اطلاعات حساب کاربری
          </span>
        </div>
      </div>
      <BeatLoader color="#6667ab" loading={loading} css={override} size={30} />
      {!loading && (
        <div className={classes.container__infoCards}>
          <InfoCard
            title={"نام و نام خانوادگی"}
            value={information.username}
            type={"text"}
            name={"fullName"}
            information={information}
            setInformation={setInformation}
          />
          <InfoCard
            title={"شماره موبایل"}
            value={information.user_phone_number}
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
            value={information.user_address}
            type={"text"}
            name={"address"}
            information={information}
            setInformation={setInformation}
          />
          <InfoCard
            title={"کد پستی"}
            value={information.user_postal_code}
            type={"text"}
            name={"postalCode"}
            information={information}
            setInformation={setInformation}
          />
          <InfoCard
            title={"رمز عبور"}
            value={"••••••••"}
            type={"password"}
            name={"password"}
            information={information}
            setInformation={setInformation}
          />
        </div>
      )}
    </div>
  );
}
export default PersonalInfo;
