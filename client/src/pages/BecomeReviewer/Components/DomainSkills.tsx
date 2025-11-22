import React from "react";
import type { SectionProps } from "../types";

const DomainSkills: React.FC<SectionProps> = ({ formData, setFormData }) => {
  
  // ---------------- Domains ----------------
  const addDomain = () => {
    setFormData({
      ...formData,
      domains: [...formData.domains, ""],
    });
  };

  const updateDomain = (value: string, index: number) => {
    const updated = [...formData.domains];
    updated[index] = value;
    setFormData({ ...formData, domains: updated });
  };

  const removeDomain = (index: number) => {
    setFormData({
      ...formData,
      domains: formData.domains.filter((_, i) => i !== index),
    });
  };

  // ---------------- Skills ----------------
  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: "", level: "Beginner" }],
    });
  };

  const updateSkill = (index: number, key: "name" | "level", value: string) => {
    const updated = [...formData.skills];
    updated[index][key] = value as any;
    setFormData({ ...formData, skills: updated });
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="section">
      <h2 className="section-title">Domains & Skills</h2>

      {/* ------------ DOMAINS ----------- */}
      <label style={{ color: "#c7d4e0", marginBottom: "6px", display: "block" }}>
        Domains (Expert Areas)
      </label>

      <button className="add-btn" type="button" onClick={addDomain}>
        + Add Domain
      </button>

      {formData.domains.map((domain, index) => (
        <div key={index} className="form-grid">
          <input
            type="text"
            value={domain}
            placeholder="e.g., MERN Stack"
            onChange={(e) => updateDomain(e.target.value, index)}
          />

          <button className="remove-btn" type="button" onClick={() => removeDomain(index)}>
            Remove
          </button>
        </div>
      ))}

      <div style={{ height: "20px" }}></div>

      {/* ------------ SKILLS ----------- */}
      <label style={{ color: "#c7d4e0", marginBottom: "6px", display: "block" }}>
        Skills & Proficiency
      </label>

      <button className="add-btn" type="button" onClick={addSkill}>
        + Add Skill
      </button>

      {formData.skills.map((skill, index) => (
        <div key={index} className="form-grid form-grid-2">
          
          {/* Skill Name */}
          <input
            type="text"
            placeholder="Skill name (React, Docker...)"
            value={skill.name}
            onChange={(e) => updateSkill(index, "name", e.target.value)}
          />

          {/* Skill Level */}
          <select
            className="select-input"
            value={skill.level}
            onChange={(e) => updateSkill(index, "level", e.target.value)}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>

          <button
            className="remove-btn"
            type="button"
            onClick={() => removeSkill(index)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default DomainSkills;
