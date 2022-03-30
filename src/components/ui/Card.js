//wrapper
import classes from "./Card.module.css";
function Card(props) {
  return <ul className={classes.ul}>{props.children}</ul>;
}
export default Card;
