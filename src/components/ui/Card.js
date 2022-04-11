//wrapper
import classes from "./Card.module.css";
function Card(props) {
  let style = {};
  if(props.border)
    style.border = (props.border*5)+"px solid rgba(255, 255, 255, 0)";

  if(props.backgroundColor)
    style.background= props.backgroundColor;
  

  if(!style)
  return <ul className={classes.ul}>{props.children}</ul>;
  
  return <ul style={style} className={classes.ul}>{props.children}</ul>;
}
export default Card;
