import classes from "./Question.module.scss";
import { Marginer } from "../../../../components/marginer";
import ReactStars from "react-rating-stars-component";

function Question({ id, upload, option, onSelect }) {
  const Stars = {
    size: 25,
    count: 5,
    color: "#868e96",
    activeColor: "#6667ab",
    value: 0,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      onSelect(id, newValue);
    },
  };

  return (
    <>
      <Marginer direction="vertical" margin="3rem" />
      <div className={classes.Question__container}>
        <div className={classes.Question__container__box}>
          <img className={classes.Question__img} src={upload} alt="" />
          <ReactStars classNames={classes.Question__star} {...Stars} />
        </div>
      </div>
    </>
  );
}

export default Question;
