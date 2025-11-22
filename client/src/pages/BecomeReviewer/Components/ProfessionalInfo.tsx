import React from "react";
import type { SectionProps } from "../types";

const ProfessionalInfo: React.FC<SectionProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors && errors[e.target.name]) {
      setErrors!({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">Professional Information</h2>

      <div className="form-grid form-grid-2">
        
        {/* Field / Expertise */}
        <div>
          <label>Field / Expertise *</label>
          <input
            type="text"
            name="field"
            value={formData.field}
            onChange={handleChange}
          />
          {errors?.field && <p className="error">{errors.field}</p>}
        </div>

        {/* Current Role */}
        <div>
          <label>Current Role *</label>
          <input
            type="text"
            name="current_role"
            value={formData.current_role}
            onChange={handleChange}
          />
          {errors?.current_role && (
            <p className="error">{errors.current_role}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label>Company Name</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
          />
        </div>

        {/* Education */}
        <div>
          <label>Education</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
          />
        </div>

      </div>
    </div>
  );
};

export default ProfessionalInfo;
