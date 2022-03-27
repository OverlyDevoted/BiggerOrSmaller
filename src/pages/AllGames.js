import GameItem from "../components/games/GameItem";
import Card from "../components/ui/Card";

function AllGamesPage(props) {
  function StartGame() {}
  return <GameItem onPlay={StartGame} />;
}
export default AllGamesPage;
