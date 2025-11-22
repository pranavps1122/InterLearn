import React from "react";
import { Upload } from "lucide-react";
import type { SectionProps } from "../types";

const FileUploads: React.FC<SectionProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0] || null;

    setFormData({ ...formData, [key]: file });

    if (errors && errors[key]) {
      setErrors!({ ...errors, [key]: "" });
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">Documents</h2>

      <div className="form-grid">

        {/* Resume */}
        <div>
          <label className="file-label">
            <Upload size={16} /> Resume / CV *
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFile(e, "resume_file")}
            className="file-input"
          />

          {formData.resume_file && (
            <p className="file-success">✓ {formData.resume_file.name}</p>
          )}

          {errors?.resume_file && (
            <p className="error">{errors.resume_file}</p>
          )}
        </div>

        {/* Education Certificate */}
        <div>
          <label className="file-label">
            <Upload size={16} /> Education Certificate
          </label>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFile(e, "education_certificate_file")}
            className="file-input"
          />

          {formData.education_certificate_file && (
            <p className="file-success">
              ✓ {formData.education_certificate_file.name}
            </p>
          )}
        </div>

        {/* Experience Certificate */}
        <div>
          <label className="file-label">
            <Upload size={16} /> Experience Certificate
          </label>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFile(e, "experience_certificate_file")}
            className="file-input"
          />

          {formData.experience_certificate_file && (
            <p className="file-success">
              ✓ {formData.experience_certificate_file.name}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default FileUploads;
