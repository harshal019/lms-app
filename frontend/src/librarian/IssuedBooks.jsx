import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const IssuedBooks = () => {

    const [issuedBooks, setIssuedBooks] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIssuedBooks = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await fetch("http://localhost:5000/issedBook", {
                    method: "GET",
                    headers: {
                        'x-auth-token': token
                    }
                });
                // console.log("hiii");

                const data = await res.json();

                // console.log("data:", data);

                setIssuedBooks(data);

                // console.log("students",students);


            } catch (error) {

                console.error("Error fetching  issued book data -", error);

            }
        }
        fetchIssuedBooks();
    }, [navigate])

    const filterIssuedBooks = issuedBooks.filter((issuedBook) =>
        issuedBook.studentName.toLowerCase().includes(search.toLowerCase()) ||
        issuedBook.bookName.toLowerCase().includes(search.toLowerCase()) ||
        issuedBook.status.toLowerCase().includes(search.toLowerCase())
    );

    const handleReturn = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const res = await fetch(`http://localhost:5000/issedBook/return-book/${id}`, {
                method: "POST",
                headers: {
                    'x-auth-token': token
                }

            });
            console.log("hii");

            const data = await res.json();
            console.log("data:", data);

            if (data.message === "Record not found") {
                alert(data.message);
                return;
            }
            else if (data.message === "Book already taken") {
                alert(data.message);
                return;
            }
            else if (data.message === "Book not found") {
                alert(data.message);
                return;
            }
            else if (data.message === "Your are not authorized to access this  book") {
                alert(data.message);
                return;
            }
            else if (data.message === "book returned Sucessfully") {
                alert(data.message);
                window.location.href = 'librarian-panel/issued-book ';
            }




        } catch (error) {
            console.error("error returning Book: -", error);

        }
    }


    return (
        <div>
            <h2 className='mx-auto p-2'>Issued Books</h2>

            <div>
                <input
                    type="text"
                    placeholder='Search for Issue Books  '
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>



            <table className="table  table-bordered table-hover" >
                <thead>
                    <tr>
                        <th scope="col">Sr.no</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {
                            filterIssuedBooks.map((issuedBook, index) => (

                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{issuedBook.studentName}</td>
                                    <td>{issuedBook.bookName}</td>
                                    <td>{issuedBook.status === "Pending" ? "Pending" : "Returned"}</td>
                                    <td>
                                        {
                                            issuedBook.status === "Pending" && (
                                                <button onClick={() => handleReturn()}>Return</button>
                                            )
                                        }
                                    </td>

                                </tr>
                            ))
                        }

                    

                </tbody>

            </table>

            {/* <ul className="list-group">
                {filterIssuedBooks.map((issuedBook) => (
                    <li className="list-group-item" key={issuedBook._id}>
                        <div>
                            <strong>{issuedBook._id}</strong> <br />
                            Student Name:{issuedBook.studentName} <br />
                            Book Name:{issuedBook.bookName} <br />
                            Status:{issuedBook.status === "Pending" ? "Pending" : "Returned"}
                        </div>

                        <div>
                            {
                                issuedBook.status === "Pending" && (
                                    <button onClick={() => handleReturn()}>Return</button>
                                )
                            }

                            <Link to={`/librarian-panel/update-book/${book._id}`}>Update</Link>
                        </div>
                    </li>
                ))}
            </ul> */}
        </div>
    )
}
