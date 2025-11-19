import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { requestOtp } from "../../services/auth.service";
import { toast } from "react-toastify";
import "./Register.css";


interface RegisterFrom{
  name:string,
  email:string,
  password:string,
  confirmPassword:string

}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterFrom>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await requestOtp(form);
      toast.success(res.message);
      navigate("/register/verify-otp", {
        state: { email: form.email, name: form.name, password: form.password }
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>

        {/* Added Footer to match CSS design */}
        <div className="register-footer">
          <span className="footer-text">Already have an account? </span>
          <a href="/login" className="footer-link">Login</a>
        </div>
        
        <div className="copyright">
          © 2024 InterLearn. All rights reserved.
        </div>
      </div>
    </div>
  );
}