import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OtpVerification } from '../../services/auth.service'
import { toast } from "react-toastify";
import "./verify-otp.css"

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const { email, name, password } = location.state || {};

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await OtpVerification({ email, otp, name, password });
      toast.success(res.message);
      navigate("/login");
    } catch (error:any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
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

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="form-group">
            <label className="form-label">OTP</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Verify
          </button>
        </form>

        <div className="otp-footer">
          <span className="footer-text">
            Didn’t receive OTP?
          </span>
          <span className="footer-link"> Resend</span>
        </div>

        <div className="copyright">
          © 2024 InterLearn. All rights reserved.
        </div>
      </div>
    </div>
  );
}
