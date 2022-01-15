import './App.css';
import Main from './components/Main.js'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App = (props) => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}/>
        </Routes>
      </Router>
    </div>
  )
}


export default App;
