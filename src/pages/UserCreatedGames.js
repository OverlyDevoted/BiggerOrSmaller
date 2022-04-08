import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import GameSelectionItem from "../components/games/GameSelectionItem";
import classes from "../pages/AllGames.module.css";
function UserCreatedGamesPage() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.name.length < 1) navigate("/account");
  }, []);

  return (
    <div className={classes.div}>
      {user.games.map((games) => {
        return (
          <GameSelectionItem
            key={games.id}
            gameName={games.name}
            src={games.cover_url}
          >
              <button>Edit</button>
              <button>Delete</button>
          </GameSelectionItem>
        );
      })}
    </div>
  );
}
export default UserCreatedGamesPage;
