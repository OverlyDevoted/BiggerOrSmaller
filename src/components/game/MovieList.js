import classes from "./MovieList.module.css";
import GameItem from "./GameItem.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
const correctColor = "green";
const incorrectColor = "red";
function MovieList(props) {
  const navigate = useNavigate();
  //console.log(props.movies);
  //apjungt i viena state ir galima padaryt labai nice :)
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);
  const [firstColor, setFirstColor] = useState("");
  const [secondColor, setSecondColor] = useState("");
  const [gameState, setGameState] = useState("");
  const [score, setScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reveal, setReveal] = useState(false);
  const length = props.movies.length;
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (props.movies.length > 0) setIsLoaded(true);
  }, [props]);

  function setNew() {
    setRound(round + 1);
    if (firstIndex >= length - 3 || secondIndex >= length - 3) {
      setReveal(true);
      setGameState("Game end");
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return;
    }
    setReveal(true);
    setTimeout(() => {
      setFirstColor("");
      setSecondColor("");
      setReveal(false);
      setFirstIndex(firstIndex + 2);
      setSecondIndex(secondIndex + 2);
    }, 3000);
  }

  function checkBigger(id) {
    let result;

    if (
      parseInt(props.movies[firstIndex].score) <=
      parseInt(props.movies[secondIndex].score)
    ) {
      result = 0;
    } else {
      result = 1;
    }
    if (props.mode) {
      if (result === 0) result = 1;
      else result = 0;
    }

    if (result === id) {
      setScore(score + 1);
      if (result === 0) setFirstColor(correctColor);
      else setSecondColor(correctColor);
      return;
    }
    if (result === 0) setSecondColor(incorrectColor);
    else setFirstColor(incorrectColor);
  }
  //function AddNew()
  //console.log(movies);
  //iskelus buttonus kaip passable jsx maziau kartotino kodo
  return (
    <div>
      {isLoaded && (
        <div className={classes.div}>
          <GameItem
            key={0}
            item={props.movies[firstIndex]}
            onClick={() => {
              checkBigger(0);
              setNew();
            }}
            reveal={reveal}
            color={firstColor}
          />
          <ul className={classes.ul}>
            <li>
              <div>{gameState}</div>
              <div style={{ color: "rgba(0,0,0,0)" }}>|</div>
              <div>Round</div>
              <div>{round}/{Math.floor(length / 2)}</div>
              <div style={{ color: "rgba(0,0,0,0)" }}>|</div>
              <div>Score</div>
              <div className={classes.score}>
                {score}/{Math.floor(length / 2)}
              </div>
            </li>
            <li>
              <div className={classes.box}></div>
            </li>
          </ul>
          <GameItem
            key={1}
            item={props.movies[secondIndex]}
            onClick={() => {
              checkBigger(1);
              setNew();
            }}
            reveal={reveal}
            color={secondColor}
          />
        </div>
      )}
    </div>
  );
}
export default MovieList; /**/

/*{movies.map((movie,index) => (
        <MovieItem
          key={index}
          id={movie.id}
          title={movie.title}
          image={movie.image}
          score={movie.imDbRating}
        />
      ))}
      */
