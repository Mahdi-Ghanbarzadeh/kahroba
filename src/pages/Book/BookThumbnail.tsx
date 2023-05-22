import React from "react";
import { Link } from "react-router-dom";

export const BookThumbnail = ({ id, name, src }) => (
  <Link to={`../book/${id}`}>
    <div className="flex flex-col gap-5 border-2 py-10 hover:bg-gray-50 border-gray-100 transition-colors rounded-md w-60 p-5 cursor-pointer">
      <div className="w-40 h-56 overflow-hidden">
        <img src={src} alt="" />
      </div>
      <p className="font-bold text-gray-800">{name}</p>
      <button className="font-bold text-gray-50 mt-2 bg-slate-700 py-2 rounded-md">
        مشاهده
      </button>
    </div>
  </Link>
);
