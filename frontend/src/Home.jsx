import React ,{useEffect, useState}from 'react'


export const Home = () => {

  const[username,setUsername]=useState("");

  useEffect(()=>{
    const fetchUserData=async()=>{
      setUsername(localStorage.getItem('username'));
    }
      fetchUserData();
  },[]);
  return (
      <> 
       
        <div>
        <h1>Welcome {username} To The BookMatrix</h1> 
        </div>
      </>    
  )
}