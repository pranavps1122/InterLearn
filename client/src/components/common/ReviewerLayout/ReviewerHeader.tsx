import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ReviewerHeader.css";

interface ReviewerHeaderProps {
  reviewerName?: string;
}

export default function ReviewerHeader({ reviewerName = "Reviewer" }: ReviewerHeaderProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("reviewerToken");
    toast.success("Logged out successfully");
    navigate("/reviewer/login");
  };

  const notifications = [
    { id: 1, message: "New submission pending review", time: "2 mins ago" },
    { id: 2, message: "Review feedback requested", time: "15 mins ago" },
    { id: 3, message: "Submission deadline in 1 hour", time: "30 mins ago" }
  ];

  return (
    <header className="reviewer-header">
      <div className="reviewer-header-container">
        {/* Logo Section */}
        <div className="reviewer-logo-section">
          <div className="reviewer-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="reviewer-brand">
            <h1>InterLearn</h1>
            <span>Reviewer</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="reviewer-nav">
          <a href="/reviewer/dashboard" className="reviewer-nav-link active">
            Dashboard
          </a>
          <a href="/reviewer/submissions" className="reviewer-nav-link">
            Submissions
          </a>
          <a href="/reviewer/reviews" className="reviewer-nav-link">
            My Reviews
          </a>
          <a href="/reviewer/reports" className="reviewer-nav-link">
            Reports
          </a>
        </nav>

        {/* Right Section - Notifications, Profile */}
        <div className="reviewer-header-right">
          {/* Notification Bell */}
          <div className="reviewer-notification-wrapper">
            <button
              className="reviewer-notification-btn"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="reviewer-notification-badge">3</span>
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="reviewer-notification-dropdown">
                <div className="reviewer-notification-header">
                  <h3>Notifications</h3>
                  <button
                    className="reviewer-close-notification"
                    onClick={() => setIsNotificationOpen(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="reviewer-notification-list">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="reviewer-notification-item">
                      <div className="reviewer-notification-dot"></div>
                      <div className="reviewer-notification-content">
                        <p>{notif.message}</p>
                        <span>{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="reviewer-view-all-notif">View All</button>
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div className="reviewer-profile-wrapper">
            <button
              className="reviewer-profile-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="reviewer-avatar">
                {reviewerName.charAt(0).toUpperCase()}
              </div>
              <span className="reviewer-profile-name">{reviewerName}</span>
              <svg className={`reviewer-chevron ${isMenuOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            {isMenuOpen && (
              <div className="reviewer-profile-dropdown">
                <a href="/reviewer/profile" className="reviewer-dropdown-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  My Profile
                </a>
                <a href="/reviewer/settings" className="reviewer-dropdown-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m3.08-3.08l4.24-4.24" />
                  </svg>
                  Settings
                </a>
                <a href="/reviewer/help" className="reviewer-dropdown-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  Help & Support
                </a>
                <hr className="reviewer-dropdown-divider" />
                <button
                  className="reviewer-dropdown-item logout"
                  onClick={handleLogout}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="reviewer-mobile-menu-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}