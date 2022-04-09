import GameSelectionItem from "../components/games/GameSelectionItem";
import Card from "../components/ui/Card";
import classes from './AllGames.module.css';
import {UserContext} from '../App'
import { useContext} from 'react'
//https://www.listchallenges.com/f/lists/09ed9034-e25b-494c-a04a-e2e18692b5f7.jpg
//https://phantom-marca.unidadeditorial.es/ee46d7a1c09b447117f8e83c6e131f31/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/02/16437899001758.jpg

function AllGamesPage(props) {
  function StartGame() {}
  const user = useContext(UserContext);
  return (
    <div className={classes.div}>
      <GameSelectionItem url="game" gameName="Top 250 IMDB movies by rank" onPlay={StartGame} src="https://www.listchallenges.com/f/lists/09ed9034-e25b-494c-a04a-e2e18692b5f7.jpg"/>
      <GameSelectionItem url="game" gameName="Top 50 NBA Scorers of 2022"onPlay={StartGame} src="https://phantom-marca.unidadeditorial.es/ee46d7a1c09b447117f8e83c6e131f31/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/02/16437899001758.jpg"/>
      <GameSelectionItem url="game" gameName="Top 100 Games of All Time" onPlay={StartGame} src="https://i.ytimg.com/vi/D9lO2uE0ZOE/maxresdefault.jpg"/>
      {user.name.length > 0 && <GameSelectionItem url="create-game" gameName="Create Custom Game" onPlay={StartGame} src="https://www.pinclipart.com/picdir/big/8-80460_add-plus-plus-sign-circle-png-clipart.png"/>}
      {user.name.length === 0 && <GameSelectionItem url="account" gameName="Create Custom Game" onPlay={StartGame} src="https://www.pinclipart.com/picdir/big/8-80460_add-plus-plus-sign-circle-png-clipart.png"/>}
    </div>
  );
}
export default AllGamesPage;
