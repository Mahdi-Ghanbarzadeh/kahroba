import React, { FC, useContext, useEffect, useState } from "react";
import MainNavigation from "../../components/MainNavigation";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import { Autoplay, Mousewheel, Navigation } from "swiper";
import axiosInstance from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../../store/UserContext";
import { useParams } from "react-router-dom";
import { DotLoader } from "react-spinners";
// @ts-ignore
import { BookFeature } from "./BookFeature.tsx";
// @ts-ignore
import { BookThumbnail } from "./BookThumbnail.tsx";
import classes from "../Books/Books.module.scss";

export const Book: FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [information, setInformation] = useState<any>({});
  const [isRequested, setIsRequested] = useState(false);
  const [reqCount, setReqCount] = useState(0);

  const { userId } = useContext(UserContext);

  function handleBook({ id, donator }) {
    const notifySuccess = (message) => {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };

    const notifyError = (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };

    if (donator === userId) {
      axiosInstance
        .post(`book/delete/`, {
          book: id,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            notifySuccess("کتاب با موفقیت حذف شد");
          }
        })
        .catch((err) => {
          notifyError("خطایی رخ داد");
        });
    } else {
      if (isRequested) {
        axiosInstance
          .post(`book/request/delete/`, {
            book: id,
          })
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              notifySuccess("درخواست کتاب با موفقیت حذف شد");
              setIsRequested(false);
              setReqCount(reqCount - 1);
            }
          })
          .catch((err) => {
            notifyError("خطایی رخ داد");
          });
      } else {
        axiosInstance
          .post(`book/request/register/`, {
            book: id,
          })
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              notifySuccess("درخواست کتاب با موفقیت افزوده شد");
              setIsRequested(true);
              setReqCount(reqCount + 1);
            }
          })
          .catch((err) => {
            notifyError("موجودی رویش شما کافی نیست");
          });
      }
    }
  }

  useEffect(() => {
    axiosInstance.get(`book/info-suggestion/${id}`).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setLoading(false);
        setInformation(res.data);
        setIsRequested(res.data.book.is_requested_before);
      }
    });
  }, [id]);

  const book = information.book;
  const simBooks = information.similar_books;

  let tags: any = information?.book?.keywords;
  if (tags) {
    tags = tags
      .split("'")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "[" && tag !== "]" && tag !== ",");
  }

  return (
    <div className="text-2xl">
      <MainNavigation />
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
      <div className="flex justify-center items-center">
        <div className={classes.Books__loader}>
          {!loading && book === null && (
            <span className={classes.Books__description}>کتابی یافت نشد!</span>
          )}
          <DotLoader
            data-testid="loader"
            className={classes.Books__description}
            color="#8d5524"
            loading={loading}
            size={60}
          />
        </div>
      </div>
      {book && (
        <div className="max-w-7xl mx-auto mt-16 px-20">
          <div className="flex flex-col 450px:flex-row">
            <div className="w-72 h-96 overflow-hidden">
              <img className="w-full" src={book.picture} alt="" />
            </div>
            <div className="flex-1 p-10">
              <h1 className="font-bold text-[2rem] text-gray-800">
                {book.name}
              </h1>
              <div className="grid grid-cols-2 my-10 max-w-fit">
                <BookFeature index={1} name="نویسنده" value={book.author} />
                <BookFeature index={2} name="مترجم" value={book.translator} />
                <BookFeature
                  index={3}
                  name="سال چاپ"
                  value={book.publish_year}
                />
                <BookFeature index={4} name="شابک" value={book.shabak} />
                <BookFeature
                  index={5}
                  name="تعداد درخواست ها"
                  value={book.number_of_request + reqCount}
                />
              </div>
              <button
                className="bg-yellow-500 bg-opacity-90 hover:bg-opacity-100 transition-colors font-bold px-4 py-1.5 text-[1.2rem] rounded-md text-white"
                onClick={(e) => {
                  handleBook({ id: book.book_id, donator: book.donator });
                }}
              >
                {book.donator === userId
                  ? "حذف کتاب"
                  : isRequested
                  ? "حذف درخواست"
                  : "ثبت درخواست"}
              </button>
            </div>
          </div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 max-w-2xl mt-5">
              {tags.map((item, i) => (
                <div
                  key={i}
                  className=" bg-gray-100 text-gray-600 w-fit px-4 py-1 rounded-full font-bold text-[1.2rem]"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
          <p className="mt-8 leading-loose text-justify">{book.description}</p>
          <h1 className="font-bold text-3xl mt-10">کتاب‌های مشابه</h1>
          {simBooks && simBooks.length > 0 && (
            <Swiper
              className={clsx("my-10 w-full")}
              slidesPerView="auto"
              modules={[Navigation, Mousewheel, Autoplay]}
              mousewheel
              autoplay
              loop
            >
              {simBooks.map((book, i) => (
                <SwiperSlide key={i} className="w-80">
                  <BookThumbnail
                    id={book.book_id}
                    name={book.name}
                    src={book.picture}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      )}
    </div>
  );
};
