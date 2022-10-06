import axios from "axios";
import { createContext, useEffect, useState } from "react";

import { ILoginInputs } from "../interfaces/loginInputs";
import { IUsers } from "../interfaces/userContext";

//@ts-ignore
export const AuthContext = createContext<IUsers>(null);

export const AuthContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(
    //@ts-ignore
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs: ILoginInputs) => {
    const response = await axios.post("/auth/login", inputs);
    setCurrentUser(response.data);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  //whenever user changes , set in local storage new data
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
