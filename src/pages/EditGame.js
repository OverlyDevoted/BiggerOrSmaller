import { useNavigate, useLocation, useResolvedPath } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../App";
import Card from "../components/ui/Card";
import GameSelectionItem from "../components/games/GameSelectionItem";
import GameItem from "../components/game/GameItem";
import axios from "axios";
import classes from "../components/ui/Headers.module.css";
import GameItemEdit from "../components/game/GameItemEdit";
import { isDOMComponent } from "react-dom/test-utils";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
};

export async function getGameItems(user, id) {
  await axios
    .get("https://localhost:7147/api/GameItem/" + id)
    .then(function (response) {
      user.setGameItems(response.data);
      console.log("Get " + response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
async function handleUpdateItem(user, gameId, id, name, score, url) {
  const payload = { name: name, score: score, cover_Url: url };
  const headers = {
    headers: {
      Authorization: "bearer " + user.token,
    },
  };
  await axios
    .put("https://localhost:7147/api/GameItem/" + id, payload, headers)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  getGameItems(user, gameId);
}
async function handleRemove(user, gameId, id) {
  const headers = {
    headers: {
      Authorization: "bearer " + user.token,
    },
  };
  await axios
    .delete("https://localhost:7147/api/GameItem/" + id, headers)
    .then(function (response) {
      console.log("Removed " + response);
    })
    .catch(function (error) {
      console.log(error);
    });
  getGameItems(user, gameId);
}
async function handleUpdate(id, name, url, isSmallerMode, token) {
  console.log(isSmallerMode);
  const gamePayload = { name: name, cover_url: url, isSmallerMode: isSmallerMode };
  const headers = {
    headers: {
      Authorization: "bearer " + token,
    },
  };
  await axios
    .put("https://localhost:7147/api/Game/" + id, gamePayload, headers)
    .then(function (response) {
      console.log("insert updated data\n"+JSON.stringify(response.data));
      return true;
    })
    .catch(function (error) {
      console.log(error.data);
    });
}
async function handleAdd(user, gameId, name, url, score) {
  if (name.length < 1 || url.length < 1 || !score) {
    console.log("Fill out all the fields");
    return;
  }
  const headers = {
    headers: {
      Authorization: "bearer " + user.token,
    },
  };
  const gamePayLoad = {
    name: name,
    cover_Url: url,
    score: score,
  };
  await axios
    .post("https://localhost:7147/api/GameItem/" + gameId, gamePayLoad, headers)
    .then(function (response) {
      console.log("Add " + response);
    })
    .catch(function (error) {
      console.log(error);
    });
  getGameItems(user, gameId);
}

function EditGamePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useContext(UserContext);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isSmallerMode, setIsSmallerMode] = useState(false);

  const [gameItemName, setGameItemName] = useState("");
  const [gameItemURL, setGameItemUrl] = useState("");
  const [score, setGameScore] = useState("");

  const gameEdit = useRef([]);

  useEffect(() => {
    setName(location.state.name);
    setUrl(location.state.cover_url);
    getGameItems(user, location.state.id);
    setIsSmallerMode(location.state.isSmallerMode);
  }, []);


  return (
    <div style={divStyle}>
      <Card border={"0"}>
        <h1 className={classes.header}>Edit Game</h1>
        <div style={divStyle}>
          <Card border={"0"}>
            <li>
              <form>
                <label>
                  Name
                  <br />
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <br />
                </label>
                <label>
                  Cover URL
                  <br />
                  <input
                    type="text"
                    name="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                  />
                  <br />
                </label>
                <label>
                  Smaller mode
                  <br />
                  <input
                    type="checkbox"
                    name="isSmaller"
                    value={isSmallerMode}
                    onChange={(e) => {
                      if(isSmallerMode)
                      setIsSmallerMode(false)
                      else
                      setIsSmallerMode(true)
                      console.log(isSmallerMode);
                    }}
                  />
                  <br />
                </label>
              </form>
              <button
                onClick={() => {
                  handleUpdate(location.state.id, name, url, isSmallerMode, user.token).then(function() {
                    navigate("/account");
                  });
                }}
              >
                Update
              </button>
            </li>
          </Card>
          <GameSelectionItem gameName={name} src={url} />
        </div>
      </Card>

      <Card border={"0"}>
        <h1 className={classes.header}>Add Game Items</h1>
        <div style={divStyle}>
          <Card border={"0"}>
            <li>
              <form>
                <label>
                  Name
                  <br />
                  <input
                    type="text"
                    name="name"
                    value={gameItemName}
                    onChange={(e) => {
                      setGameItemName(e.target.value);
                    }}
                  />
                  <br />
                </label>
                <label>
                  Cover URL
                  <br />
                  <input
                    type="text"
                    name="url"
                    value={gameItemURL}
                    onChange={(e) => {
                      setGameItemUrl(e.target.value);
                    }}
                  />
                  <br />
                </label>
                <label>
                  Score
                  <br />
                  <input
                    type="number"
                    name="score"
                    value={score}
                    onChange={(e) => {
                      setGameScore(e.target.value);
                    }}
                  />
                  <br />
                </label>
              </form>
              <button
                onClick={() => {
                  console.log(location.state.id);
                  handleAdd(
                    user,
                    location.state.id,
                    gameItemName,
                    gameItemURL,
                    score
                  );
                  //it would nice to smh check if the add was success and then reset fields
                  setGameItemName("");
                  setGameItemUrl("");
                  setGameScore("");
                  //getGameItems(location.state.id);
                }}
              >
                Add
              </button>
            </li>
          </Card>
          <GameItem
            item={{name:gameItemName, cover_Url:gameItemURL,score:score}}
            reveal={true}
            display={true}
          />
        </div>
      </Card>
      <Card border={"0"}>
        <h1 className={classes.header}>Manage Game Items</h1>
        <div style={divStyle}>
          {user.gameItems.map((gameItem) => {
            return (
              <div
                ref={(el) => (gameEdit.current[gameItem.id] = el)}
                key={gameItem.id}
                id={gameItem.id}
              >
                <GameItemEdit
                  title={gameItem.name}
                  image={gameItem.cover_Url}
                  score={gameItem.score}
                  reveal={true}
                  onClick={() => {
                    handleRemove(user, location.state.id, gameItem.id);
                  }}
                />
              </div>
            );
          })}
        </div>
        <li>
          <button
            onClick={() => {
              gameEdit.current.forEach((el) => {
                let gameItem = user.gameItems.find(
                  (element) => element.id == el.id
                );
                let length = el.children[0].children.length;
                gameItem.score = gameItem.score.toString();
                let edited = false;
                for (let i = 0; i < length; i++) {
                  if (el.children[0].children[i].nodeName === "INPUT") {
                    if (
                      !Object.values(gameItem).includes(
                        el.children[0].children[i].value
                      )
                    ) {
                      handleUpdateItem(
                        user,
                        location.state.id,
                        gameItem.id,
                        el.children[0].children[2].value,
                        parseInt(el.children[0].children[3].value),
                        el.children[0].children[0].value
                      );
                      return;
                    }
                  }
                }
              });
            }}
          >
            Save changes
          </button>
          <button>Revert changes</button>
        </li>
      </Card>
    </div>
  );
}

export default EditGamePage;
