import Card from "./Card";
import classes from "./Form.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Form() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName("");
    setPassword("");
  }, []);
  const navigate = useNavigate();
  function handleClick()
  {
    let isError=false; 
    if(name.length===0 || password.length===0)
    {
      console.log("Fill all the fields");
      isError=true;
    }
    if(format.test(name) || format.test(password))
    {
      console.log("Contains special characters");
      isError=true;
    }
    if(name.length < 4 || password.length < 7)
    {
      console.log("Too short");
      isError=true;
    }
    if(isError)
      return;

    console.log("send request to create user " + name + " " + password);
    axios.post("https://localhost:7147/api/User",{userName:name,password:password});
    navigate("/");
    
  }
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  return (
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
              onChange={(e)=>{setName(e.target.value)}}
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
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <br />
          </label>
        </form>
        <button
          onClick={handleClick}
        >
          Submit
        </button>
      </li>
    </Card>
  );
}
export default Form;
