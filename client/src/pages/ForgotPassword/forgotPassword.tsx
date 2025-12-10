import { useState } from "react";
import { useNavigate ,Link} from 'react-router-dom'
import {requestForgotPasswordOtp} from '../../services/auth.service'
import { toast } from "react-toastify";
import "./forgotPassword.css";

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ForgotPasswordForm>({
    email: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await requestForgotPasswordOtp(form);
      toast.success(res.message);
      navigate("/reset-password/verify-otp", {
        state: { email: form.email }
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-containerOg">
      <div className="forgot-password-card">

        <h2 className="forgot-password-title">Reset <span>Password</span></h2>

        <p className="forgot-password-subtitle">
          Enter your email to receive password reset instructions
        </p>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        {/* Footer */}
        <div className="forgot-password-footer">
          <div className="footer-row">
            <span className="footer-text">Remember your password?</span>
           <Link to='/login' className="footer-link">Login</Link>
          </div>
        </div>

        <div className="copyright">
          © 2024 InterLearn. All rights reserved.
        </div>
      </div>
    </div>
  );
}