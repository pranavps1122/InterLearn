import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { requestOtp } from "../../services/auth.service";
import { toast } from "react-toastify";
import "./Register.css";

interface RegisterFrom {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterFrom>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfrimPassword] = useState(true)
  const [submited,setSubmited]=useState(false)

  // Password validation checks
  const hasMinLength = form.password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(form.password);
  const hasLowerCase = /[a-z]/.test(form.password);
  const hasNumber = /[0-9]/.test(form.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(form.password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  const passwordsMatch = form.password === form.confirmPassword && form.password !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (!isPasswordValid) {
      toast.error("Password does not meet all requirements");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setSubmited(true)
      const res = await requestOtp(form);
      toast.success(res.message);
      navigate("/register/verify-otp", {
        state: { email: form.email, name: form.name, password: form.password }
      });
    } catch (error: any) {
      setSubmited(false)
      let message = error.response.data.details.body[0]
      toast.error(message || "Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="register-title">Create <span>Account</span></h2>

        <p className="register-subtitle">
          Enter your details to begin your journey
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
             
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-wrapper">
              <input
                type={!showPassword ? 'text' : 'password'}
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="eye-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="eye-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={!showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="form-input"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowConfrimPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <svg className="eye-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="eye-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="password-requirements">
            <p className="requirements-title">Password must contain:</p>
            <ul className="requirements-list">
              <li className={hasMinLength ? 'valid' : ''}>
                ✓ At least 8 characters
              </li>
              <li className={hasUpperCase && hasLowerCase ? 'valid' : ''}>
                ✓ Upper & lowercase letters
              </li>
              <li className={hasNumber ? 'valid' : ''}>
                ✓ At least one number
              </li>
              <li className={hasSpecialChar ? 'valid' : ''}>
                ✓ At least one special character
              </li>
            </ul>
          </div>
           
           
            <button
              type="submit"
              className="submit-btn"
              disabled={!isPasswordValid || !passwordsMatch||submited}
            >
            {submited ? (
          <div className="spinner"></div>
        ) : (
          "Register"
        )}
            </button>
      
         
         
        </form>

        {/* Footer */}
        <div className="register-footer">
          <div className="footer-row">
            <span className="footer-text">Already have an account?</span>
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