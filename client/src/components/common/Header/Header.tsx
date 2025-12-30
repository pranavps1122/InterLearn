import React, { useState } from "react";
import { Menu, X, ChevronDown, Heading2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Logo from "../../ui/Logo/Logo";

import { useDispatch, useSelector } from "react-redux";
import { logout, logoutThunk } from "../../../store/authSlice";
import type { RootState } from "../../../store/store";
import { useAppDispatch } from "@/store/hooks";
import { useAuthStatus } from "@/core/hooks/useAuthStatus";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

   const user = useSelector((state: RootState) => state.auth.user);
  
   const {isAuthenticated,role}=useAuthStatus()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/");
  };
  

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Courses", href: "#" },
    { name: "Learn", href: "#" },
    { name: "Interview", href: "#" },
    { name: "Become A Reviewer", to: "/become-reviewer" },
  ];

  return (
    <header className="header">
      <div className="header-container">

        <div className="logo-section">
          <a href="/" className="logo">
            <Logo />
          </a>
        </div>

        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <div key={link.name} className="nav-item-wrapper">
              <a
                href={link.href}
                className="nav-link"
                onClick={(e) => {
                  if (link.to) {
                    e.preventDefault();
                    navigate(link.to);
                  }
                }}
              >
                {link.name}
              </a>
            </div>
          ))}
        </nav>

        <div className="auth-buttons">
          {!isAuthenticated ||role!=='student' ? (
            <>
              <button className="btn-login" onClick={() => navigate("/login")}>
                Log in
              </button>
              <button className="btn-register" onClick={() => navigate("/register")}>
                Register
              </button>
            </>
          ) : (
            <div className="profile-wrapper">
              <button
                className="profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {user?.name} <ChevronDown size={18} />
              </button>

              {showProfileMenu && (
                <div className="profile-dropdown">
                  <button onClick={() => navigate("/profile")}>Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
             
             
            </div>
            
          )}
        </div>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">

          {navLinks.map((link) => (
            <div key={link.name} className="mobile-item">
              <a
                href={link.href}
                className="mobile-link"
                onClick={(e) => {
                  if (link.to) {
                    e.preventDefault();
                    navigate(link.to);
                    setIsMenuOpen(false);
                  }
                }}
              >
                {link.name}
              </a>
            </div>
          ))}

          <div className="mobile-auth">
            {!isAuthenticated ? (
              <>
                <button
                  className="mobile-btn-login"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
                <button
                  className="mobile-btn-register"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <button
                  className="mobile-btn-login"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
                <button
                  className="mobile-btn-register"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      )}
    </header>
  );
}
