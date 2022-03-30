import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <nav className={classes.nav}>
      <header style={{fontFamily:"sans-serif"}}>Bigger or Smaller</header>
      <nav>
        <ul>
          <li>
            <Link className={classes.link} to="/">
              <button>All games</button>
            </Link>
          </li>
          <li>
            <Link className={classes.link} to="/leaderboard">
              <button>Leaderboards</button>
            </Link>
          </li>
          
          <li>
            <Link className={classes.link} to="/create-game">
              <button>Create Game</button>
            </Link>
          </li>
          <li>
            <Link className={classes.link} to="/account">
              <button>Account</button>
            </Link>
          </li>
          
        </ul>
      </nav>
    </nav>
  );
}
export default MainNavigation;
/*<li>
              <Link to="/all-meetups">All meetups</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/new-meetup">New meetups</Link>
            </li>s */
