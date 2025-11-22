import React from "react";
import { BookOpen, Users, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./FeaturesSection.css"

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <div className={`icon-container ${color}`}>
        <Icon size={32} className="icon-white" />
      </div>

      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-container">

        <div className="features-header">
          <p className="section-tag">WHAT SETS US APART</p>
          <h2 className="section-title">Key Features</h2>
          <p className="section-subtext">
            Our platform combines advanced learning technology with real-world interview experience
            to ensure you're fully prepared for your career journey.
          </p>
        </div>

        <div className="features-grid">
          <FeatureCard
            icon={BookOpen}
            color="bg-blue"
            title="Interactive Learning Tracks"
            description="Structured learning paths in MERN, Python, Java, and more with hands-on projects."
          />
          <FeatureCard
            icon={Users}
            color="bg-indigo"
            title="Freelance Mock Interviewers"
            description="Mock interviews with freelance professionals, offering personalized feedback and strategies."
          />
          <FeatureCard
            icon={Award}
            color="bg-sky"
            title="Certification"
            description="Earn industry-recognized certificates and build a strong GitHub-integrated portfolio."
          />
        </div>
      </div>
    </section>
  );
}
