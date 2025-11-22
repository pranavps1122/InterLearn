export interface SkillType {
  name: string;
  level: "Beginner" | "Intermediate" | "Expert";
}

export interface FormDataType {
  full_name: string;
  email: string;
  phone: string;
  linkedin_url: string;
  portfolio_url: string;
  education: string;
  experience_years: string;
  field: string;
  current_role: string;
  company_name: string;
  motivation: string;
  additional_info: string;

  domains: string[]; 
  skills: SkillType[];

  education_certificate_file: File | null;
  resume_file: File | null;
  experience_certificate_file: File | null;
}

export interface ErrorType {
  [key: string]: string;
}

export interface SectionProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  errors?: ErrorType;
  setErrors?: React.Dispatch<React.SetStateAction<ErrorType>>;
}
