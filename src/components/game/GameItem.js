import Card from "../ui/Card";
import classes from "./GameItem.module.css";
import { useEffect, useState } from "react";
function GameItem(props) {
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(()=>{setIsRevealed(false)},[props.id])
  //console.log("Update " + props.title);
  return (
    <Card>
      <li className={classes.li}>
        <div>
          <img src={props.image} alt={props.title} />
          <div>
            <h3>{props.title}</h3>
            <div>{(isRevealed || props.reveal) && <p>{props.score}</p>}</div>
          </div>
          
          <button
            onClick={() => {
              props.checkBigger();
              props.onClick();
              setIsRevealed(true);
            }}
          >
            Bigger
          </button>
        </div>
      </li>
    </Card>
  );
}
export default GameItem;