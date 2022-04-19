import classes from "./MovieList.module.css";
import GameItem from "./GameItem.js";
import { useState, useEffect } from "react";
function MovieList(props) {
  //console.log(props.movies);
  //apjungt i viena state ir galima padaryt labai nice :)
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);
  const [score, setScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reveal, setReveal] = useState(false);
  const length = props.movies.length;
  useEffect(() => {
    if (props.movies.length > 0) 
      setIsLoaded(true);
  }, [props]);

  function setNew() {
    
    if (firstIndex >= length - 3 || secondIndex >= length - 3) {
      setReveal(true);
      console.log("end game");
      return;
    }
    setReveal(true);
    setTimeout(() => {
      setReveal(false);
      setFirstIndex(firstIndex + 2);
      setSecondIndex(secondIndex + 2);
    }, 2000);
  }

  function checkBigger(id) {
    let result;

    if (
      props.movies[firstIndex].score >=
      props.movies[secondIndex].score
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
    <div>
      {isLoaded && (
        <div className={classes.div}>
          <GameItem
            key={0}
            item={props.movies[firstIndex]}
            onClick={() => {
              setNew();
              checkBigger(0);
            }}
            reveal={reveal}
          />
          <ul className={classes.ul}>
            <li>
              <div>Score</div>
              <div className={classes.score}>{score}</div>
            </li>
            <li>
              <div className={classes.box}></div>
            </li>
          </ul>
          <GameItem
            key={1}
            item={props.movies[secondIndex]}
            onClick={() => {
              setNew();
              checkBigger(1);
            }}
            reveal={reveal}
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
