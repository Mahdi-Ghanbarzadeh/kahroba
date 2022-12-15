import classes from "./InfoCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Modal from "../Modal";
import Backdrop from "../Backdrop";
const edit = <FontAwesomeIcon icon={faPenToSquare} />;

function InfoCard({ title, value, type, name, information, setInformation }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModalHandler() {
    setModalIsOpen(true);
  }
  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <div className={classes.infoCard}>
      <div className={classes.infoCard__titleValue}>
        <div className={classes.infoCard__titleValue__title}>{title}</div>
        <div className={classes.infoCard__titleValue__value}>{value}</div>
      </div>
      <div className={classes.infoCard__edit}>
        <span
          className={classes.infoCard__edit__icon}
          onClick={openModalHandler}
        >
          {edit}
        </span>
      </div>
      {modalIsOpen && (
        <Modal
          title={title}
          type={type}
          name={name}
          onCancel={closeModalHandler}
          onConfirm={closeModalHandler}
          information={information}
          setInformation={setInformation}
        />
      )}
      {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
    </div>
  );
}
export default InfoCard;
