import React from "react";
import "./CallToAction.css";

export default function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Ready to Transform Your Career?</h2>

        <p className="cta-subtext">
          Join thousands of successful professionals who have accelerated their
          careers with InterLearn's innovative platform.
        </p>

        <button className="cta-button">
          Start Learning Today
        </button>
      </div>
    </section>
  );
}
