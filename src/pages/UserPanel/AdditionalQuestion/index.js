import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Question from "./Question";
import classes from "./additionalQuestion.module.scss";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { BeatLoader } from "react-spinners";
import UserContext from "../../../store/UserContext";
const questionIcon = <FontAwesomeIcon icon={faCircleQuestion} />;

// const questions = [
//   {
//     id: "1",
//     option: "./../images/q7/1.jpg",
//   },
//   {
//     id: "2",
//     option: "./../images/q7/2.jpg",
//   },
//   {
//     id: "3",
//     option: "./../images/q7/3.jpg",
//   },
//   {
//     id: "4",
//     option: "./../images/q7/4.jpg",
//   },
//   {
//     id: "5",
//     option: "./../images/q7/5.jpg",
//   },
// ];

const override = `
  display: inline-block;
  margin: 15rem auto 0;
`;

function AdditionalQuestion() {
  const { user } = useContext(UserContext);

  let [loading, setLoading] = useState(true);
  let [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  console.log(questions);

  const setAnswerHandler = useCallback((id, option) => {
    setAnswers((answers) => ({ ...answers, [id]: option }));
  }, []);
  console.log(answers);

  console.log(user);

  // useLayoutEffect(() => {
  //   console.log(!user.auth || (!user.auth && user.type !== "user"));
  //   if (!user.auth || (!user.auth && user.type !== "user")) {
  //     console.log("additionalQeustionn: sellerrrrr1");
  //     navigate("/404");
  //   }
  // }, []);

  // useLayoutEffect(() => {
  //   console.log(!user.auth || (!user.auth && user.type !== "user"));
  //   if (!user.auth || (!user.auth && user.type !== "user")) {
  //     console.log("additionalQeustionn: sellerrrrr2");
  //     navigate("/404");
  //   }
  // }, [user.auth, user.type, navigate]);

  useEffect(() => {
    axiosInstance.get(`/questions/get_pics/`).then((res) => {
      if (res.status === 200) {
        console.log(res);
        setQuestions(res.data);
        setLoading(false);
      }
    });
  }, []);

  const submitClickHandler = () => {
    console.log("submit");
    console.log(answers);
    const newAnswers = [];
    for (const [key, value] of Object.entries(answers)) {
      newAnswers.push(Array.isArray(value) ? value.join(",") : value);
    }
    console.log(newAnswers);
    console.log(answers);

    axiosInstance
      .post(`questions/more_questions/`, {
        data: newAnswers,
      })
      .then((res) => {
        navigate("/products-list?product=survey2", { replace: true });
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.container__headerContainer}>
        <div className={classes.container__headerContainer__header}>
          <span className={classes.container__headerContainer__text}>
            سوالات تکمیلی
          </span>
        </div>
      </div>
      <BeatLoader color="#6667ab" loading={loading} css={override} size={30} />
      {!loading && (
        <div className={classes.QuestionContainer}>
          <div className={classes.QuestionContainer__Question}>
            <div className={classes.QuestionContainer__Question__iconContainer}>
              <i className={classes.QuestionContainer__Question__icon}>
                {questionIcon}
              </i>
              <h2>{"به عکس‌های زیر امتیاز دهید:"}</h2>
            </div>
            {questions.map((q) => (
              <Question
                {...q}
                onSelect={setAnswerHandler}
                className={classes.QuestionContainer__Question}
              />
            ))}
          </div>
          <div className={classes.QuestionContainer__footer}>
            <button
              className={
                Object.keys(answers).length !== questions.length
                  ? classes.QuestionContainer__btn__disable
                  : classes.QuestionContainer__btn
              }
              onClick={submitClickHandler}
              disabled={Object.keys(answers).length !== questions.length}
            >
              ثبت
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdditionalQuestion;
