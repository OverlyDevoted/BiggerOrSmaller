import { useState, useEffect, useContext } from "react";
import {UserContext} from '../App.js'
import MovieList from "../components/game/MovieList";
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
function GamePage(props) {
  const user = useContext(UserContext);
  useEffect(() => {
  }, []);
  return (
    <div>
      <MovieList movies={Randomize(user.gameItems)} mode={user.gameMode} />
    </div>
  );
}
export default GamePage;
