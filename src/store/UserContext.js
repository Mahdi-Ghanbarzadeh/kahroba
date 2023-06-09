import { createContext, useState } from "react";
import axiosInstance from "../axios";

const UserContext = createContext({
  username: "",
  userId: "",
  phoneNumber: "",
  email: "",
  rooyesh: "",
  auth: false,
});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    username: "",
    userId: "",
    phoneNumber: "",
    email: "",
    rooyesh: "",
    auth: false,
  });
  console.log(user);

  const login = (username, userId, phoneNumber, email, rooyesh) => {
    console.log(username, userId, phoneNumber, email, rooyesh);
    setUser({
      username: username,
      userId: userId,
      phoneNumber: phoneNumber,
      email: email,
      rooyesh: rooyesh,
      auth: true,
    });
    localStorage.setItem(
      "userInformation",
      JSON.stringify({
        username: username,
        userId: userId,
        phoneNumber: phoneNumber,
        email: email,
        rooyesh: rooyesh,
        auth: true,
      })
    );
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

  // const checkLogin = () => {
  //   if (
  //     localStorage.getItem("token") !== null &&
  //     localStorage.getItem("token") !== undefined &&
  //     localStorage.getItem("token") !== "undefined"
  //   ) {
  //     console.log("test");
  //     axiosInstance
  //       .get(`auth/info/`)
  //       .then((res) => {
  //         console.log(res);
  //         if (res.status >= 200 && res.status < 300) {
  //           login(
  //             res.data.name,
  //             res.data.user_id,
  //             res.data.phone_number,
  //             res.data.email,
  //             res.data.rooyesh
  //           );
  //         }
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  // };

  const checkLogin = () => {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") !== undefined &&
      localStorage.getItem("token") !== "undefined"
    ) {
      const local = JSON.parse(localStorage.getItem("userInformation"));
      login(
        local.username,
        local.userId,
        local.phoneNumber,
        local.email,
        local.rooyesh
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInformation");
    setUser({
      username: "",
      userId: "",
      phoneNumber: "",
      email: "",
      rooyesh: "",
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
