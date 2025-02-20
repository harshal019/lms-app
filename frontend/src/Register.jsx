import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    userType:"Student",
  });

  const handleChange= (e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
  }

  const navigate=useNavigate();





  const handleSubmit = async(e)=>{
      e.preventDefault(); 

        //api call so we use try catch\
        try {
          console.log(formData);
          const res= await fetch("http://localhost:5000/user/register",{
            method:'POST',
            headers:{
              'Content-Type':"application/json"
            },
            body:JSON.stringify(formData)

          });

          const data=await res.json();
          console.log(data);

          if(data.message === "Username  already exist"){
            alert(data.message);
            return;
          }
          if(data.message === "User  Email already exist"){
            alert(data.message);
            return;
          }
          else  if(data.message === "User created successfully"){
            navigate("/login");
          }
          

        } catch (error) {
          console.error("Registration Error: -",error );
        }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>

      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" placeholder="Enter Name" name="name" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="name">Username:</label>
        <input type="text" placeholder="Enter username" name="username" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="name">Email:</label>
        <input type="email" placeholder="Enter Email" name="email" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="name">Password:</label>
        <input type="password" placeholder="Enter password" name="password" onChange={handleChange} />
      </div>
      <div>
        <select name="userType" id="" onChange={handleChange}>
          <option value="student">Student</option>
        </select>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};