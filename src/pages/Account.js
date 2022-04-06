import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "../components/ui/Form";
function AccountPage() {
  const [isLogged, setIsLogged] = useState(false);
  return <div>
    {!isLogged && <Form/>}
  </div>;
}
export default AccountPage;
