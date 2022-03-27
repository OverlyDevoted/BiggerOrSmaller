import classes from "./MovieList.module.css";
import MovieItem from "./MovieItem.js";
import { useState, useEffect } from "react";
function MovieList(props) {
  //console.log(props.movies);
  //apjungt i viena state ir galima padaryt labai nice :)
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);
  const [score, setScore] = useState(0);
  const length = props.movies.length;

  function setNew(id) {
    if (firstIndex >= length - 3 || secondIndex >= length - 3)
    {
      console.log("end game");
      return;
    }
    if (id === 0) {
      if (firstIndex < secondIndex) {
        setFirstIndex(secondIndex + 1);
        return;
      }
      setFirstIndex(firstIndex + 1);
      return;
    }
    if (secondIndex < firstIndex) {
      setSecondIndex(firstIndex + 1);
      return;
    }
    setSecondIndex(secondIndex + 1);
  }

  function checkBigger(id) {
    
    let result;

    if (props.movies[firstIndex].imDbRating >= props.movies[secondIndex].imDbRating)
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
      {score}
      <ul>
        <MovieItem
          key={0}
          id={props.movies[firstIndex].id}
          title={props.movies[firstIndex].title}
          image={props.movies[firstIndex].image}
          score={props.movies[firstIndex].imDbRating}
          onClick={() => {
            setNew(1);
          }}
          checkBigger={() => checkBigger(0)}
        />
        <MovieItem
          key={1}
          id={props.movies[secondIndex].id}
          title={props.movies[secondIndex].title}
          image={props.movies[secondIndex].image}
          score={props.movies[secondIndex].imDbRating}
          onClick={() => {
            setNew(0);
          }}
          checkBigger={() => checkBigger(1)}
        />
      </ul>
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
