import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import LogIn from "../../Pages/LogIn/LogIn";
import MyContacts from "../../Pages/MyContacts/MyContacts";
import Register from "../../Pages/Register/Register";
import UpdateContacts from "../../Pages/UpdateContacts/UpdateContacts";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/login", element: <LogIn></LogIn> },
      { path: "/register", element: <Register></Register> },
      {
        path: "/mycontacts",
        element: (
          <PrivateRoute>
            <MyContacts></MyContacts>
          </PrivateRoute>
        ),
      },
      {
        path: "/updatecontacts/:id",
        element: (
          <PrivateRoute>
            <UpdateContacts></UpdateContacts>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/contacts/${params.id}`),
      },
    ],
  },
]);
