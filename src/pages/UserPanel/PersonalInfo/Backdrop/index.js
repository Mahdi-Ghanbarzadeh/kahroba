import classes from "./Backdrop.module.scss";

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onCancel} />;
}

export default Backdrop;
