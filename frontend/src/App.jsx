import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
//import Button from "./pages/signin/signin"
import Gigs from "./pages/gigs/Gigs";
import Home from "./pages/home/home";
import GigDisplay from "./pages/gigDisplay/GigDisplay";
import AddGig from "./pages/addGig/AddGig";

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
          element: <Home/>,
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
          element: <AddGig/>,
        },
        {
          path: "/gig/:id",
          element: <signin />,
        },
      ],
    },
    {
      path: "/register",
      element: <signin />,
    },
    {
      path: "/login",
      element: <signin />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
