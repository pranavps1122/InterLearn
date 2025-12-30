// src/pages/auth/Login.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, GoogleAuth } from "../../services/auth.service";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import "./login.css";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await login(form);
      const user = res?.user
      const accessToken = res.accessToken 

      if (!accessToken || !user) {
        throw new Error("Invalid login response from server");
      }

      toast.success("Logged in successfully");

      dispatch(
        loginSuccess({
          user,
          accessToken,
        })
      );

      navigate("/",{replace:true});
    } catch (error: any) {
      console.error("Login Error:", error);
      toast.error(error?.response?.data?.message ?? error.message ?? "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (credentialResponse: any) => {
    setIsLoading(true);
    try {
      const idToken = credentialResponse?.credential;
      if (!idToken) throw new Error("Google token missing");

      const res = await GoogleAuth({ credential: idToken });
      const user = res.user
      const accessToken = res.accessToken 

      if (!accessToken || !user) {
        throw new Error("Invalid Google login response");
      }

      dispatch(
        loginSuccess({
          user,
          accessToken,
        })
      );

      toast.success("Google Login Successful");
      navigate("/");
    } catch (err: any) {
      console.error("Google login error:", err);
      toast.error(err?.response?.data?.message ?? err.message ?? "Google Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          Welcome <span>Back</span>
        </h2>

        <p className="login-subtitle">Continue your journey with InterLearn</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "password" : "text"}
                className="form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Show password" : "Hide password"}
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

          <button
            type="submit"
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">Or continue with</span>
          <div className="divider-line"></div>
        </div>

        <div className="google-login-container">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleSignIn(credentialResponse);
            }}
            onError={() => {
              console.log("Google Login Failed");
              toast.error("Google Login Failed");
            }}
          />
        </div>

        <div className="forgotPasswordContainer">
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
        </div>

        <div className="login-footer">
          <div className="footer-row">
            <span className="footer-text">Don't have an account?</span>
            <Link to="/register" className="footer-link">
              Register
            </Link>
          </div>
        </div>

        <div className="copyright">© 2024 InterLearn. All rights reserved.</div>
      </div>
    </div>
  );
}
