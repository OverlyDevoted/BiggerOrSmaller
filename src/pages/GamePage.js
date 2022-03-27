import { useState, useEffect } from "react";
import MovieList from "../components/movies/MovieList";

function Game(props) {
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
export default Game;
