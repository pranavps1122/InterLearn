import { useState } from "react";
import "./AdminHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../../store/adminSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../store/store";

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state: RootState) => state.admin.admin);
  console.log('admin',admin)
  

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">
      <div className="admin-header__wrapper">
        
        {/* Logo */}
        <div className="admin-header__logo-section">
          <div className="admin-header__logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <span className="admin-header__brand">InterLearn</span>
        </div>

        {/* Title */}
        <div className="admin-header__title">
          <h1>Admin Dashboard</h1>
        </div>

        {/* Profile */}
        <div className="admin-header__right">
          <div className="admin-header__profile-wrapper">
            <button
              className="admin-header__profile-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="admin-header__avatar">
                {(admin?.name || admin?.email || "A").charAt(0).toUpperCase()}
              </div>

              <span className="admin-header__profile-label">
                {admin?.name || admin?.email || "Admin"}
              </span>
            </button>

            {/* Dropdown */}
            {isMenuOpen && (
              <div className="admin-header__dropdown">
                <a href="/admin/profile" className="admin-header__dropdown-item">
                  My Profile
                </a>

                <a href="/admin/settings" className="admin-header__dropdown-item">
                  Settings
                </a>

                <hr className="admin-header__divider" />

                <button
                  className="admin-header__dropdown-item logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
