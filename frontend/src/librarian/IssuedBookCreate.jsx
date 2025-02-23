import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const IssuedBookCreate = () => {
    const [formData, setFormData] = useState({
        studentId: "",
        studentName: "",
        bookId: "",
        bookName: "",
        issueDate: "",
        returnDate: "",
        // status:""
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



            const res = await fetch("http://localhost:5000/issedBook/issue-book", {
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
            } else if (data.message === "Book Not found") {
                alert(data.message);
                return;
            }
            else if (data.message === "Book Not avilable") {
                alert(data.message);
                return;
            }
            else if (data.message === "book issued Sucessfully") {
                navigate('/librarian-panel/issued-books');
            }
        } catch (error) {
            console.error("error Issued Book: -", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Issue Book Form</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="name">Student ID:</label>
                    <input
                        type="text"
                        placeholder="Enter Student Id"
                        name="studentId"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="studentName">Student Name:</label>
                    <input
                        type="text"
                        placeholder="Enter Student Name"
                        name="studentName"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="bookId">Book Id:</label>
                    <input
                        type="text"
                        placeholder="Enter Book Id"
                        name="bookId"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="bookName">Book Name:</label>
                    <input
                        type="text"
                        placeholder="Enter Book Name"
                        name="bookName"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="issueDate">Issue Date:</label>
                    <input
                        type="date"
                        placeholder="Select Issue Date"
                        name="issueDate"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="returnDate">Return Date:</label>
                    <input
                        type="date"
                        placeholder="Select Return Date"
                        name="returnDate"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button type="submit">Issued Book</button>
                </div>
            </form>

        </div>

    );
};


