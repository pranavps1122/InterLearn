import React from 'react';
import './Footer.css';

interface FooterProps {
  sidebarOpen: boolean;
}

export default function Footer({ sidebarOpen }: FooterProps) {
  return (
    <footer className={`footer ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
      <div className="footer-links">
        <a href="#" className="footer-link">Privacy Policy</a>
        <a href="#" className="footer-link">Terms of Service</a>
        <a href="#" className="footer-link">Contact Support</a>
      </div>
      <div className="footer-copyright">
        <p>© 2024 InterLearn. All rights reserved.</p>
      </div>
    </footer>
  );
}