import React from "react";
import { useState } from "react";
// import User from '../../server/models/User';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",

    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //api call so we use try catch\
    try {
      // console.log(formData);
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // console.log("Entering to data");
      const data = await res.json();

      console.log("data =>>",data);

      if (data.message === "Invalid Credentials") {
        alert(data.message);
        return;
      }
      if (data.message === "Invalid password") {
        alert(data.message);
        return;
      }
      localStorage.setItem("token", data.token);

      const user = jwtDecode(data.token);

      localStorage.setItem("username", user.username);
      localStorage.setItem("userType", user.userType);

      if (user.userType === "Librarian" || user.userType === "Student") {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error: -", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <div>
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          // placeholder="Enter username"
          name="username"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="name">Password:</label>
        <input
          type="password"
          // placeholder="Enter password"
          name="password"
          onChange={handleChange}
        />
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

// User
// alice_j
// bob_smith
// bob@456