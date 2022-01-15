import './App.css';
import Main from './components/Main.js'
import Login from './components/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// export const API_URL = 'http://127.0.0.1:8000/';

export const App = (props) => {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}


export default App;
