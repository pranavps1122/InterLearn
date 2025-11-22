import React from "react";
import type { SectionProps } from "../types";

const Motivation: React.FC<SectionProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, motivation: e.target.value });

    if (errors && errors.motivation) {
      setErrors!({ ...errors, motivation: "" });
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">Why Join Us?</h2>

      {/* Motivation */}
      <label>Tell us your motivation *</label>
      <textarea
        name="motivation"
        value={formData.motivation}
        onChange={handleChange}
        className="textarea"
        placeholder="Share why you want to become a reviewer..."
      />

      {errors?.motivation && (
        <p className="error">{errors.motivation}</p>
      )}
    </div>
  );
};

export default Motivation;
