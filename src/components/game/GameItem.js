import Card from "../ui/Card";
import classes from "./GameItem.module.css";
import classesSelection from "../games/GameSelectionItem.module.css";
import { useEffect, useState } from "react";
function GameItem(props) {
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(() => {
    setIsRevealed(false);
  }, [props.item.id]);

  //console.log("Update " + props.title);
  return (
    <Card>
      <li
        className={classes.li}
        onClick={() => {
          if (!props.display) {
            if (!isRevealed && !props.reveal) {
              props.onClick();
              setIsRevealed(true);
            }
          }
        }}
        style={{ backgroundImage: "url(" + props.item.cover_Url + ")" }}
      />
      <li style={{ fontSize: "20px" }}>{props.item.name}</li>
      <li style={{ fontSize: "20px" }}>
        {(isRevealed || props.reveal) && <p>{props.item.score}</p>}
      </li>
    </Card>
  );
}
export default GameItem;
/*onClick={} */
