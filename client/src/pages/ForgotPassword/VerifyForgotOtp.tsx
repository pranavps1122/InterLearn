import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyForgotPasswordOtp, resendOtp } from '../../services/auth.service'
import { toast } from "react-toastify";
import './VerifyForgotOtp.css'

export default function VerifyForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || {};

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    setIsLoading(true);

    try {
      const res = await VerifyForgotPasswordOtp({ email, otp });
      toast.success(res.message);
      navigate("/reset-password",{state:{email}});
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setTimer(60);
    setOtp("");

    try {
      const res = await resendOtp({ email });
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
      setCanResend(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="auth-verify-container">
      <div className="auth-verify-card">
        <h2 className="auth-verify-title">
          Verify <span>OTP</span>
        </h2>

        <p className="auth-verify-subtitle">
          Enter the 6-digit OTP sent to your email
        </p>

        <div className="auth-otp-timer">
          <svg className="auth-timer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{formatTime(timer)}</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-verify-form">
          <div className="auth-form-group">
            <label htmlFor="otp" className="auth-form-label">Enter OTP</label>
            <input
              id="otp"
              type="text"
              className="auth-form-input"
              placeholder="000000"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              inputMode="numeric"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <div className="auth-resend-section">
          <span className="auth-resend-text">Didn't receive OTP?</span>
          {canResend ? (
            <button
              className="auth-resend-btn"
              onClick={handleResend}
              type="button"
            >
              Resend
            </button>
          ) : (
            <span className="auth-footer-timer">
              Resend in {formatTime(timer)}s
            </span>
          )}
        </div>

        <div className="auth-copyright">
          © 2024 InterLearn. All rights reserved.
        </div>
      </div>
    </div>
  );
}