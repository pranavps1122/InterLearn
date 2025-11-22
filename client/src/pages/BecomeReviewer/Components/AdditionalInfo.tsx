import React from "react";
import type { SectionProps } from "../types";

const AdditionalInfo: React.FC<SectionProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, additional_info: e.target.value });
  };

  return (
    <div className="section">
      <h2 className="section-title">Additional Information</h2>

      <label>Anything else you want to share?</label>

      <textarea
        name="additional_info"
        value={formData.additional_info}
        onChange={handleChange}
        className="textarea"
        placeholder="Write anything important here..."
      />
    </div>
  );
};

export default AdditionalInfo;
