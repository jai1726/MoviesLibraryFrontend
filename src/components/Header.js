import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Header() {
    const navigate= useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate("/Login")
    }
    const handleProfile=()=>{
        navigate("/About")
    }
    const handleLogin=()=>{
        navigate("/Login")
    }
    const handleSignUp=()=>{
        navigate("/SignUp")
    }
    const handleFolders=()=>{
        navigate("/myFolders")
    }
    return (
        <header className="header">
            <Link to="/">MoviesLibrary</Link>
            
            {(localStorage.getItem('token'))?
            <div class="d-flex">
                <div className="header-buttons">
                <button className="header-button" onClick={handleFolders}>MyMovies</button>
                  <button className="header-button" onClick={handleProfile}>Profile</button>
                  <button className="header-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>:
            <div class="d-flex">
              <div className="header-buttons">
                <button class="header-button" onClick={handleLogin}>Login</button>
                <button class="header-button"  onClick={handleSignUp}>SignUp</button>
              </div>
            </div>
            }
            

        </header>
    );
}

export default Header;
