import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


      const upload = async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "freelancing");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/djalshksm/image/upload",
          data
        );

        const { url } = res.data;
        return url;
      } catch (err) {
        console.log(err);
      }
    };
    const imgUrl = await upload(file);


    try {
      await axios.post("http://localhost:8800/api/auth/register", {
        ...user,
        img: imgUrl,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter a unique username"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Sri lanka"
            onChange={handleChange}
          />
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+94 123456789"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
