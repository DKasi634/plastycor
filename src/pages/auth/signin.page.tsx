import React, { useEffect, useState } from "react";
import PasswordInput from "@/components/generic-input/password-input.component";
import BaseButton, { buttonType } from "@/components/base-button/base-button.component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart } from "@/store/auth/auth.actions";
import { selectAuthLoading, selectCurrentUser } from "@/store/auth/auth.selector";
import LoaderLayout from "@/components/loader/loader-layout.component";
import GoogleSigninButton from "@/components/base-button/google-button.component";
import GenericInput from "@/components/generic-input/generic-input.component";
import { nextRouteLocation } from "@/routes/auth-protected.route";

const SignInPage: React.FC = () => {

  const currentUser = useSelector(selectCurrentUser);
  const authLoading = useSelector(selectAuthLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const location = useLocation();
  const nextLocation:nextRouteLocation = location.state;

  useEffect(()=>{
    if(currentUser){
      navigate( nextLocation && nextLocation.fromRoute ? nextLocation.fromRoute :  "/me/profile")
    }
  }, [currentUser]);


  const handleNavigateToSignup = (e:React.MouseEvent<HTMLAnchorElement>) =>{
    e.preventDefault();
    navigate("/signup", { state:nextLocation })
  }

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

          <GenericInput
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={errors.email}
            name="email"
            placeholder="Entrez votre email"
          />

          {/* Password Input (Replaced with PasswordInput component) */}
          <PasswordInput
            label="Mot de passe" 
            value={password}
            onChange={handlePasswordChange}
            error={errors.password}
          />

          <p className="w-full text-xs !mt-8">Vous n'avez pas encore de compte ? <Link onClick={handleNavigateToSignup} to={"/signup"} className="text-green font-bold px-2 underline-offset-2 underline">S'inscrire</Link> </p>

          {/* Sign In Button */}
          <BaseButton
            type={buttonType.blue} submitType="submit" rounded={false}
            className="w-full !px-4 !py-2 !text-sm font-medium"
          >
            Se connecter {/* Sign In */
            }
          </BaseButton>

          {/* Continue with Google Button */}
          <GoogleSigninButton/>
        </form>
      </div>

      {authLoading && <LoaderLayout/> }
    </div>
  );
};

export default SignInPage;