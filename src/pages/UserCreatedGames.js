import axios from "axios";
import GameSelectionItem from "../components/games/GameSelectionItem";
import ConfirmationBox from "../components/ui/ConfirmationBox";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import classes from "../components/ui/FlexDisplay.module.css";
import {getGameItems} from './EditGame'

function UserCreatedGamesPage() {
  const user = useContext(UserContext);

  useEffect(() => {
    getMostRecentGames();
  }, []);

  async function getMostRecentGames() {
    await axios
      .get("https://localhost:7147/api/Game/all/100")
      .then(function (response) {
        //console.log(response.data);
        user.setUserGames(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className={classes.divStyle}>
      {user.userGames.map((games) => {
        let mode="";
        if(games.isSmallerMode)
        mode = "Guess which item has bigger value";
        else
        mode = "Guess which item has smaller value";
        return (
          <GameSelectionItem
            key={games.id}
            gameName={games.name}
            src={games.cover_url}            
            url="game"
            mode={mode}
            onClick={()=>{
              getGameItems(user,games.id);
              user.setGameMode(games.isSmallerMode);
            }}
          />
        );
      })}
    </div>
  );
}
export default UserCreatedGamesPage;
