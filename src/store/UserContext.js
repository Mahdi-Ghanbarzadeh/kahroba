import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const UserContext = createContext({
  type: "",
  username: "",
  phoneNumber: "",
  email: "",
  auth: false,
});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    type: "",
    username: "",
    phoneNumber: "",
    email: "",
    auth: false,
  });
  console.log(user);
  const navigate = useNavigate();

  const login = (type, username, phoneNumber, email = "", isSurvey = false) => {
    setUser({
      type: type,
      username: username,
      phoneNumber: phoneNumber,
      email: email,
      auth: true,
    });
    localStorage.setItem(
      "userInformation",
      JSON.stringify({
        type: type,
        username: username,
        phoneNumber: phoneNumber,
        email: email,
        auth: true,
      })
    );
    // navigate(isSurvey ? "/survey" : "-1", { replace: true });
    // navigate(-1);
  };

  const updateName = (username = user.username) => {
    setUser((prev) => ({ ...prev, username }));
    localStorage.removeItem("userInformation");
    localStorage.setItem("userInformation", JSON.stringify(user));
  };

  const updatePhone = (phoneNumber = user.phoneNumber) => {
    setUser((prev) => ({ ...prev, phoneNumber }));
    localStorage.removeItem("userInformation");
    localStorage.setItem("userInformation", JSON.stringify(user));
  };

  const checkLogin = () => {
    if (localStorage.getItem("access_token") !== null) {
      console.log("test");
      axiosInstance
        .post(`accounts/api/token/verify/`, {
          token: localStorage.getItem("access_token"),
        })
        .then((res) => {
          console.log("res" + res);
          if (res.status === 200) {
            console.log(res);
            console.log(localStorage.getItem("userInformation"));
            setUser(JSON.parse(localStorage.getItem("userInformation")));
          } else {
            console.log("logout checklogin");
            logout();
          }
        });
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userInformation");
    setUser({
      type: "",
      username: "",
      phoneNumber: "",
      email: "",
      auth: false,
    });
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, checkLogin, updateName, updatePhone }}
    >
      {children}
    </UserContext.Provider>
  );
}
export default UserContext;
