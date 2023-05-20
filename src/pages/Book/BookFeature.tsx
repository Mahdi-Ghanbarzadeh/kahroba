import clsx from "clsx";
import React from "react";

export const BookFeature = ({ name, value, index }) => (
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
