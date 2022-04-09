import Card from "../components/ui/Card";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import GameSelectionItem from "../components/games/GameSelectionItem";

function CreateGamePage() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.name.length === 0) {
      navigate("/account");
    }
  }, []);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  if (user.name.length === 0) {
    return <div>Loading...</div>;
  }
  const handleClick = async () => {
    if (name.length < 4) 
    {
      console.log("The has to be at least 5 characters");
      return;
    }
    axios
      .post("https://localhost:7147/api/Game", {
        name: name,
        cover_url: url,
        userId: user.id,
      })
      .then(function (response) {
        console.log("game added");
        user.games.push(response.data);
        navigate("/user-created-games");
      })
      .catch(function (exception) {
        console.log(exception);
      });
  };

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Card>
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
              Picture URL
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
              handleClick();
            }}
          >
            Submit
          </button>
        </li>
      </Card>
      <GameSelectionItem gameName={name} src={url} />
    </div>
  );
}
export default CreateGamePage;
