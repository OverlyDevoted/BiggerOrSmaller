import { UserContext } from "../../App";
import { useContext } from "react";
import Card from "../ui/Card";
function Profile() {
  const user = useContext(UserContext);
  function LogOut()
  {
    user.setName("");
    user.setPassword("");
  }
  return (
    <Card>
      <li>{user.name}
      
      </li>
      <li>
        <button onClick={LogOut}>Log out</button>
      </li>
    </Card>
  );
}
export default Profile;
