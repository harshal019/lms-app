import './App.css'
import { Home } from './Home';
import { Register } from './Register';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Login } from './Login';
import { Header } from './Header';
function App() {
    return(
      <Router>

          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/register' element={<Register/>}></Route>

            <Route path='/login' element={<Login/>}></Route>

          </Routes>
        
      </Router>    
      );
  
}

export default App;