import Card from "../ui/Card";
import classes from "./GameItem.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
function GameItemEdit(props) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [score, setScore] = useState("");
  useEffect(() => {
    setImage(props.image);
    setScore(props.score);
    setTitle(props.title);
  }, []);
  return (
    <Card>
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
      <li>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
      </li>
      <li>
        <input
          value={score}
          onChange={(e) => {
            setScore(e.target.value);
          }}
        ></input>
      </li>
      <li>
          <button onClick={props.onClick}>Remove</button>
      </li>
    </Card>
  );
}
export default GameItemEdit;
