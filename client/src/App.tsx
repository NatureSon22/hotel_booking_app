import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Protected from "./layouts/Protected";
import MyHotels from "./pages/MyHotels";
import useIsAuthorized from "./hooks/authorized";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/my-hotels",
        element: (
          <Protected>
            <MyHotels />
          </Protected>
        ),
      },
    ],
  },
]);

const App = () => {
  useIsAuthorized();

  return <RouterProvider router={router} />;
};

export default App;
