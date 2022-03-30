import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/layout/Layout";
import AllGamesPage from "./pages/AllGames";
import GamePage from "./pages/Game";
import classes from "./App.module.css";
import LeaderboardPage from "./pages/Leaderboard";
import CreateGamePage from "./pages/CreateGame";
import AccountPage from "./pages/Account";
let DUMMY_DATA = [
  {
    id: 1,
    title: "Cars",
    score: "7.2",
    image: "https://upload.wikimedia.org/wikipedia/en/3/34/Cars_2006.jpg",
  },
  {
    id: 2,
    title: "John Wick",
    score: "7.4",
    image:
      "https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg",
  },
  {
    id: 3,
    title: "Eternal Sunshine of the Spotless Mind",
    score: "8.3",
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/a4/Eternal_Sunshine_of_the_Spotless_Mind.png",
  },
];
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
  useEffect(() => {
    //when a backend gets implemented get getters for api keys or smth cuz lmao
    fetch("https://imdb-api.com/en/API/Top250Movies/k_osvbh65y", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setLoadedMovies(data.items);
      });
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  /*function getMovies() {
    const answer = fetch("https://api.github.com/users/OverlyDevoted", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }*/
  //console.log(loadedMovies);
  let temp_arr;
  if (!loadedMovies) temp_arr = DUMMY_DATA;
  else temp_arr = loadedMovies;
  temp_arr = Randomize(temp_arr);
  return (
    <div className={classes.div}>
      <Layout>
        <Routes>
          <Route path="/" element={<AllGamesPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="create-game" element={<CreateGamePage />} />          
          <Route path="account" element={<AccountPage />} />
          <Route
            path="game"
            element={<GamePage gameName="imdbTop250" movies={temp_arr} />}
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
