import Homepage from "./pages/Homepage";
import ForgotPassword from "./pages/AccountBox/ForgotPassword";
import AccountBox from "./pages/AccountBox";
import UserPanel from "./pages/UserPanel";
import Favorites from "./pages/UserPanel/Favorites";
import PersonalInfo from "./pages/UserPanel/PersonalInfo";
import DonatedBooks from "./pages/UserPanel/DonatedBooks";
import RequestedBooks from "./pages/UserPanel/RequestedBooks";
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

  { path: "/user-panel", element: <UserPanel /> },
  {
    path: "/user-panel",
    element: <UserPanel />,
    children: [
      { path: "/user-panel/favorites", element: <Favorites /> },
      { path: "/user-panel/donated-books", element: <DonatedBooks /> },
      { path: "/user-panel/requested-books", element: <RequestedBooks /> },
      { path: "/user-panel/personal-info", element: <PersonalInfo /> },
    ],
  },

  { path: "*", element: <NotFound /> },
];
