import React, { useState } from "react";
import "./BecomeReviewer.css";
import { CheckCircle, User, Briefcase, Globe, Pencil, Layers, FileText, Upload } from "lucide-react";

import type { FormDataType, ErrorType } from "./types";
import PersonalInfo from "./Components/PersonalInfo";
import ProfessionalInfo from "./Components/ProfessionalInfo";
import OnlinePresence from "./Components/OnlinePresence";
import Motivation from "./Components/Motivation";
import AdditionalInfo from "./Components/AdditionalInfo";
import FileUploads from "./Components/FileUploads";
import SubmitButtons from "./Components/SubmitButtons";
import DomainSkills from "./Components/DomainSkills";

const BecomeReviewer: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    full_name: "",
    email: "",
    phone: "",
    linkedin_url: "",
    portfolio_url: "",
    education: "",
    experience_years: "",
    field: "",
    current_role: "",
    company_name: "",
    domains: [],
    skills: [],
    motivation: "",
    additional_info: "",
    education_certificate_file: null,
    resume_file: null,
    experience_certificate_file: null,
  });

  const [errors, setErrors] = useState<ErrorType>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [step, setStep] = useState(0);

  const steps = [
    "Personal Info",
    "Professional Info",
    "Online Presence",
    "Motivation",
    "Domains & Skills",
    "Additional Info",
    "File Uploads",
    "Submit"
  ];

  const stepIcons = [
    <User size={20} />,
    <Briefcase size={20} />,
    <Globe size={20} />,
    <Pencil size={20} />,
    <Layers size={20} />,
    <FileText size={20} />,
    <Upload size={20} />,
    <CheckCircle size={20} />
  ];

  const validateStep = () => {
    const e: any = {};

    if (step === 0) {
      if (!formData.full_name.trim()) e.full_name = "Full Name is required";
      if (!formData.email.trim()) e.email = "Email is required";

      if (!formData.phone.trim()) e.phone = "Phone is required";
    }

    if (step === 1) {
      if (!formData.education.trim()) e.education = "Education is required";
      if (!formData.experience_years.trim()) e.experience_years = "Experience is required";
      if (!formData.field.trim()) e.field = "Field is required";
    }

    if (step === 3) {
      if (!formData.motivation.trim()) e.motivation = "Motivation is required";
    }

    if (step === 4) {
      if (!formData.domains.length) e.domains = "Select at least one domain";
      if (!formData.skills.length) e.skills = "Select at least one skill";
    }

    if (step === 6) {
      if (!formData.resume_file) e.resume_file = "Resume is required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const forms = [
    <PersonalInfo formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />,
    <ProfessionalInfo formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />,
    <OnlinePresence formData={formData} setFormData={setFormData} />,
    <Motivation formData={formData} setFormData={setFormData} errors={errors} />,
    <DomainSkills formData={formData} setFormData={setFormData} errors={errors} />,
    <AdditionalInfo formData={formData} setFormData={setFormData} />,
    <FileUploads formData={formData} setFormData={setFormData} errors={errors} />,
    <SubmitButtons
      formData={formData}
      setFormData={setFormData}
      errors={errors}
      setErrors={setErrors}
      submitted={submitted}
      setSubmitted={setSubmitted}
       currentStep={step}          
      setCurrentStep={setStep}    
    />
  ];

  const goNext = () => {
    if (validateStep()) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="reviewer-page">
      <div className="reviewer-container">

        <h1 className="reviewer-title">Become a Reviewer</h1>

        {submitted && (
          <div className="success-msg">
            <CheckCircle size={22} />
            <span style={{ marginLeft: "8px" }}>Application Submitted Successfully!</span>
          </div>
        )}

        {/* Modern Stepper */}
        <div className="stepper">
          {steps.map((label, index) => (
            <div key={index} className="step-wrapper">
              <div
                className={`step-circle ${step === index ? "active" : ""} ${
                  index < step ? "completed" : ""
                }`}
              >
                {stepIcons[index]}
              </div>

              {index < steps.length - 1 && (
                <div className={`step-line ${index < step ? "completed-line" : ""}`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="step-label">{steps[step]}</div>

        <div className="step-content fade-in">{forms[step]}</div>

        <div className="step-buttons">
      {step > 0 && step < 7 && !submitted && (
        <button className="back-btn" onClick={goBack}>
          Back
        </button>
      )}

      {step < forms.length - 1 ? (
            <button className="next-btn" onClick={goNext}>
              Next
            </button>
          ) : null}
        </div>

      </div>
    </div>
  );
};

export default BecomeReviewer;
