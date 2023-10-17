import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import "../../../App.scss";
import axios from "axios";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout", {
        withCredentials: true
      });
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
                src={currentUser.img||"/Images/unknown.jpg"}
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

                  <Link className="link" onClick={handleLogout}>
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
