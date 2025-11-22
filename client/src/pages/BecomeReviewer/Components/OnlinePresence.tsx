import React from "react";
import type { SectionProps } from "../types";

const OnlinePresence: React.FC<SectionProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="section">
      <h2 className="section-title">Online Presence</h2>

      <div className="form-grid form-grid-2">
        
        {/* LinkedIn URL */}
        <div>
          <label>LinkedIn URL</label>
          <input
            type="url"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/your-profile"
          />
        </div>

        {/* Portfolio URL */}
        <div>
          <label>Portfolio URL</label>
          <input
            type="url"
            name="portfolio_url"
            value={formData.portfolio_url}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
          />
        </div>

      </div>
    </div>
  );
};

export default OnlinePresence;
