import MovieItem from "../components/movies/MovieItem";
import MovieList from "../components/movies/MovieList";
import {useState, useEffect} from 'react'
//const DUMMY_DATA=[];
function AllMeetupsPage(props) {
  console.log(props.movies);
  return (
    <section>
      <h1> All meetups</h1>
      <MovieList movies={props.movies} />
    </section>
  );
}

export default AllMeetupsPage;
