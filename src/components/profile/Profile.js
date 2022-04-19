import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GameSelectionItem from "../../components/games/GameSelectionItem";
import ConfirmationBox from "../../components/ui/ConfirmationBox";
import Card from "../ui/Card";

import classes from "../../pages/AllGames.module.css";
function Profile() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [conBox, setConBox] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  useEffect(() => {
    console.log("update");
    if (user.token.length < 1) {
      navigate("/account");
      return <div>Loading...</div>;
    }

    updateGames();
  }, []);
  function LogOut() {
    user.setToken("");
    user.setGameItems([]);
    user.setGames([]);
  }

  async function updateGames() {
    let headers = {
      headers: {
        Authorization: "bearer " + user.token,
      },
    };
    await axios
      .get("https://localhost:7147/api/Game/", headers)
      .then(function (response) {
        user.setGames(response.data);
      })
      .catch(function (exception) {
        console.log(exception);
        user.setGames([]);
      });
  }

  const handleDelete = async (gameId, userId) => {
    let headers = {
      headers: {
        Authorization: "bearer " + user.token,
      },
    };
    await axios.delete("https://localhost:7147/api/Game/" + gameId, headers);

    updateGames(userId);
  };
  function handleEdit(game) {
    console.log(game);
    navigate("/edit-game", { state: game });
  }
  return (
    <div>
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
      <Card>
        <li>{user.name}</li>
        <li>
          <button onClick={LogOut}>Log out</button>
        </li>
      </Card>
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
      </div>
    </div>
  );
}
export default Profile;
