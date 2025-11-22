import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OtpVerification } from '../../services/auth.service'
import { toast } from "react-toastify";
import "./verify-otp.css"

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const { email, name, password } = location.state || {};

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  
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
      const res = await OtpVerification({ email, otp, name, password });
      toast.success(res.message);
      navigate("/login");
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
      // Call your resend OTP API here
      // await ResendOtp({ email });
      toast.info("OTP resent to your email");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
      setCanResend(true);
    }
  };

  const formatTime = (seconds: number) => {
    return seconds.toString().padStart(2, '0');
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2 className="otp-title">
          Verify <span>OTP</span>
        </h2>

        <p className="otp-subtitle">
          Enter the 6-digit OTP sent to your email
        </p>

        <div className="otp-timer">
          <svg className="timer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{formatTime(timer)}</span>
        </div>

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="form-group">
            <label className="form-label">Enter OTP</label>
            <input
              type="text"
              className="form-input"
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
            className={`submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <div className="otp-footer">
          <span className="footer-text">
            Didn't receive OTP?
          </span>
          {canResend ? (
            <button 
              className="footer-link" 
              onClick={handleResend}
              type="button"
            >
              Resend
            </button>
          ) : (
            <span className="footer-timer">
              Resend in {formatTime(timer)}s
            </span>
          )}
        </div>

        <div className="copyright">
          © 2024 InterLearn. All rights reserved.
        </div>
      </div>
    </div>
  );
}