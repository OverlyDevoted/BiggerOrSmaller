import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import GameSelectionItem from "../components/games/GameSelectionItem";
import ConfirmationBox from "../components/ui/ConfirmationBox";
import classes from "../pages/AllGames.module.css";
function UserCreatedGamesPage() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [conBox, setConBox] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  async function updateGames(userId) {
    await axios
      .get("https://localhost:7147/api/Game/" + userId)
      .then(function (response) {
        user.setGames(response.data);
      })
      .catch(function (exception) {
        console.log(exception);
        user.setGames([]);
      });
  }
  useEffect(() => {
    
    console.log("update");
    if (user.name.length < 1) {
      navigate("/account");
      return <div>Loading...</div>;
    }
    if (user.games.length < 1) {
      navigate("/create-game");
      return <div>Loading...</div>;
    }
    updateGames(user.id);
  }, []);

  const handleDelete = async (gameId, userId) => {
    await axios.delete("https://localhost:7147/api/Game/" + gameId);

    updateGames(userId);
  };
  function handleEdit(game) {
    console.log(game);
    navigate("/edit-game", { state: game });
  }
  return (
    <div className={classes.div}>
      {user.games.map((games) => {
        return (
          <GameSelectionItem
            key={games.id}
            gameName={games.name}
            src={games.cover_url}
            url="account"
          >
            <button
              onClick={() => {
                handleEdit(games);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                setConBox(true);
                setToDelete(games.id);
              }}
            >
              Delete
            </button>
          </GameSelectionItem>
        );
      })}
      {conBox && (
        <ConfirmationBox
          onSubmit={() => {
            handleDelete(toDelete, user.id);
            setConBox(false);
            setToDelete(null);
          }}
          onCancel={() => {
            setConBox(false);
            setToDelete(null);
          }}
        />
      )}
    </div>
  );
}
export default UserCreatedGamesPage;
