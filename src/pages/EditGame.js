import { useNavigate, useLocation, useResolvedPath } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../App";
import Card from "../components/ui/Card";
import GameSelectionItem from "../components/games/GameSelectionItem";
import GameItem from "../components/game/GameItem";
import axios from "axios";
import classes from "../components/ui/Headers.module.css";
import GameItemEdit from "../components/game/GameItemEdit";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
};

function EditGamePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useContext(UserContext);

  const [name, setName] = useState(null);
  const [url, setUrl] = useState(null);

  const [gameItemName, setGameItemName] = useState("");
  const [gameItemURL, setGameItemUrl] = useState("");
  const [score, setGameScore] = useState("");

  const gameEdit = useRef([]);

  useEffect(() => {
    setName(location.state.name);
    setUrl(location.state.cover_url);
    getGameItems(location.state.id);
  }, []);

  async function getGameItems(id) {
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
  async function handleUpdateItem(id, name, score, url) {
    const payload = { name: name, score: score, cover_Url: url };
    await axios
      .put("https://localhost:7147/api/GameItem/" + id, payload)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      
    getGameItems(location.state.id);
  }

  async function handleRemove(id) {
    await axios
      .delete("https://localhost:7147/api/GameItem/" + id)
      .then(function (response) {
        console.log("Removed " + response);
      })
      .catch(function (error) {
        console.log(error);
      });
    getGameItems(location.state.id);
  }
  async function handleUpdate() {
    const gamePayload = { name: name, cover_url: url };
    await axios
      .put("https://localhost:7147/api/Game/" + location.state.id, gamePayload)
      .then(function (response) {
        console.log("insert updated data");
      })
      .catch(function (error) {
        console.log(error.data);
      });
    navigate("/user-created-games");
  }
  async function handleAdd() {
    if (gameItemName.length < 1 || gameItemURL.length < 1 || !score) {
      console.log("Fill out all the fields");
      return;
    }
    const gamePayLoad = {
      name: gameItemName,
      cover_Url: gameItemURL,
      score: score,
    };
    await axios
      .post(
        "https://localhost:7147/api/GameItem/" + location.state.id,
        gamePayLoad
      )
      .then(function (response) {
        console.log("Add " + response);
        setGameItemName("");
        setGameItemUrl("");
        setGameScore("");
      })
      .catch(function (error) {
        console.log(error);
      });
    getGameItems(location.state.id);
  }
  console.log("Rerender");
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
              </form>
              <button
                onClick={() => {
                  handleUpdate();
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
                  handleAdd();
                  //getGameItems(location.state.id);
                }}
              >
                Add
              </button>
            </li>
          </Card>
          <GameItem
            title={gameItemName}
            image={gameItemURL}
            score={score}
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
              <div ref={el => gameEdit.current[gameItem.id] = el} key={gameItem.id} id={gameItem.id}>
                <GameItemEdit
                  title={gameItem.name}
                  image={gameItem.cover_Url}
                  score={gameItem.score}
                  reveal={true}
                  onClick={() => {
                    handleRemove(gameItem.id);
                  }}
                />
              </div>
            );
          })}
        </div>
        <li>
          <button
            onClick={() => {
              gameEdit.current.forEach(el=>{
                let gameItem = user.gameItems.find(element => element.id == el.id);
                let length = el.children[0].children.length;
                gameItem.score =gameItem.score.toString();
                let edited =false;
                for(let i=0;i<length;i++)
                {
                  if(el.children[0].children[i].nodeName==="INPUT")
                  {
                    if(!Object.values(gameItem).includes(el.children[0].children[i].value))
                    {
                      handleUpdateItem(gameItem.id, 
                        el.children[0].children[2].value, 
                        parseInt(el.children[0].children[3].value), 
                        el.children[0].children[0].value);
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
