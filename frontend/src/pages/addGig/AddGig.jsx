import React from "react";
import "./AddGig.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const AddGig = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [gig, setGig] = useState({
    userId: currentUser?._id,
    title: "",
    price: "",
    deliveryTime: "",
    desc: "",
  });

  const handleChange = (e) => {
    setGig((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/gigs", gig, {
        withCredentials: true,
      });
      navigate("/mygigs");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="addGig">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Add a New Gig</h1>
          <div className="sections">
            <div className="info">
              <label htmlFor="">Title</label>
              <input
                type="text"
                placeholder="e.g. I need a person to develop a fullstack website"
                onChange={handleChange}
                name="title"
              />
              <label htmlFor="">Description</label>
              <textarea
                name="desc"
                id=""
                placeholder="Brief description about the gig"
                cols="0"
                rows="16"
                onChange={handleChange}
              ></textarea>
              <label htmlFor="">Price</label>
              <input type="number" onChange={handleChange} name="price" />
              <label htmlFor="">Delivery Time (e.g. 3 days)</label>
              <input
                type="number"
                onChange={handleChange}
                name="deliveryTime"
              />
              <button>Create</button>
            </div>
            {/* <div className="details">
            <label htmlFor="">Service Title</label>
            <input type="text" placeholder="e.g. One-page web design" />
            <label htmlFor="">Short Description</label>
            <textarea
              name=""
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" />
            <label htmlFor="">Revision Number</label>
            <input type="number" />
            <label htmlFor="">Add Features</label>
            <input type="text" placeholder="e.g. page design" />
            <input type="text" placeholder="e.g. file uploading" />
            <input type="text" placeholder="e.g. setting up a domain" />
            <input type="text" placeholder="e.g. hosting" />
            <label htmlFor="">Price</label>
            <input type="number" />
          </div> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddGig;
