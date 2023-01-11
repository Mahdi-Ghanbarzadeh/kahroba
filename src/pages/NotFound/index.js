import Footer from "../../components/Footer";
import MainNavigation from "../../components/MainNavigation";
import classes from "./NotFound.module.scss";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <MainNavigation />
      <div className={classes.container}>
        <span className={classes.container__header}>
          صفحه‌ای که دنبال آن بودید پیدا نشد!
        </span>
        <img
          className={classes.container__img}
          src={"/assets/page-not-found.png"}
        />
        <Link to={"/"}>
          <Button color="purple" className={classes.container__button}>
            صفحه اصلی
          </Button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
