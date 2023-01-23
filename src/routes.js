import Homepage from "./pages/Homepage";
import ForgotPassword from "./pages/AccountBox/ForgotPassword";
import AccountBox from "./pages/AccountBox";
import UserPanel from "./pages/UserPanel";
import DonateBook from "./pages/UserPanel/DonateBook";
import PersonalInfo from "./pages/UserPanel/PersonalInfo";
import DonatedBooks from "./pages/UserPanel/DonatedBooks";
import RequestedBooks from "./pages/UserPanel/RequestedBooks";
import NotFound from "./pages/NotFound";
import Books from "./pages/Books";

export const routes = [
  { path: "/", element: <Homepage /> },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/account-box",
    element: <AccountBox />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  // { path: "/user-panel", element: <UserPanel /> },
  {
    path: "/user-panel",
    element: <UserPanel />,
    children: [
      { path: "/user-panel", element: <DonateBook /> },
      { path: "/user-panel/donate-book", element: <DonateBook /> },
      { path: "/user-panel/donated-books", element: <DonatedBooks /> },
      { path: "/user-panel/requested-books", element: <RequestedBooks /> },
      { path: "/user-panel/personal-information", element: <PersonalInfo /> },
    ],
  },

  { path: "*", element: <NotFound /> },
];
