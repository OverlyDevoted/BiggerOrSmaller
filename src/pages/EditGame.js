import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import GameSelectionItem from "../components/games/GameSelectionItem";
import axios from "axios";

function EditGamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setName(location.state.name);
    setUrl(location.state.cover_url);
  }, []);
  const handleUpdate = async () => {
    const gamePayload = { name: name, cover_url: url };
    axios
      .put("https://localhost:7147/api/Game/" + location.state.id, gamePayload)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.data);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card>
        <li>
          <h1>Edit Game</h1>
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
          <button onClick={() => {handleUpdate();
        navigate("/user-created-games")}}>Update</button>
        </li>
      </Card>
      <GameSelectionItem gameName={name} src={url} />
    </div>
  );
}
export default EditGamePage;
