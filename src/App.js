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



//https://imdb-api.com/en/API/MostPopularMovies/k_osvbh65y
function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [games, setGames] = useState([]);
  const [gameMode,setGameMode] = useState(false);
  const [gameItems, setGameItems] = useState([]);
  const [userGames, setUserGames] = useState([]);
  useEffect(() => {
    //when a backend gets implemented get getters for api keys or smth cuz lmao
    //no, make it so that the back end sends the requeest and front end makes request to back
    //to get the answer, it's safer that way?? cuz the user could just click the f12 to see all the request and ur api keys
  setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={classes.div}>
      <Layout creatorText="Website created by Robert Dulko">
        <UserContext.Provider
          value={{
            name,
            token,
            games,
            gameMode,
            gameItems,
            userGames,
            setName,
            setToken,
            setGames,
            setGameMode,
            setGameItems,
            setUserGames,
          }}
        >
          <Routes>
            <Route path="/" element={<AllGamesPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="create-game" element={<CreateGamePage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="edit-game" element={<EditGamePage />} />
            <Route
              path="user-created-games"
              element={<UserCreatedGamesPage />}
            />
            <Route
              path="game"
              element={<GamePage/>}
            />
          </Routes>
        </UserContext.Provider>
      </Layout>
    </div>
  );
}

export default App;
