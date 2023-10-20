import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
//import Button from "./pages/signin/signin"
import Gigs from "./pages/gigs/Gigs";
import Home from "./pages/home/home";
import GigDisplay from "./pages/gigDisplay/GigDisplay";
import AddGig from "./pages/addGig/AddGig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Gig from "./pages/gig/Gig";
import UpdateGig from "./pages/updateGig/UpdateGig";

function App() {
  const Layout = () => {
    return (
      <div>
        <div className="app">
          <Navbar />
          <Outlet />
        </div>
      </div>
    );
  };

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
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/myGigs",
          element: <GigDisplay />,
        },
        {
          path: "/MyProfile",
          element: <signin />,
        },
        {
          path: "/addGig",
          element: <AddGig />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/gigs/gigbyid/:id",
          element: <Gig />,
        },
        {
          path: "/updateGig",
          element: <UpdateGig />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
