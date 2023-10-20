import React from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useEffect,useState } from "react";
import axios from "axios";


function Gigs () {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    // Fetch gigs when the component mounts
    const fetchGigs = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/gigs/");
        setGigs(response.data);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      }
    };

    fetchGigs();
  }, []);
  
  return (
    <div className="gigs">
      <div className="container">
        <h1>All Gigs</h1>
        <p>
          Unlock Your Potential: Dive into a World of Opportunities. From
          creative gigs to technical tasks, every job is a chance to showcase
          your skills and define your journey. Find your next challenge and turn
          your passion into profit. Embrace the freedom of freelancing where
          your talent knows no bounds.
        </p>
        <div className="menu"></div>
        <div className="cards">
          {gigs.map((gig) => (
            <GigCard key={gig.id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
