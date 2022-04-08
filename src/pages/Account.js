import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext, createContext } from "react";
import Form from  "../components/ui/Form";
import { UserContext } from "../App";
import Profile from "../components/profile/Profile";

function AccountPage() {
  const user = useContext(UserContext);
  if(user.name.length===0)
  return <div>
    <Form/>
  </div>

  return <div>
    <Profile/>
  </div>;
}
export default AccountPage;
