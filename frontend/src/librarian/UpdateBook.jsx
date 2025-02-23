import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";

export const UpdateBook = () => {
    const [formData, setFormData] = useState({
        name: "",
        author: "",
        publisher: "",
        image: "default.png",
        quantity: 0,
        category: "",
    });

    const {id}=useParams();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();


     useEffect(() => {
        const fetchBook = async () => {
          const token = localStorage.getItem("token");
    
          try {
            if (!token) {
              navigate("/login");
              return;
            }
    
            const res = await fetch(`http://localhost:5000/book/${id}`, {
              method: "GET",
              headers: {
                "x-auth-token": token,
              },
            });
            const data = await res.json();
            console.log("data =>", data);
    
            if (data.message === "No token autorization denied") {
              alert(data.message);
              return;
            } else if (data.message === "token is invalid") {
              alert(data.message);
              return;
            }
    
            setFormData(data);
            console.log("formData -", formData);
          } catch (error) {
            console.error("Error fething books -", error);
          }
        };
        fetchBook();
      }, [id]);





   

    const handleSubmit = async (e) => {
        e.preventDefault();

        //api call so we use try catch\
        try {
            console.log(formData);



            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }



            const res = await fetch(`http://localhost:5000/book/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);

            if (data.message === "Your are not authorized to access this  book") {
                alert(data.message);
                navigate('/login');
                return;
            } 
                navigate('/librarian-panel/book');

        } catch (error) {
            console.error("error Updating Error: -", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Book</h1>

            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    placeholder="Enter author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="publisher">publisher:</label>
                <input
                    type="text"
                    placeholder="Enter publisher"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    placeholder="Enter image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    placeholder="Enter quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <select name="category" id="category" onChange={handleChange}>
                <option value={formData.category}>{formData.category}</option>
                    <option value="FYCS">FYCS</option>
                    <option value="SYCS">SYCS</option>
                    <option value="TYCS">TYCS</option>
                    <option value="FYIT">FYIT</option>
                    <option value="SYIT">SYIT</option>
                </select>
            </div>
            <div>
                <button type="submit">Update</button>
            </div>
        </form>
    );
};
