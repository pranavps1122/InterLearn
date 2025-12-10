import React from "react";
import {
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Logo from "../../ui/Logo/Logo";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo-wrapper">
            <Logo />
          </div>

          <p className="footer-text">
            Empowering careers through education and practical interview
            preparation. Join the community today.
          </p>

          <div className="footer-social">
            <a href="#" className="social-icon">
              <Instagram size={18} />
            </a>
            <a href="#" className="social-icon">
              <Linkedin size={18} />
            </a>
            <a href="#" className="social-icon">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Mock Interviews</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="footer-title">Resources</h3>
          <ul className="footer-links">
            <li><a href="#">Blog</a></li>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-title">Contact</h3>
          <ul className="footer-contact">
            <li>
              <Mail size={16} className="contact-icon" /> support@interlearn.com
            </li>
            <li>
              <Phone size={16} className="contact-icon" /> +91 98765 43210
            </li>
            <li>
              <MapPin size={16} className="contact-icon" /> Bangalore, India
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 InterLearn. All rights reserved.
      </div>
    </footer>
  );
}
