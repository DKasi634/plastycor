import GenericInput from "@/components/generic-input/generic-input.component";
import PhoneNumberInput from "@/components/phone-number-input/phone-number-input.component";
import PasswordInput from "@/components/generic-input/password-input.component"; // Import the reusable PasswordInput
import React, { useState } from "react";
import BaseButton, { buttonType } from "@/components/base-button/base-button.component";
import { Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const validateField = (field: keyof typeof formData, value: string) => {
    let error = "";
    switch (field) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          error = "Ce champ est obligatoire."; // This field is required.
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "L'email est obligatoire."; // Email is required.
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Format d'email invalide."; // Invalid email format.
        }
        break;
      case "phoneNumber":
        if (!value.trim()) {
          error = "Le numéro de téléphone est obligatoire."; // Phone number is required.
        }
        else if (value.trim().length >= 15) {
          error = "Numéro de téléphone trop long "; // Phone number is too long.
        }
        break;
      case "password":
        if (!value.trim()) {
          error = "Le mot de passe est obligatoire."; // Password is required.
        } else if (value.length < 6) {
          error = "Le mot de passe doit contenir au moins 6 caractères."; // Password must be at least 6 characters.
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          error = "Les mots de passe ne correspondent pas."; // Passwords do not match.
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    const error = validateField(name as keyof typeof formData, value);
    setErrors({ ...errors, [name]: error });
  };

  const handlePasswordChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    const error = validateField(field, value);
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = Object.keys(formData).reduce((acc, field) => {
      const error = validateField(
        field as keyof typeof formData,
        formData[field as keyof typeof formData]
      );
      return { ...acc, [field]: error };
    }, {} as typeof errors);

    setErrors(formErrors);

    if (Object.values(formErrors).every((err) => !err)) {
      alert("Formulaire soumis avec succès!"); // Form submitted successfully!
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-16 px-8">
      <div className="w-full max-w-md p-8 space-y-3 lg:rounded-xl bg-white lg:shadow-lg">
        <h2 className="text-2xl font-bold text-center">S'inscrire</h2> {/* Sign Up */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name & Last Name Group */}
          <div className="flex flex-col md:flex-row gap-4 md:space-x-4">
            <div className="md:w-1/2 md:pr-2">
              <GenericInput
                label="Prénom" 
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange(e)}
                error={errors.firstName}
                name="firstName"
                placeholder="Entrez votre prénom" 
              />
            </div>
            <div className="md:w-1/2 md:pl-2">
              <GenericInput
                label="Nom"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange(e)}
                error={errors.lastName}
                name="lastName"
                placeholder="Entrez votre nom" 
              />
            </div>
          </div>

          {/* Email */}
          <GenericInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            error={errors.email}
            name="email"
            placeholder="Entrez votre email"
          />

          {/* Phone Number */}
          <PhoneNumberInput
            value={formData.phoneNumber}
            onChange={(value) => handlePasswordChange("phoneNumber", value)}
            error={errors.phoneNumber}
          />

          {/* Password */}
          <PasswordInput
            label="Mot de passe"
            value={formData.password}
            onChange={(value) => handlePasswordChange("password", value)}
            error={errors.password}
          />

          {/* Confirm Password */}
          <PasswordInput
            label="Confirmez le mot de passe" 
            value={formData.confirmPassword}
            onChange={(value) => handlePasswordChange("confirmPassword", value)}
            error={errors.confirmPassword}
          />

          <p className="w-full text-xs !mt-8">Vous avez déjà un compte ? <Link to={"/signin"} className="text-green font-bold px-2 underline-offset-2 underline">Se connecter</Link> </p>

          {/* Submit Button */}
          <BaseButton
            type={buttonType.green} submitType="submit" rounded={false}
            className="w-full !px-4 !py-2 !mt-4 text-sm font-medium"
          >
            S'inscrire {/* Sign Up */
            }
          </BaseButton>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;