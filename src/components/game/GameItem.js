import Card from "../ui/Card";
import classes from "./GameItem.module.css";
import classesSelection from "../games/GameSelectionItem.module.css";
import { useEffect, useState } from "react";
function GameItem(props) {
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(() => {
    setIsRevealed(false);
  }, [props.id]);

  //console.log("Update " + props.title);
  return (
    <Card>
      <li
      className={classes.li}
        onClick={() => {
          props.checkBigger();
          props.onClick();
          setIsRevealed(true);
        }}
        style={{ backgroundImage: "url(" + props.image + ")" }}
      />
      <li>{props.title}</li>
      <li>{(isRevealed || props.reveal) && <p>{props.score}</p>}</li>
    </Card>
  );
}
export default GameItem;
/*onClick={} */
