import GameSelectionItem from "../components/games/GameSelectionItem";
import Card from "../components/ui/Card";
import classes from "./AllGames.module.css";
import axios from "axios";
import { UserContext } from "../App";
import { useContext } from "react";
//https://www.listchallenges.com/f/lists/09ed9034-e25b-494c-a04a-e2e18692b5f7.jpg
//https://phantom-marca.unidadeditorial.es/ee46d7a1c09b447117f8e83c6e131f31/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/02/16437899001758.jpg

//https://imdb-api.com/en/API/Top250Movies/k_osvbh65y
function AllGamesPage(props) {
  function StartGame() {}
  const user = useContext(UserContext);
  return (
    <div className={classes.div}>
      <GameSelectionItem
        url="game"
        gameName="Top 250 IMDB movies by rank"
        mode={"Guess which movie is ranked higher"}
        onClick={() => {
        user.setGameMode(false);
          axios
            .get("https://imdb-api.com/en/API/Top250Movies/k_osvbh65y")
            .then(function (response) {
              let refactoredItems = [];
              //console.log(response.data);
              response.data.items.forEach(function (item) {
                //console.log(item);
                refactoredItems.push({
                  id: item.id,
                  score: item.rank,
                  name: item.title,
                  cover_Url: item.image,
                });
              });
              user.setGameItems(refactoredItems);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
        src="https://www.listchallenges.com/f/lists/09ed9034-e25b-494c-a04a-e2e18692b5f7.jpg"
      />
      <GameSelectionItem
        url="game"
        gameName="Top 100 Games of All Time"
        mode="Guess which game is ranked higher"
        onClick={async () => {
          
        user.setGameMode(false);
          const body =
            "fields name,total_rating,rating, cover.url; where rating > 70; where total_rating_count>500; sort rating desc; limit 250;";
          const headers = {
            headers: {
              "Client-ID": "57gs8lkrf9q7fg6w0q1bkwim95ot8e",
              Authorization: "Bearer 29bbnrhwv8hxx5woogdc75639t8tgz",
            },
          };
          console.log(headers);
          await axios
            .post(
              "http://localhost:8080/https://api.igdb.com/v4/games/",
              body,
              headers
            )
            .then(function (response) {
              console.log(response.data);
              let refactoredItems = [];
              let count = 1;
              response.data.forEach(function (item) {
                refactoredItems.push({
                  id: item.id,
                  score: count,
                  name: item.name,
                  cover_Url: item.cover.url,
                });
                count++;
              });
              user.setGameItems(refactoredItems);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
        src="https://i.ytimg.com/vi/D9lO2uE0ZOE/maxresdefault.jpg"
      />
      {user.token.length > 0 && (
        <GameSelectionItem
          url="create-game"
          gameName="Create Custom Game"
          onPlay={StartGame}
          src="https://www.pinclipart.com/picdir/big/8-80460_add-plus-plus-sign-circle-png-clipart.png"
        />
      )}
      {user.token.length === 0 && (
        <GameSelectionItem
          url="account"
          gameName="Create Custom Game"
          onPlay={StartGame}
          src="https://www.pinclipart.com/picdir/big/8-80460_add-plus-plus-sign-circle-png-clipart.png"
        />
      )}
    </div>
  );
}
export default AllGamesPage;
