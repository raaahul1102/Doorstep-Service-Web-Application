
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const date=new Date();
  const year=date.getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="company-info">
          <span className="company-name">DoorStep</span>
          <span className="copyright">&copy; {year} DoorStep. All rights reserved.</span>
        </div>
        <div className="social-links">
          <a href="https://www.facebook.com"><FaFacebook className="social-icon" /></a>
          <a href="https://www.twitter.com"><FaTwitter className="social-icon" /></a>
          <a href="https://www.instagram.com"><FaInstagram className="social-icon" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
