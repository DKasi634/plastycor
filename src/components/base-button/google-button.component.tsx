
import { signInWithGoogle } from '@/utils/firebase/firebase.auth'
import BaseButton, { buttonType } from './base-button.component'
import { FcGoogle } from '@/assets'
import { useDispatch } from 'react-redux'
import { googleSignInComplete, googleSignInStart, signInFailure } from '@/store/auth/auth.actions'
import { setErrorToast } from '@/store/toast/toast.actions'
import { getAuthError } from '@/utils/errors.utils'

const GoogleSigninButton = () => {
    const dispatch = useDispatch();
    const continueWithGoogle = () => {
        signInWithGoogle().then((userAuth) => { if (userAuth && userAuth.user) { dispatch(googleSignInComplete(userAuth.user)) } })
            .catch((error)=> {dispatch(signInFailure(error)); dispatch(setErrorToast(getAuthError(error).message))}) ;
        dispatch(googleSignInStart())
    }
    return (
        <BaseButton rounded={false} type={buttonType.green} clickHandler={continueWithGoogle}
            className="flex items-center justify-center !w-full !px-4 py-2 gap-2 text-sm font-medium "
        >
            <FcGoogle className="h-5 w-5" />
            <span>Continuer avec Google</span>
        </BaseButton>
    )
}

export default GoogleSigninButton