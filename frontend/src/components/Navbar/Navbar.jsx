import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import "../../../App.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const currentUser = {
    id: 1,
    username: "Anna",
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <span className="text">GIG</span>
          <img alt="o" className="group" src="./Images/Group.png"></img>
        </div>
        <div className="links">
          <Link className="link" to="/gigs">
            Find Work
          </Link>
          <Link className="link" to="/b">
            Find Freelancer
          </Link>
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  <Link className="link" to="/mygigs">
                    Gigs
                  </Link>
                  <Link className="link" to="/addGig">
                    Add New Gig
                  </Link>
                  <Link className="link" to="/MyProfile">
                    View Profile
                  </Link>

                  <Link className="link" to="/">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link className="link" to="/login">
                <button>Login</button>
              </Link>
              <Link className="link" to="/register">
                <button>SignUp</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
