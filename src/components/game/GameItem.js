import Card from "../ui/Card";
import classes from "./GameItem.module.css";
import classesSelection from "../games/GameSelectionItem.module.css";
import { useEffect, useState } from "react";
function GameItem(props) {
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(() => {}, [props.id]);

  //console.log("Update " + props.title);
  return (
    <Card>
      <li
        className={classes.li}
        onClick={() => {
          if (!props.display) {
            props.checkBigger();
            props.onClick();
            setIsRevealed(true);
          }
        }}
        style={{ backgroundImage: "url(" + props.image + ")" }}
      />
      <li style={{ fontSize: "20px" }}>{props.title}</li>
      <li style={{ fontSize: "20px" }}>
        {(isRevealed || props.reveal) && <p>{props.score}</p>}
      </li>
    </Card>
  );
}
export default GameItem;
/*onClick={} */
