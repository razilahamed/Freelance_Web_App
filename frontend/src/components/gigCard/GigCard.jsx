import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const GigCard = ({ item }) => {
  const [user, setUser] = useState("");
   useEffect(() => {
     const fetchGigs = async () => {
       try {
         const response = await axios.get(
           `http://localhost:8800/api/users/${item.userId}`
         );
         setUser(response.data);
       } catch (error) {
         console.error("Error fetching gigs:", error);
       }
     };

     fetchGigs();
   }, [item.userId]);




  return (
    <Link to={`/gigs/gigbyid/${item._id}`} className="link">
      <div className="gigCard">
        <div className="info">
          <div className="user">
            <img src={user.img || "/Images/unknown.jpg"} alt="" />
            <span>{user.username}</span>
          </div>
          <p>{item.title}</p>
        </div>
        <hr />
        <div className="detail">
          <div className="price">
            <span>PRICE</span>
            <h2>
              $ {item.price}
              <sup>00</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
