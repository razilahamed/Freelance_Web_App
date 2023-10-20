import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./UpdateGig.scss"

const UpdateGig = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [gig, setGig] = useState({
    userId: currentUser?._id,
    title: "",
    price: "",
    deliveryTime: "",
    desc: "",
  });

  const [myGigs, setMyGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState("");

  useEffect(() => {
    const fetchGigDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/gigs/${selectedGig.id}`
        );
        const gigDetails = response.data;
        setGig({
          title: gigDetails.title,
          price: gigDetails.price,
          deliveryTime: gigDetails.deliveryTime,
          desc: gigDetails.desc,
        });
      } catch (error) {
        console.error("Error fetching gig details:", error);
      }
    };

    const fetchMyGigs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/gigs/mygigs/${currentUser?._id}`
        );
        setMyGigs(response.data);
      } catch (error) {
        console.error("Error fetching gig titles:", error);
      }
    };

    fetchMyGigs();
    fetchGigDetails();
  }, [id]);

  const handleChange = (e) => {
    setGig((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleDropdownChange = (e) => {
    setSelectedGig(e.target.value);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/api/gigs/${selectedGig.id}`, gig, {
        withCredentials: true,
      });
      navigate("/mygigs");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="updateGig">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Update Gig</h1>
          <div className="sections">
            <div className="info">
              <label htmlFor="title">Select Gig</label>
              <div>
                <label>Select a Gig: </label>
                <select onChange={handleDropdownChange} value={selectedGig}>
                  <option value="" disabled>
                    Select a Gig
                  </option>
                  {myGigs.map((gig) => (
                    <option key={gig.id} value={gig.id}>
                      {gig.title}
                    </option>
                  ))}
                </select>

                <p>Selected Gig: {selectedGig._id}</p>
              </div>
              <label htmlFor="price">Title</label>
              <input
                type="text"
                onChange={handleChange}
                name="title"
                value={gig.title}
              />
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                placeholder="Brief description about the gig"
                cols="0"
                rows="16"
                onChange={handleChange}
                value={gig.desc}
              ></textarea>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                onChange={handleChange}
                name="price"
                value={gig.price}
              />
              <label htmlFor="deliveryTime">Delivery Time (e.g. 3 days)</label>
              <input
                type="number"
                onChange={handleChange}
                name="deliveryTime"
                value={gig.deliveryTime}
              />
              <button>Update</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateGig;
