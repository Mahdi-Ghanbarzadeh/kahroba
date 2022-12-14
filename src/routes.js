import Homepage from "./pages/Homepage";
import ForgotPassword from "./pages/AccountBox/ForgotPassword";
import AccountBox from "./pages/AccountBox";
import NotFound from "./pages/NotFound";

export const routes = [
  { path: "/", element: <Homepage /> },
  {
    path: "/account-box",
    element: <AccountBox />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  { path: "*", element: <NotFound /> },
];
