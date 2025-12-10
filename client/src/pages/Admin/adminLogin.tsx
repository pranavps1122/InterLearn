import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import "./adminLogin.css";
import {AdminPortalLogin} from '../../services/admin.service'
import { adminLoginSuccess } from "../../store/adminSlice";
import {toast} from 'react-toastify'

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      
      const res = await AdminPortalLogin(email,password)
      setTimeout(() => {
            
        dispatch(
        adminLoginSuccess({
            admin: res.user,
            token: res.token
        })
        );
        navigate('/admin/reviewer-management');
         toast.success(res.message)
      }, 1000);
     
    } catch (error:any) {
        console.log(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <div className="admin-login__card">
          {/* Logo */}
          <div className="admin-login__logo-section">
            <div className="admin-login__logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                <polyline points="10 12 12 14 16 10" />
              </svg>
            </div>
            <h1 className="admin-login__brand">InterLearn</h1>
          </div>

          {/* Subtitle */}
          <p className="admin-login__subtitle">Admin Portal Access</p>

          {/* Error Message */}
          {error && (
            <div className="admin-login__error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="admin-login__form">
            {/* Email Field */}
            <div className="admin-login__field">
              <label className="admin-login__label">USERNAME OR EMAIL</label>
              <div className="admin-login__input-wrapper">
                <svg
                  className="admin-login__input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="email"
                  className="admin-login__input"
                  placeholder="admin@interlearn.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="admin-login__field">
              <label className="admin-login__label">PASSWORD</label>
              <div className="admin-login__input-wrapper">
                <svg
                  className="admin-login__input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  className="admin-login__input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="admin-login__toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-4.5-11-4.5s1.6-2.3 4.3-4M9.9 4.24A9.72 9.72 0 0 1 12 4c7 0 11 4.5 11 4.5s-1.6 2.3-4.3 4M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="admin-login__btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="admin-login__loader"></span>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="admin-login__footer">
            <a href="/forgot-password" className="admin-login__link">
              Forgot Password?
            </a>
          </div>

          {/* Additional Info */}
          <div className="admin-login__info">
            <p>Demo Credentials:</p>
            <small>Email: admin@interlearn.com</small>
            <small>Password: admin123</small>
          </div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="admin-login__bg-animation">
        <div className="admin-login__blob admin-login__blob-1"></div>
        <div className="admin-login__blob admin-login__blob-2"></div>
        <div className="admin-login__blob admin-login__blob-3"></div>
      </div>
    </div>
  );
}