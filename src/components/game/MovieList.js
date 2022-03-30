import classes from "./MovieList.module.css";
import GameItem from "./GameItem.js";
import { useState, useEffect } from "react";
function MovieList(props) {
  //console.log(props.movies);
  //apjungt i viena state ir galima padaryt labai nice :)
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);
  const [score, setScore] = useState(0);
  const length = props.movies.length;

  function setNew(id) {
    if (firstIndex >= length - 3 || secondIndex >= length - 3) {
      console.log("end game");
      return;
    }
    setTimeout(() => {
      setFirstIndex(firstIndex + 2);
      setSecondIndex(secondIndex + 2);
    }, 2000);
  }

  function checkBigger(id) {
    let result;

    if (
      props.movies[firstIndex].imDbRating >=
      props.movies[secondIndex].imDbRating
    )
      result = 0;
    else result = 1;

    if (result === id) {
      setScore(score + 1);
      return;
    }
    console.log("lose");
  }
  //function AddNew()
  //console.log(movies);
  //iskelus buttonus kaip passable jsx maziau kartotino kodo
  return (
    <div className={classes.div}>
      <GameItem
        key={0}
        id={props.movies[firstIndex].id}
        title={props.movies[firstIndex].title}
        image={props.movies[firstIndex].image}
        score={props.movies[firstIndex].rank}
        onClick={() => {
          setNew(1);
        }}
        checkBigger={() => checkBigger(0)}
      />
      <ul className={classes.ul}>
        <li>
          <div >Score</div>
          <div className={classes.score}>{score}</div>
        </li>
        <li>
          <div className={classes.box}></div>
        </li>
      </ul>
      <GameItem
        key={1}
        id={props.movies[secondIndex].id}
        title={props.movies[secondIndex].title}
        image={props.movies[secondIndex].image}
        score={props.movies[secondIndex].rank}
        onClick={() => {
          setNew(0);
        }}
        checkBigger={() => checkBigger(1)}
      />
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
