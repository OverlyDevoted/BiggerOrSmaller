import Card from "./Card";
import classes from "./Form.module.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
function Form() {
  const user = useContext(UserContext);
  const [l_name, setLName] = useState("");
  const [l_password, setLPassword] = useState("");

  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    console.log(user.name + " " + user.password);
  }, []);

  const navigate = useNavigate();

  const handleClickRegister = async () => {
    let isError = false;
    if (name.length === 0 || password.length === 0) {
      console.log("Fill all the fields");
      isError = true;
    }
    if (format.test(name) || format.test(password)) {
      console.log("Contains special characters");
      isError = true;
    }
    if (name.length < 4 || password.length < 7) {
      console.log("Too short");
      isError = true;
    }
    if (isError) return;

    console.log("send request to create user " + name + " " + password);
    await axios
      .post("https://localhost:7147/api/User", {
        username: name,
        password: password,
      })
      .then(function (response) {
        user.setName(name);
        user.setPassword(password);
        user.setId(response.data);
        navigate("/");
      })
      .catch(function (exception) {
        console.log(exception);
      });
  };

  const handleClickLogin = async () => {
    let isError = false;
    if (l_name.length === 0 || l_password.length === 0) {
      console.log("Fill all the fields");
      isError = true;
    }
    if (isError) return;

    console.log("send request to find user " + l_name + " " + l_password);
    await axios
      .post("https://localhost:7147/api/User/find", {
        userName: l_name,
        password: l_password,
      })
      .then(function (response) {
        user.setName(l_name);
        user.setPassword(l_password);
        user.setId(response.data.id);
        user.setGames(response.data.games);
        navigate("/");
      })
      .catch(function (exception) {
        console.log(exception);
      });
  };

  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  return (
    <div style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
      <Card className={classes.editCard}>
        <li className={classes.li}>
          <h1>Login</h1>
          <form>
            <label>
              Name
              <br />
              <input
                type="text"
                name="name"
                value={l_name}
                onChange={(e) => {
                  setLName(e.target.value);
                }}
              />
              <br />
            </label>
            <label>
              Password
              <br />
              <input
                type="password"
                name="password"
                value={l_password}
                onChange={(e) => {
                  setLPassword(e.target.value);
                }}
              />
              <br />
            </label>
          </form>
          <button onClick={handleClickLogin}>Submit</button>
        </li>
      </Card>
      <Card className={classes.editCard}>
        <li className={classes.li}>
          <h1>Register</h1>
          <form>
            <label>
              Name
              <br />
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <br />
            </label>
            <label>
              Password
              <br />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
            </label>
          </form>
          <button onClick={handleClickRegister}>Submit</button>
        </li>
      </Card>
    </div>
  );
}
export default Form;
