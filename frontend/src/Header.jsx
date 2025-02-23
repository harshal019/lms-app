import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

 const Navbar = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const userType = localStorage.getItem("userType");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  //  const[username,setUsername]=useState("");
  //  const

  //   useEffect(()=>{
  //     const fetchUserData=async()=>{
  //       setUsername(localStorage.getItem('username'));
  //     }
  //       fetchUserData();
  //   },[])

  return (
    <nav className="navbar navbar-expand-lg navbar-light  bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand " to="/">
          Library Management
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
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {userType === "Student" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/student-panel">
                   
                    Book List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link">{username}</Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    
                    Logout
                  </button>
                </li>
              </>
            )}

            {userType === "Librarian" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="librarian-panel/book">Book List</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="librarian-panel/create-book ">Create Book</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="librarian-panel/students ">Student List</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="librarian-panel/issued-books ">Issued Book List</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="librarian-panel/issued-book-create ">Issued Book </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link">{username}</Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                   
                    Logout
                  </button>
                </li>
              </>
            )}

            {!token && (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navbar as Header };