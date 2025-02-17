import React, { useEffect, useState } from "react";
import PasswordInput from "@/components/generic-input/password-input.component";
import BaseButton, { buttonType } from "@/components/base-button/base-button.component";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart, googleSignInStart } from "@/store/auth/auth.actions";
import { selectAuthLoading, selectCurrentUser } from "@/store/auth/auth.selector";
import LoaderLayout from "@/components/loader/loader-layout.component";
import { FcGoogle } from "@/assets";

const SignInPage: React.FC = () => {

  const currentUser = useSelector(selectCurrentUser);
  const authLoading = useSelector(selectAuthLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});


  useEffect(()=>{
    if(currentUser){
      navigate("/me/profile")
    }
  }, [currentUser])
  // Handle email input change and validate
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    let error = "";
    if (!value.trim()) {
      error = "L'email est obligatoire."; // Email is required.
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      error = "Format d'email invalide."; // Invalid email format.
    }

    setErrors((prevErrors) => ({ ...prevErrors, email: error }));
  };

  // Handle password input change and validate
  const handlePasswordChange = (value: string) => {
    setPassword(value);

    let error = "";
    if (!value.trim()) {
      error = "Le mot de passe est obligatoire."; // Password is required.
    } else if (value.length < 6) {
      error = "Le mot de passe doit contenir au moins 6 caractères."; // Password must be at least 6 characters.
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: error }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const emailError = email.trim() ? (!/\S+@\S+\.\S+/.test(email) ? "Format d'email invalide." : "") : "L'email est obligatoire.";
    const passwordError = password.trim() ? (password.length < 6 ? "Le mot de passe doit contenir au moins 6 caractères." : "") : "Le mot de passe est obligatoire.";

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }
    dispatch(emailSignInStart(email, password))
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-3 lg:rounded-xl bg-white lg:shadow-lg">
        <h2 className="text-2xl font-bold text-center">Se connecter</h2> {/* Sign In */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Entrez votre email" 
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Password Input (Replaced with PasswordInput component) */}
          <PasswordInput
            label="Mot de passe" 
            value={password}
            onChange={handlePasswordChange}
            error={errors.password}
          />

          <p className="w-full text-xs !mt-8">Vous n'avez pas encore de compte ? <Link to={"/signup"} className="text-green font-bold px-2 underline-offset-2 underline">S'inscrire</Link> </p>

          {/* Sign In Button */}
          <BaseButton
            type={buttonType.blue} submitType="submit" rounded={false}
            className="w-full !px-4 !py-2 !text-sm font-medium"
          >
            Se connecter {/* Sign In */
            }
          </BaseButton>

          {/* Continue with Google Button */}
          <BaseButton rounded={false} type={buttonType.green} clickHandler={()=>{ dispatch(googleSignInStart()) }}
            className="flex items-center justify-center !w-full !px-4 py-2 gap-2 text-sm font-medium "
          >
            <FcGoogle className="h-5 w-5" />
            <span>Continuer avec Google</span> 
          </BaseButton>
        </form>
      </div>

      {authLoading && <LoaderLayout/> }
    </div>
  );
};

export default SignInPage;