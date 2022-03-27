import Card from "../ui/Card";
import classes from "./GameItem.module.css";

import { useNavigate } from 'react-router-dom';
//https://www.listchallenges.com/f/lists/09ed9034-e25b-494c-a04a-e2e18692b5f7.jpg
function GameItem(props) {
  const navigate = useNavigate();
  function StartGame(){
    navigate("/game")
  }
  return (
    <Card>
      <ul>
        <li>
          <img
            src="https://www.listchallenges.com/f/lists/09ed9034-e25b-494c-a04a-e2e18692b5f7.jpg"
            alt="IMDB Top 250"
          />
        </li>
        <li>
          <button className='btn btn--alt' onClick={StartGame}>Play</button>
        </li>
      </ul>
    </Card>
  );
}
export default GameItem;
