import { useState, useEffect } from "react";
import MovieList from "../components/game/MovieList";

function GamePage(props) {
  const [gameName, setGameName] = useState("imdbTop250");
  useEffect(() => {
    setGameName(props.gameName);
  }, []);
  return (
    <div>
      {gameName === "imdbTop250" && <MovieList movies={props.movies} />}
    </div>
  );
}
export default GamePage;
