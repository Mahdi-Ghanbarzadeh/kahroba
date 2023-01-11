import classes from "./DonateBook.module.scss";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const trash = <FontAwesomeIcon icon={faTrashCan} />;

function DonateBook() {
  return <div className={classes.container}></div>;
}
export default DonateBook;
