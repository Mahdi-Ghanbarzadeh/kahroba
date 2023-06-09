import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import { routes } from "./routes";
import PrivateRoute from "./PrivateRoute";
import { Route, Routes } from "react-router-dom";
import UserContext from "./store/UserContext";
import { useState, useContext, useEffect } from "react";

function App() {
  const { checkLogin } = useContext(UserContext);
  let [loading, setLoading] = useState(true);
  let [routesState, setRoutes] = useState(
    routes.map((route, i) =>
      route.path === "/user-panel" ? (
        <Route
          key={i}
          path={route.path}
          element={
            <PrivateRoute path={"/account-box"}>{route.element}</PrivateRoute>
          }
        >
          {route?.children &&
            route.children.map((childrenRoute) => <Route {...childrenRoute} />)}
        </Route>
      ) : route.path === "/account-box" ? (
        <Route
          key={i}
          path={route.path}
          element={<PrivateRoute path={"/"}>{route.element}</PrivateRoute>}
        ></Route>
      ) : (
        <Route key={i} path={route.path} element={route.element}>
          {route?.children &&
            route.children.map((childrenRoute) => <Route {...childrenRoute} />)}
        </Route>
      )
    )
  );

  useEffect(() => {
    async function fetchData() {
      await checkLogin();
      setLoading(false);
    }
    fetchData();
  }, []);

  return <>{!loading && <Routes>{routesState}</Routes>}</>;
}

export default App;
