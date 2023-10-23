import React from "react";
import "./Gig.scss";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


function Gig() {
  const { id } = useParams();

   const [user, setUser] = useState("");
   const [gig, setGig] = useState("");
    useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGig = await axios.get(
          `http://localhost:8800/api/gigs/gigbyid/${id}`
        );
        setGig(responseGig.data);

        // Now that we have gig, fetch user
        const responseUser = await axios.get(
          `http://localhost:8800/api/users/${responseGig.data.userId}`
        );
        setUser(responseUser.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); // Include id in the dependency array to re-run the effect when it changes

  // Rest of your component.
  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <h1>{gig.title}</h1>
          <div className="user">
            <img
              className="pp"
              src={user.img || "/Images/unknown.jpg"}
              alt=""
            />
            <span>{user.username}</span>
          </div>
          <h2>About This Gig</h2>
          <p>{gig.desc}</p>
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img src={user.img || "/Images/unknown.jpg"} alt="" />
              <div className="info">
                <span>{user.username}</span>
                <span className="info1">{user.email}</span>
                <button>Contact Me</button>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="price">
            <h3>{gig.title}</h3>
            <h2>$ {gig.price}</h2>
          </div>
          <p>{gig.Desc}</p>
          <div className="details">
            <div className="item">
              <img src="/Images/clock.png" alt="" />
              <span>{gig.deliveryTime} Days Delivery</span>
            </div>
          </div>
          {/* <div className="features">
              {gig.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div> */}
          <Link to={`/`}>
            <button>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Gig;
