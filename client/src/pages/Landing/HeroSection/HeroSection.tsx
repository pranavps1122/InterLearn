import React, { use } from "react";
import "./HeroSection.css"
import { useNavigate } from "react-router-dom";
export default function HeroSection() {
  const navigate = useNavigate()
  return (
    <section className="hero-section">
      <div className="hero-container">

        <h1 className="hero-title">
          Master Your Skills,<br />
          <span className="gradient-text">Boost Your Career</span>
        </h1>

        <p className="hero-subtext">
          Free self-paced learning and real-time mock interviews with industry experts
          to prepare you for tech success.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary" onClick={()=>navigate('/login')}>Get Started</button>
          <button className="btn-outline">Explore Courses</button>
        </div>
      </div>

      <div className="hero-blur-circle"></div>
    </section>
  );
}
