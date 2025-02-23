import './App.css'
import { Home } from './Home';
import { Register } from './Register';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Login } from './Login';
import  {Header}  from './Header';
import Book from './librarian/Book';
import { CreateBook } from './librarian/CreateBook';
import { UpdateBook } from './librarian/UpdateBook';
import { Student } from './librarian/Student';
import { IssuedBooks } from './librarian/IssuedBooks';
import {IssuedBookCreate} from "./librarian/IssuedBookCreate";

function App() {
    return(
      <Router>

          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/register' element={<Register/>}></Route>

            <Route path='/login' element={<Login/>}></Route>
            <Route path='librarian-panel/book' element={<Book/>}></Route>
            <Route path='librarian-panel/create-book' element={<CreateBook/>}></Route>
            <Route path='librarian-panel/update-book/:id' element={<UpdateBook/>}></Route>
            <Route path='librarian-panel/students' element={<Student/>}></Route>
            <Route path='librarian-panel/issued-books' element={<IssuedBooks/>}></Route>
            <Route path='librarian-panel/issued-book-create' element={<IssuedBookCreate/>}></Route>





          </Routes>
        
      </Router>    
      );
  
}

export default App;