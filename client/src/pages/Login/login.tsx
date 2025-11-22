import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin, GoogleAuth } from "../../services/auth.service";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await UserLogin(form);
      console.log(res)
      toast.success(res.message);

      dispatch(
        loginSuccess({
          user: res.user,
          token: res.token,
        })
      );

      navigate("/");
    } catch (error: any) {
      console.log('Login Error:', error.message);
      toast.error(error.message || "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoogleSignIn = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;

    try {
      const res = await GoogleAuth({ credential: idToken });
      let user=res?.result?.user
      let token=res?.result?.token

      dispatch(
        loginSuccess({user,token})
      );

      toast.success("Google Login Successful");
      navigate("/");
    } catch (err: any) {
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          Welcome <span>Back</span>
        </h2>

        <p className="login-subtitle">Continue your journey with InterLearn</p>

        {/* ------------------ FORM ------------------ */}
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
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* ---------- Divider ---------- */}
        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">Or continue with</span>
          <div className="divider-line"></div>
        </div>

        <GoogleLogin onSuccess={(credentialResponse) => { console.log("GOOGLE RESPONSE:", credentialResponse); 
          handleGoogleSignIn(credentialResponse); }} onError={() => { console.log("Google Login Failed"); }} />

        <div className="login-footer">
          <span className="footer-text">Don't have an account?</span>
          <a href="/register" className="footer-link">
            Register
          </a>
        </div>

        <div className="copyright">
          © 2024 InterLearn. All rights reserved.
        </div>
      </div>
    </div>
  );
}
