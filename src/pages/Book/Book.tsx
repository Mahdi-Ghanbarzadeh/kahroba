import React, { useEffect } from "react";
import MainNavigation from "../../components/MainNavigation";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import { Autoplay, Mousewheel, Navigation } from "swiper";

const BookFeature = ({ name, value, index }) => (
  <>
    <span
      className={clsx(
        index % 2 ? "bg-gray-50" : "",
        "text-gray-500 pl-5 pr-2 py-2"
      )}
    >
      {name}
    </span>
    <span
      className={clsx(
        index % 2 ? "bg-gray-50" : "",
        "font-bold text-gray-500 pl-5 pr-2 py-2 text-[1.3rem]"
      )}
    >
      {value}
    </span>
  </>
);

const BookThumbnail = ({ name, src }) => (
  <div className="flex flex-col gap-5 border-2 py-10 hover:bg-gray-50 border-gray-100 transition-colors rounded-md w-60 p-5 cursor-pointer">
    <div className="w-40 h-56 overflow-hidden">
      <img src={src} alt="" />
    </div>
    <p className="font-bold text-gray-800">{name}</p>
    <button className="font-bold text-gray-50 mt-2 bg-slate-700 py-2 rounded-md">
      مشاهده
    </button>
  </div>
);

export const Book = () => {
  useEffect(() => {}, []);
  return (
    <div className="text-2xl">
      <MainNavigation />
      <div className="max-w-7xl mx-auto mt-16 px-20">
        <div className="flex flex-col 450px:flex-row">
          <div className="w-72 h-96 overflow-hidden">
            <img className="w-full" src="/ex-cover.jpg" alt="" />
          </div>
          <div className="flex-1 p-10">
            <h1 className="font-bold text-[2rem] text-gray-800">
              کتاب پدر پولدار پدر فقیر
            </h1>
            <div className="grid grid-cols-2 my-10 max-w-fit">
              <BookFeature index={1} name="نویسنده" value="رابرت کیوساکی" />
              <BookFeature index={2} name="مترجم" value="هنگامه خدابنده" />
              <BookFeature index={3} name="درخواست ها" value="12" />
            </div>
            <button className="bg-yellow-500 bg-opacity-90 hover:bg-opacity-100 transition-colors font-bold px-4 py-1.5 text-[1.2rem] rounded-md text-white">
              درخواست کتاب
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 max-w-2xl mt-5">
          {new Array(10).fill(0).map((_, i) => (
            <div className=" bg-gray-100 text-gray-600 w-fit px-4 py-1 rounded-full font-bold text-[1.2rem]">
              تگ نمونه
            </div>
          ))}
        </div>
        <p className="mt-8 leading-loose text-justify">
          تاب پدر پولدار، پدر فقیر نوشته‌ی رابرت کیوساکی است که درباره‌ی اهمیت
          آموزش‌های مالی به فرزندان صحبت می‌کند. نویسنده در این کتاب با استفاده
          از مثال‌هایی در باب سواد مالی، استقلال مالی، سرمایه‌‌گذاری، ایجاد یک
          کسب‌وکار شخصی و در کنار همه‌ی این‌ها افزایش هوش مالی صحبت می‌کند. بیش
          از 25 سال از چاپ نخست پدر پولدار، پدر فقیر گذشته است اما این کتاب
          همچنان محبوبیت خودش را حفظ کرده است و در میان پرفروش‌ترین کتاب‌های
          سواد مالی شخصی قرار دارد و به 51 زبان دنیا ترجمه شده است. این کتاب از
          میان بیش از 79 هزار رای کاربران وبسایت آمازون، امتیاز 4.7 از 5 را
          دریافت کرده است و بالغ بر 32 میلیون نسخه از آن در سراسر جهان به فروش
          رفته است. همچنین این کتاب شش سال جز پرفروش‌ترین کتاب‌های نیویورک تایمز
          بوده است. ویل اسمیت بازیگر سرشناس هالیوود در مصاحبه‌ای گفته است که
          مسئولیت‌های مالی را با مطالعه‌ی این کتاب به پسرش آموخته است.
        </p>
        <h1 className="font-bold text-3xl mt-10">کتاب‌های مشابه</h1>
        <Swiper
          className={clsx("my-10 w-full")}
          slidesPerView="auto"
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => {
            console.log(swiper);
          }}
          modules={[Navigation, Mousewheel, Autoplay]}
          mousewheel
          autoplay
          loop

          //   navigation
        >
          {new Array(10).fill(0).map((_, i) => (
            <SwiperSlide key={i} className="w-80">
              <BookThumbnail
                name={"کتاب پدر پولدار پدر فقیر"}
                src={"/ex-cover.jpg"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
