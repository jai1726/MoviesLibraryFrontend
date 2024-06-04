import './App.css';
import Home from './screens/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './screens/SignUp';
import Login from './screens/Login';
import About from './components/About';
import Verification from './components/Verification'
import PasswordReset from './components/PasswordReset'
import FolderList from './components/FolderList';
import FolderMovies from './components/FolderMovies';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/SignUp" element={<Signup />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/users/verify/:token" element={<Verification />} />
          <Route exact path="/users/reset/:token" element={<PasswordReset />} />
          <Route exact path="/myFolders" element={<FolderList />} />
          {/* Corrected path for FolderMovies */}
          <Route exact path="/myFolders/:folderName" element={<FolderMovies />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
