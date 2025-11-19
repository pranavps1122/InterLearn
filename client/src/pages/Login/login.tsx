import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {UserLogin} from '../../services/auth.service'
import {toast} from 'react-toastify'
import './login.css'


interface LoginForm {
    email:string,
    password:string
}

export default function Login (){
    const navigate = useNavigate()
    const [form,setForm]=useState<LoginForm>({
        email:'',
        password:''
    })

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()

        try {
           const res = await UserLogin(form)
           toast.success(res.message)
           navigate('/home')
        } catch (error:any) {
            toast.error(error.message||"Something went wrong")
        }
    }
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
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>

        <div className="login-footer">
          <span className="footer-text">Don’t have an account?</span>
          <a href="/register" className="footer-link">Register</a>
        </div>

        <div className="copyright">
          © 2024 InterLearn. All rights reserved.
        </div>
      </div>
    </div>
  );
}