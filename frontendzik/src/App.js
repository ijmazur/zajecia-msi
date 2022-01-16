import './App.css';
import Main from './components/Main.js'
import Login from './components/Login';
import Dispositor from './components/dispositors/Dispositor.js';
import Driver from './components/drivers/Driver.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App = (props) => {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dispositor' element={<Dispositor />} />
          <Route path='/driver' element={<Driver />} />
        </Routes>
      </Router>
    </div>
  )
}


export default App;
