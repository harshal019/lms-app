import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CreateBook = () => {
    const [formData, setFormData] = useState({
        name: "",
        author: "",
        publisher: "",
        image: "default.png",
        quantity: 0,
        category: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
        };
        checkToken();
    }, [navigate]);

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



            const res = await fetch("http://localhost:5000/book", {
                method: "POST",
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
            } else if (data.message === "Book Added Sucessfully") {
                navigate('/librarian-panel/book' );
            }
        } catch (error) {
            console.error("error Creaing Error: -", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Book</h1>

            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    placeholder="Enter author"
                    name="author"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="publisher">publisher:</label>
                <input
                    type="text"
                    placeholder="Enter publisher"
                    name="publisher"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    placeholder="Enter image"
                    name="image"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    placeholder="Enter quantity"
                    name="quantity"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <select name="category" id="category" onChange={handleChange}>
                    <option value="FYCS">FYCS</option>
                    <option value="SYCS">SYCS</option>
                    <option value="TYCS">TYCS</option>
                    <option value="FYIT">FYIT</option>
                    <option value="SYIT">SYIT</option>
                </select>
            </div>
            <div>
                <button type="submit">Create</button>
            </div>
        </form>
    );
};
