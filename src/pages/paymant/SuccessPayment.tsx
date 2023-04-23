import React, { useCallback, useEffect } from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export const SuccessPayment = () => {
  const nav = useNavigate();
  const navToUserPanel = useCallback(
    () => nav("../user-panel/plus-account"),
    [nav]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      navToUserPanel();
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [nav, navToUserPanel]);

  return (
    <div className="fixed inset-0 flex items-center justify-center gap-4">
      <div className="flex flex-col">
        <div className="flex gap-5">
          <div className="text-3xl">پرداخت با موفقیت انجام شد</div>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-3xl text-green-500"
          />
        </div>
        <button
          className="mt-8 text-yellow-700 font-bold text-2xl py-2 hover:bg-yellow-50 rounded-sm transition-colors"
          onClick={() => {
            navToUserPanel();
          }}
        >
          بازگشت به پنل‌کاربری
        </button>
      </div>
    </div>
  );
};
