import React from "react";
import classNames from "classnames";
import classes from "./Button.module.scss";

function Button({ children, color, className, onClickHandler, isDisable }) {
  return (
    <button
      //{...(onClick ? { onClick: onClick } : {})}
      className={classNames(
        classes.Button,
        {
          // [classes[`Button--${color}`]]: color,
          [classes[`Button--${color}`]]: color,
        },
        className
        // { [classes[`Button--header`]]: place === "header" }
        // { [classes[`Button--medium`]]: size === "medium" }
      )}
      disabled={isDisable}
      onClick={onClickHandler}
      // just an example for destructing props for jsx
      // {...props} // => onClick={onClick} className="felan"
    >
      {children}
    </button>
  );
}
export default Button;
