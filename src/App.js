import "./App.css";
import { routes } from "./routes";
import { Route, Routes } from "react-router-dom";

function App() {
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
