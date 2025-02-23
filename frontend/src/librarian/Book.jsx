import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState(" ");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/book", {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
        });
        const data = await res.json();
        // console.log("data =>", data);

        if (data.message === "No token autorization denied") {
          alert(data.message);
          return;
        } else if (data.message === "token is invalid") {
          alert(data.message);
          return;
        }

        setBooks(data);
        // console.log("books-", books);
      } catch (error) {
        console.error("Error fething books -", error);
      }
    };
    fetchBooks();
  }, [navigate]);

  const filterBoooks = books.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.publisher.toLowerCase().includes(search.toLowerCase()) ||
    book.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(`http://localhost:5000/book/${id}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": token,
        },
      });

      if (res.ok) {
        setBooks(books.filter(book => book._id != id));
      }
      else {
        const data = await res.json();
        if (data.message === "book not found") {
          alert(data.message);
          return;
        }
      }

    } catch (error) {
      console.error("Error deleting books -", error);

    }
  }

  return (
    <div>
      <h2>Books</h2>

      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="list-group">
        {filterBoooks.map((book) => (
          <li className="list-group-item " key={book._id}>
            <div>
              <strong>Book name:- {book.name}</strong><br />
              Id:-{book._id} <br />  
              Author :- {book.author} <br />
              Quantity:- {book.quantity}<br />
              Publisher:- {book.publisher} <br />
              Category:- {book.category}
            </div>

            <div>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
              <Link to={`/librarian-panel/update-book/${book._id}`}>Update</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Book;
