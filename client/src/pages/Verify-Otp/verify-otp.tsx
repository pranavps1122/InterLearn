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
  const [timer,setTimer]=useState(30)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);


  useEffect(()=>{
    if(timer>=1){
      const counter = setInterval(()=>{
        setTimer(prev=>prev-1)
      },1000)
      return ()=> clearInterval(counter)
    }
    
  },[timer])

 

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setForm({ otp: value });
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
      setTimer(30)
      setForm({ otp: "" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="otp-wrapper">
      {/* Background elements */}
      <div className="otp-bg-blur otp-blur-1"></div>
      <div className="otp-bg-blur otp-blur-2"></div>

      {/* Main container */}
      <div className="otp-main">
        {/* Timer badge */}
        <div className="otp-timer-badge">
          <svg className="otp-timer-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span className="otp-timer-value">{timer}</span>
          <span className="otp-timer-label">s</span>
        </div>

        {/* Content section */}
        <div className="otp-content">
          {/* Header section */}
          <div className="otp-header">
            <h1 className="otp-title">
              <span className="otp-title-normal">Verify</span>
              <span className="otp-title-accent">OTP</span>
            </h1>
            <p className="otp-subtitle">Enter the 6-digit code sent to your email address</p>
          </div>

          {/* Form section */}
          <form onSubmit={handleSubmit} className="otp-form-wrapper">
            {/* OTP Input Field */}
            <div className="otp-inputs-container">
              <input
                ref={(el) => {
                  inputRefs.current[0] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                className="otp-input-field"
                placeholder="000000"
                value={form.otp}
                onChange={handleOtpChange}
                disabled={isLoading}
                autoFocus
              />
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className={`otp-submit-button ${isLoading ? 'otp-loading' : ''}`}
              disabled={isLoading || form.otp.length !== 6}
            >
              {isLoading ? (
                <>
                  <span className="otp-spinner"></span>
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="otp-divider">
            <span className="otp-divider-line"></span>
            <span className="otp-divider-text">or</span>
            <span className="otp-divider-line"></span>
          </div>

          {/* Resend Section */}
          <div className="otp-resend-wrapper">
            <p className="otp-resend-label">Didn't receive the code?</p>
            <button
              type="button"
              className="otp-resend-button"
              onClick={handleResendOtp}
              disabled={isResending || timer > 0}
            >
              {timer > 0 ? (
                <>
                  <span className="otp-resend-timer">Resend in {timer}s</span>
                </>
              ) : (
                <>
                  <span className="otp-resend-text">Resend Code</span>
                  <svg className="otp-resend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <path d="M20.49 15a9 9 0 1 1 .12-8.83"></path>
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="otp-footer">
            <div className="otp-footer-row">
              <span className="otp-footer-text">Already have account?</span>
              <a href="/login" className="otp-footer-link">Back to Login</a>
            </div>
          </div>
          <div className="otp-copyright">© 2024 InterLearn. All rights reserved.</div>
        </div>

        {/* Copyright */}
        
      </div>
    </div>
  );
}