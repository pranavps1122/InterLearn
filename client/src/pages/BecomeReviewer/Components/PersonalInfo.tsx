import React from "react";
import type { SectionProps } from "../types";


const PersonalInfo: React.FC<SectionProps> = ({
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
      <h2 className="section-title">Personal Information</h2>

      <div className="form-grid form-grid-2">
        {/* Full Name */}
        <div>
          <label>Full Name *</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />
          {errors?.full_name && <p className="error">{errors.full_name}</p>}
        </div>

        {/* Email */}
        <div>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors?.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors?.phone && <p className="error">{errors.phone}</p>}
        </div>

        {/* Experience */}
        <div>
          <label>Years of Experience *</label>
          <input
            type="number"
            name="experience_years"
            min='0'
            value={formData.experience_years}
            onChange={handleChange}
          />
          {errors?.experience_years && (
            <p className="error">{errors.experience_years}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
