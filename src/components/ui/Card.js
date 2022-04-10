//wrapper
import classes from "./Card.module.css";
function Card(props) {
  const style = { border: "0px solid rgba(255, 255, 255, 0)" };
  if(props.noOutline)
  return <ul style={style} className={classes.ul}>{props.children}</ul>;
  
  return <ul className={classes.ul}>{props.children}</ul>;
}
export default Card;
