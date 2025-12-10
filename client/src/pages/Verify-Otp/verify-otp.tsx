import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { OtpVerification, resendOtp } from "../../services/auth.service";
import { toast } from "react-toastify";
import './verify-otp.css'

interface VerifyOtpForm {
  otp: string;
}

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const name = location.state?.name;
  const password = location.state?.password;

  const [form, setForm] = useState<VerifyOtpForm>({
    otp: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = form.otp.split("");
    newOtp[index] = value;
    setForm({ otp: newOtp.join("") });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !form.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.otp.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);

    try {
      const res = await OtpVerification({
        email,
        otp: form.otp,
        name,
        password
      });
      
      toast.success(res.message || "OTP verified successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);

    try {
      const res = await resendOtp({ email });
      toast.success(res.message || "OTP sent successfully");
      setResendTimer(30);
      setForm({ otp: "" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="auth-signup-container">
   

      <div className="auth-signup-card">
       <div className="auth-otp-timer">
        <svg className="auth-timer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>{resendTimer > 0 ? resendTimer : '30'}s</span>
      </div>
        <h2 className="auth-signup-title">Verify <span>OTP</span></h2>

        <p className="auth-signup-subtitle">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit} className="auth-signup-form">
          <div className="auth-otp-input-group">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="auth-otp-input"
                placeholder="0"
                value={form.otp[index] || ""}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isLoading}
              />
            ))}
          </div>

          <button
            type="submit"
            className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading || form.otp.length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP Section */}
        <div className="auth-resend-section">
          <span className="auth-resend-text">Didn't receive the code?</span>
          <button
            type="button"
            className="auth-resend-btn"
            onClick={handleResendOtp}
            disabled={isResending || resendTimer > 0}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
          </button>
        </div>

        {/* Footer */}
        <div className="auth-signup-footer">
          <div className="auth-footer-row">
            <span className="auth-footer-text">Back to</span>
            <a href="/login" className="auth-footer-link">Login</a>
          </div>
        </div>

        <div className="auth-copyright">
          © 2024 InterLearn. All rights reserved.
        </div>
      </div>
    </div>
  );
}