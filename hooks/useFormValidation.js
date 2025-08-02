import { useState } from "react";

export default function useFormValidation(formData) {
  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    console.log("Validating form data:", formData);
    const errors = {};
    
    // Simplified validation - just require the basics
    if (!formData.issue.title?.trim()) {
      errors.title = "Title is required";
    }
    
    if (!formData.issue.description?.trim()) {
      errors.description = "Description is required";
    }
    
    if (!formData.location.locality?.trim()) {
      errors.locality = "Locality is required";
    }
    
    console.log("Validation errors:", errors);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return { formErrors, setFormErrors, validate };
}
