import React,{useState,useEffect} from "react";
import {Link}from "react-router-dom"

export const Header = () => {

     const[username,setUsername]=useState("");
    
      useEffect(()=>{
        const fetchUserData=async()=>{
          setUsername(localStorage.getItem('username'));
        }
          fetchUserData();
      },[])



  return (
    <nav className="navbar navbar-expand-lg  bg-danger">
      <div className="container-fluid">
        <Link className="navbar-brand text-white"   to="#">
          BookMatrix
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            {username &&
            <li className="nav-item">
            <Link className="nav-link" to="/">
              {username}
            </Link>
          </li>
            }
            
            
          </ul>
        </div>
      </div>
    </nav>
  );
};