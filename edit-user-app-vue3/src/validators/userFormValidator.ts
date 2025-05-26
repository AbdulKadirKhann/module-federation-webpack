import { computed, Ref } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
}

interface ValidationResult {
  isValid: boolean;
  message: string;
}

interface FormValidation {
  name: ValidationResult;
  email: ValidationResult;
  age: ValidationResult;
  gender: ValidationResult;
  isFormValid: boolean;
}

export function useFormValidator(formData: Ref<User>): Ref<FormValidation> {
  return computed<FormValidation>(() => {
    // Name validation
    const nameValidation: ValidationResult = {
      isValid: Boolean(formData.value.name && formData.value.name.trim()),
      message: formData.value.name ? '' : 'Name is required'
    };

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidation: ValidationResult = {
      isValid: Boolean(formData.value.email && emailRegex.test(formData.value.email)),
      message: !formData.value.email 
        ? 'Email is required' 
        : !emailRegex.test(formData.value.email) 
          ? 'Please enter a valid email address' 
          : ''
    };

    // Age validation
    const ageValidation: ValidationResult = {
      isValid: typeof formData.value.age === 'number' && formData.value.age > 0,
      message: typeof formData.value.age !== 'number' || formData.value.age <= 0
        ? 'Age must be a positive number'
        : ''
    };

    // Gender validation
    const validGenders = ['male', 'female', 'Other'];
    const genderValidation: ValidationResult = {
      isValid: Boolean(formData.value.gender && validGenders.includes(formData.value.gender)),
      message: !formData.value.gender ? 'Gender is required' : ''
    };

    // Overall form validation
    const isFormValid = nameValidation.isValid && 
                        emailValidation.isValid && 
                        ageValidation.isValid && 
                        genderValidation.isValid;

    return {
      name: nameValidation,
      email: emailValidation,
      age: ageValidation,
      gender: genderValidation,
      isFormValid
    };
  });
}