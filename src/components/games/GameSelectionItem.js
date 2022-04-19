import Card from "../ui/Card";
import classes from "./GameSelectionItem.module.css";

import { useNavigate } from "react-router-dom";
//https://www.listchallenges.com/f/lists/09ed9034-e25b-494c-a04a-e2e18692b5f7.jpg
//https://phantom-marca.unidadeditorial.es/ee46d7a1c09b447117f8e83c6e131f31/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/02/16437899001758.jpg
//galima pakeist kaip passinami propsa
function GameSelectionItem(props) {
  const navigate = useNavigate();
  function StartGame() {
    if(props.url)
    navigate("/"+props.url);

    console.log(props.onClick)
    if(props.onClick)
    props.onClick();

    
  }
  return (
    <Card className={classes.li}>
      <li className={classes.li}>{props.gameName}</li>
      <li>
        <div onClick={StartGame} style={{backgroundImage:"url("+props.src+")"}} className={classes.div}/>
      </li>
      <li>
        {props.children}
      </li>
      <li>
        {props.mode}
      </li>
    </Card>
  );
}
export default GameSelectionItem;
