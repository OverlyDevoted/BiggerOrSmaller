import { Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Layout from "./components/layout/Layout";
import AllGamesPage from "./pages/AllGames";
import GamePage from "./pages/Game";
import classes from "./App.module.css";
import LeaderboardPage from "./pages/Leaderboard";
import CreateGamePage from "./pages/CreateGame";
import AccountPage from "./pages/Account";
import UserCreatedGamesPage from "./pages/UserCreatedGames";
import axios from "axios";
import EditGamePage from "./pages/EditGame";

export const UserContext = createContext(null);

function Randomize(array) {
  let temp = [];
  let length = array.length,
    randomIndex;
  while (length != 0) {
    randomIndex = Math.floor(Math.random() * length);
    temp.push(array[randomIndex]);
    array.splice(randomIndex, 1);
    length--;
  }
  return temp;
}

//https://imdb-api.com/en/API/MostPopularMovies/k_osvbh65y
//https://imdb-api.com/en/API/Top250Movies/k_osvbh65y
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMovies, setLoadedMovies] = useState([]);
  const [loadedGames, setLoadedGames] = useState([]);
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    //when a backend gets implemented get getters for api keys or smth cuz lmao
    //no, make it so that the back end sends the requeest and front end makes request to back
    //to get the answer, it's safer that way?? cuz the user could just click the f12 to see all the request and ur api keys
    axios
      .get("https://imdb-api.com/en/API/Top250Movies/k_osvbh65y")
      .then((res) => {
        setIsLoading(false);
        setLoadedMovies(res.data.items);
      });
    
    axios.get("https://localhost:7147/api/User").then((res) => {
      setLoadedGames(res.data);
    });
    console.log(name + " " + password);

  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  let temp_arr;
  temp_arr = loadedMovies;
  temp_arr = Randomize(temp_arr);
  return (
    <div className={classes.div}>
      <Layout creatorText="Website created by Robert Dulko">
        <UserContext.Provider value={{name, password, id, games, setName, setPassword, setId, setGames}}>
          <Routes>
            <Route path="/" element={<AllGamesPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="create-game" element={<CreateGamePage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="edit-game" element={<EditGamePage />} />
            <Route path="user-created-games" element={<UserCreatedGamesPage/>}/>
            <Route
              path="game"
              element={<GamePage gameName="imdbTop250" movies={temp_arr} />}
            />
          </Routes>
        </UserContext.Provider>
      </Layout>
    </div>
  );
}

export default App;
