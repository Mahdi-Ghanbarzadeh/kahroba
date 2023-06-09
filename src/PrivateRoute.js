import { useContext } from "react";
import UserContext from "./store/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, path }) => {
  const { user } = useContext(UserContext);
  const isAuthenticated = user.auth;

  if (path === "/account-box")
    return isAuthenticated ? children : <Navigate to={path} />;
  else return !isAuthenticated ? children : <Navigate to={path} />;
};

export default PrivateRoute;
