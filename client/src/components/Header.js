import React from 'react';
import logoImage from './Logo.png';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdAccountCircle } from "react-icons/md";
import axios from 'axios';
export const Header = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("Token");
  console.log("11", token)
   function logoutHandler() {
    localStorage.removeItem("Token")
    navigate('/');
  }

  return (
    <header className="header">
      <div className="logo-container">
        <img onClick={()=>{navigate('/')}} src={logoImage} alt="DS Browser Logo" />
      </div>
      
      {
        localStorage.getItem("Token") ? (
          <div className="navigation">
            <div className="right-navigation">
              <button onClick={logoutHandler} className="login-btn">Logout</button>
             
             
                {/* <button class="dropbtn">Dropdown</button> */}
                <button onClick={() => navigate('/profile')} className="login-btn dropbtn"><MdAccountCircle /></button>
                
              
              <button onClick={() => navigate('/cart')} className="cart-btn">Cart</button>
            </div>
          </div>
        ) : (<div className="navigation">
          <div className="right-navigation">
            <button onClick={() => navigate('/login')} className="login-btn">Login</button>
            <button  onClick={() => navigate('/cart')} className="cart-btn">Cart</button>
          </div>
        </div>)
      }
    </header>
  );
};
