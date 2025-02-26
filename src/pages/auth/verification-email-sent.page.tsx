
// import LoaderLayout from "@/components/loader/loader-layout.component";
import { auth } from "@/utils/firebase/firebase.config"
// import { ActionCodeSettings, sendEmailVerification } from "firebase/auth";
import { useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { emailToVerifyState } from "./signup.page";


const VerificationEmailSentPage = () => {
    const user = auth.currentUser;
    // const [emailSentStatus, setEmailSentStatus] = useState<{type:"success"|"error", message:string}|null>(null);
    const navigate = useNavigate();
    const location  = useLocation();
    const emailToVerifyState: emailToVerifyState = location.state;


    useEffect(()=>{
        if(user && !user.emailVerified){
            navigate("/signin")
        }
        // if(user && !user.emailVerified ){
        //     const actionCodeSettings: ActionCodeSettings = {
        //         url:"http://localhost:5175/verify-email"
        //     }
        //     sendEmailVerification(user, actionCodeSettings).then(() =>{
        //       setEmailSentStatus({type:"success", message:"Verification email sent ! Please check your inbox , if you can't find it, you might need to check your spams"}) 
        //     }).catch((error) => { 
        //         console.log("Error sending verification email : ", error)
        //         setEmailSentStatus({type:"error", message:"Something went wrong , please try again !"}) })
        // }
    }, [user])

    // if(!emailToVerifyState.userEmail){
    //     return <Navigate to={"/not-found"} replace={true}></Navigate>
    // }

  return (
    <div className="flex flex-col items-center justify-center py-16 w-full h-full min-h-[70svh]">
        <div className="flex flex-col p-6">
                    {/* <p className="text-2xl p-4  text-green w-full text-center"><FaCheckCircle/></p> */}
                    <p className="text-xl w-full text-center text-dark/60 font-semibold p-4"> Nous avons envoyé un email de confirmation à <span className="font-extrabold">{emailToVerifyState?.userEmail}</span>. Veuillez consulter votre boite de recéption </p>
                </div>
        {/* {
            emailSentStatus ?

            <>{
                emailSentStatus.type === "success" ?
                <div className="flex flex-col p-6">
                    <span className="text-2xl rounded-full p-4 border-2 text-green border-green"><FaCheck/></span>
                    <p className="text-lg w-full text-center text-red-400"> Nous avons envoyé un email à <span className="font-bold">{user?.email}</span>. Veuillez consulter votre boite de recéption </p>
                </div>:
                <div className="flex flex-col p-6">
                    <span className="text-2xl rounded-full p-4 border-2 text-red-400 border-red-400"><LiaTimesSolid/></span>
                    <p className="text-lg w-full text-center text-red-400"> Desolé, quelque chose s'est mal passé , nous n'avons pas pu vérifier votre addresse mail  <span className="font-bold">{user?.email}</span>. Veuillez reessayer ultérieurement </p>
                </div>
            }
            </>:
            <LoaderLayout/>
        } */}
    </div>
  )
}

export default VerificationEmailSentPage