import classes from "./ConfirmationBox.module.css";
function ConfirmationBox(props) {
  return (
    <div className={classes.background}>
      <div className={classes.back}>
        <h1> Are you sure you want to delete this item?</h1>
        <div className={classes.box}>
          <button onClick={props.onCancel} className={classes.box_canc_btn}>Cancel</button>
          <button onClick={props.onSubmit} className={classes.box_conf_btn}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmationBox;
