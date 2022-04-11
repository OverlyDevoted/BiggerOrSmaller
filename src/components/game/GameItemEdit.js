import Card from "../ui/Card";
import classes from "./GameItem.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
function GameItemEdit(props) {
  const [image, setImage] = useState(props.image);
  const [title, setTitle] = useState(props.title);
  const [score, setScore] = useState(props.score);

  //#4B0000
  const [backgroundColor, setBackgroundColor] = useState("");
  useEffect(() => {
    console.log(props.title);
    if (image != props.image || title != props.title || score != props.score) {
      setBackgroundColor("#4B0000");
    }
    if (
      image === props.image &&
      title === props.title &&
      score === props.score
    ) {
      setBackgroundColor("");
    }
  }, [props.image,props.title,props.score,image, title, score]);

  return (
    <Card backgroundColor={backgroundColor} >
      <input
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
        }}
      ></input>
      <li
        className={classes.li}
        style={{ backgroundImage: "url(" + image + ")" }}
      />

      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>

      <input
        value={score}
        onChange={(e) => {
          if (e.target.value) setScore(parseInt(e.target.value));
          else setScore(0);
        }}
      ></input>

      <li>
        <button onClick={props.onClick}>Remove</button>
      </li>
    </Card>
  );
}
export default GameItemEdit;
