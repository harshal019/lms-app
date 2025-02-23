import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Student = () => {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await fetch("http://localhost:5000/user", {
                    method: "GET",
                    headers: {
                        'x-auth-token': token
                    }
                });
                // console.log("hiii");

                const data = await res.json();

                // console.log("data:", data);

                setStudents(data);

                // console.log("students",students);


            } catch (error) {

                console.error("Error fetching  data -", error);

            }
        }
        fetchStudents();
    }, [])

    const filterStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.username.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div>
            <h1 className='mx-auto p-2'>Students</h1><br />

            <div>
                <input
                    type="text"
                    placeholder='Search for Stdents...  '
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                /> 
            </div>
            <br />


            <table className="table  table-bordered table-hover" >
                <thead>
                    <tr>
                        <th scope="col">Sr.no</th>
                        <th scope="col">Name</th>
                        <th scope="col">ID</th>
                        <th scope="col">Usernames</th>
                        <th scope="col">Emails</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterStudents.map((student, index) => (

                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student._id}</td>
                                <td>{student.username}</td>
                                <td>{student.email}</td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>




            {/* <ul className="list-group">
                {filterStudents.map((student) => (
                    <li className="list-group-item" key={student._id}>
                        <div>
                            <strong>{student.name}</strong> <br />
                            ID:{student._id} <br />
                            Username:{student.username} <br /> 
                            Email:{student.email}
                        </div>

                        <div>
                            <button onClick={() => handleDelete(book._id)}>Delete</button>
                            <Link to={`/librarian-panel/update-book/${book._id}`}>Update</Link>
                        </div>
                    </li>
                ))}
            </ul> */}



        </div>
    )
}
