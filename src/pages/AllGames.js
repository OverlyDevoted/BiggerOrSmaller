import GameSelectionItem from "../components/games/GameSelectionItem";
import Card from "../components/ui/Card";
import classes from './AllGames.module.css';
//https://www.listchallenges.com/f/lists/09ed9034-e25b-494c-a04a-e2e18692b5f7.jpg
//https://phantom-marca.unidadeditorial.es/ee46d7a1c09b447117f8e83c6e131f31/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/02/16437899001758.jpg

function AllGamesPage(props) {
  function StartGame() {}

  return (
    <div className={classes.div}>
      <GameSelectionItem gameName="IMDB Top 250 by place" onPlay={StartGame} src="https://www.listchallenges.com/f/lists/09ed9034-e25b-494c-a04a-e2e18692b5f7.jpg"/>
      <GameSelectionItem gameName="Top 50 NBA scorers of 2022"onPlay={StartGame} src="https://phantom-marca.unidadeditorial.es/ee46d7a1c09b447117f8e83c6e131f31/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/02/16437899001758.jpg"/>
      <GameSelectionItem gameName="" onPlay={StartGame} src="https://phantom-marca.unidadeditorial.es/ee46d7a1c09b447117f8e83c6e131f31/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/02/16437899001758.jpg"/>
    </div>
  );
}
export default AllGamesPage;
