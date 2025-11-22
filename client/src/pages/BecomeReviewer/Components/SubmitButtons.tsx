import React, { useState } from "react";
import type { SectionProps, ErrorType } from "../types";
import { submitReviewerApplication } from "../../../services/becomeReviewer.service";
import { toast } from "react-toastify";

interface SubmitProps extends SectionProps {
  setErrors: React.Dispatch<React.SetStateAction<ErrorType>>;
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmitButtons: React.FC<SubmitProps> = ({
  formData,
  setFormData,
  setErrors,
  submitted,
  setSubmitted,
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  

  const validate = (): boolean => {
    const newErrors: ErrorType = {};

    if (!formData.full_name.trim()) newErrors.full_name = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.experience_years.trim())
      newErrors.experience_years = "Experience years is required";
    if (!formData.field.trim()) newErrors.field = "Field is required";
    if (!formData.current_role.trim())
      newErrors.current_role = "Current role is required";
    if (!formData.motivation.trim())
      newErrors.motivation = "Motivation is required";

    if (!formData.resume_file)
      newErrors.resume_file = "Resume is required";

    if (!formData.skills.length)
      newErrors.skills = "At least one skill is required";

    if (!formData.domains.length)
      newErrors.domains = "At least one domain is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;          
    if (!validate()) return;

    setIsSubmitting(true);             

    try {
      const fd = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (
          key !== "skills" &&
          key !== "domains" &&
          key !== "resume_file" &&
          key !== "education_certificate_file" &&
          key !== "experience_certificate_file"
        ) {
          fd.append(key, value as any);
        }
      });

      formData.skills.forEach((skill: any) =>
        fd.append("skills", JSON.stringify(skill))
      );

      formData.domains.forEach((domain: string) =>
        fd.append("domains", domain)
      );

      if (formData.resume_file)
        fd.append("resume_file", formData.resume_file);

      if (formData.education_certificate_file)
        fd.append("education_certificate_file", formData.education_certificate_file);

      if (formData.experience_certificate_file)
        fd.append("experience_certificate_file", formData.experience_certificate_file);

      const res = await submitReviewerApplication(fd);

      if (!res.success) {
        toast.error(res.message);
        setIsSubmitting(false); 
        return;
      }

      toast.success("Application submitted successfully!");
      setSubmitted(true);
      window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
      setTimeout(()=>{
        window.location.reload()
      },12000)

    } catch (error: any) {
      toast.error("Server error. Try again.");
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (isSubmitting) return;      

    setFormData({
      full_name: "",
      email: "",
      phone: "",
      linkedin_url: "",
      portfolio_url: "",
      education: "",
      experience_years: "",
      field: "",
      domains: [],
      skills: [],
      current_role: "",
      company_name: "",
      motivation: "",
      additional_info: "",
      education_certificate_file: null,
      resume_file: null,
      experience_certificate_file: null,
    });

    setErrors({});
  };

  return (
    <div className="submit-row">

      {!submitted && (
        <>
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}          
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>

          {!isSubmitting&&(
            <button
            className="reset-btn"
            onClick={handleReset}
            disabled={isSubmitting}           
          >
           Clear
          </button>
          )
          
          }
        </>
      )}

      {submitted && (
        <p className="success-text">Application Submitted ✔</p>
      )}

    </div>
  );
};

export default SubmitButtons;
