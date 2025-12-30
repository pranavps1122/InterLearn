import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ReviewerPortalLogin } from "@/services/auth.service";
import { loginSuccess } from "../../store/authSlice";
import "./ReviewerLogin.css";

interface ReviewerLoginForm {
  email: string;
  password: string;
}

export default function ReviewerLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState<ReviewerLoginForm>({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ReviewerLoginForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const validateForm = (): boolean => {
    if (!form.email.trim() || !form.password.trim()) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await ReviewerPortalLogin(form);
      console.log(response)
      toast.success("Login successful");
      
      dispatch(
        loginSuccess({
          user: response.user,
          accessToken: response.accessToken
        })
      );

      navigate("/reviewer/dashboard");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Invalid email or password";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPasswordToggleIcon = () => (
    showPassword ? (
      <svg className="reviewer-eye-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      </svg>
    ) : (
      <svg className="reviewer-eye-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    )
  );

  return (
    <div className="reviewer-login-container">
      <div className="reviewer-login-card">
        <h2 className="reviewer-login-title">
          Reviewer <span>Portal</span>
        </h2>

        <p className="reviewer-login-subtitle">
          Sign in to your reviewer account
        </p>

        <form onSubmit={handleSubmit} className="reviewer-login-form">
          <div className="reviewer-form-group">
            <label htmlFor="email" className="reviewer-form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="reviewer-form-input"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="reviewer-form-group">
            <label htmlFor="password" className="reviewer-form-label">
              Password
            </label>
            <div className="reviewer-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="reviewer-form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="reviewer-toggle-password-btn"
                onClick={handleTogglePassword}
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {renderPasswordToggleIcon()}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="reviewer-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="reviewer-footer-links">
          <Link to="/reviewer/forgot-password" className="reviewer-footer-link">
            Forgot Password?
          </Link>
          <span className="reviewer-separator">•</span>
          <Link to="/login" className="reviewer-footer-link">
            User Login
          </Link>
        </div>

        <div className="reviewer-login-footer">
          <div className="reviewer-footer-row">
            <span className="reviewer-footer-text">Don't have access?</span>
            <a href="mailto:support@interlearn.com" className="reviewer-footer-link">
              Contact Support
            </a>
          </div>
        </div>

        <div className="reviewer-copyright">
          © 2024 InterLearn. All rights reserved.
        </div>
      </div>
    </div>
  );
}