import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <nav>
      <header>
        <div>Bigger or Smaller</div>
        <nav>
          <ul>
            <li>
              <Link to="/">All games</Link>
            </li>
          </ul>
        </nav>
      </header>
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
