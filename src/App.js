import "./App.css";
import "swiper/css";
import 'swiper/css/navigation';
import { routes } from "./routes";
import { Route, Routes } from "react-router-dom";
import UserContext from "./store/UserContext";
import { useContext, useEffect } from "react";

function App() {
  const { checkLogin } = useContext(UserContext);
  useEffect(() => {
    console.log("app run!!!");
    checkLogin();
  }, []);

  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element}>
          {route?.children &&
            route.children.map((childrenRoute) => <Route {...childrenRoute} />)}
        </Route>
      ))}
    </Routes>
  );
}

export default App;
