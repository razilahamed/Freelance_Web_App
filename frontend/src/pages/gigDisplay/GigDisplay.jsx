import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./GigDisplay.scss";
import axios from "axios";

function GigDisplay() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [myGigs, setMyGigs] = useState([]);
  
  useEffect(() => {
    const fetchMyGigs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/gigs/mygigs/${currentUser._id}`
        );
        setMyGigs(response.data);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      }
    };

    fetchMyGigs();
  }, []);
 
  const handleDelete = async(gigId)=>{
    try {
    
      await axios.delete(`http://localhost:8800/api/gigs/${gigId}`,{withCredentials:true});

      setMyGigs((prevGigs) =>
        prevGigs.filter((gig) => gig._id !== gigId)
      );
    } catch (error) {
      console.error("Error deleting gig:", error);
    }
  }

  return (
    <div className="gigDisplay">
      <div className="container">
        <div className="title">
          <h1>{"Gigs"}</h1>
            <Link to="/addGig">
              <button>Add New Gig</button>
            </Link>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          {myGigs.map((gig) => (
            <tr key={gig._id}>
              <td>{gig.title}</td>
              <td>{gig.price}</td>
              <td>{gig.deliveryTime}</td>
              <td>
                <img
                  className="delete"
                  src="./Images/delete.png"
                  alt=""
                  onClick={() => handleDelete(gig._id)}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default GigDisplay;
