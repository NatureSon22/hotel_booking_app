import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./layouts/Layout"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import Register from "./pages/Register"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/sign-in",
        element: <SignIn />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App     