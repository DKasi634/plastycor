
import LoaderItem from "@/components/loader/loader.component";
import { auth } from "@/utils/firebase/firebase.config";
import { applyActionCode } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"



const VerifyEmailPage = () => {

    const [searchParams] = useSearchParams();
    const oobCode = searchParams.get("oobCode");
    const [emailVerifiedStatus, setEmailVerifiedStatus] = useState<"success"|"error"|null>(null);
    const navigate = useNavigate();

    useEffect(()=>{
        if(oobCode){
            // console.log("\nThe oob code : ", oobCode)
            applyActionCode(auth, oobCode)
            .then(()=>{ setEmailVerifiedStatus("success") } )
            .catch((_) =>{
                // console.log("\nFailed to verify email : ", error);
                setEmailVerifiedStatus("error") })
        }
    }, [])

    useEffect(()=>{
        if(emailVerifiedStatus === "success"){
            const timer = setTimeout(()=>{ navigate("/signin") }, 5000);
            return () => clearTimeout(timer)
        }
    }, [emailVerifiedStatus])
  return (
    <div className="w-full flex items-center justify-center flex-col p-16 min-h-[70svh]">
            <h2> Verification de l'addresse mail  </h2>
            { !emailVerifiedStatus ? <div className="flex items-center justify-start gap-5"> <span className="text-lg">Vérification en cours </span> <LoaderItem className="!w-[2rem] !h-[2rem]" /> </div>:
            
            <> { emailVerifiedStatus === "success"?
                <div className="flex flex-col items-center justiy-center p-4">
                    <p className="p-6 text-green">Vérification complete, vous pouvez maintenant vous connecter </p>
                </div>
                :
                <p className="p-6 text-red-400">Echéc de vérification de l'addresse mail </p>

            }</>
            }

    </div>
  )
}

export default VerifyEmailPage