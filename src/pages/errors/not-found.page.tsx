import BaseButton from "@/components/base-button/base-button.component";


const NotFoundPage = () => {

    // const origin = window.location.origin;

    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="flex flex-col items-center justify-center py-4 gap-4">

                <h3 className="text-6xl md:text-7xl font-semibold text-red-400  text-center w-full my-6 ">404</h3>
                <h3 className="text-4xl md:text-5xl font-semibold text-dark-transparent  text-center w-full my-6">Oops! Page introuvable</h3>
                <p className="text-lg text-dark my-2 text-center">Desolé! La ressource que vous recherchez est introuvable ici </p>
                <div className="flex items-center justify-between w-fit gap-4 mx-auto px-6">
                    <BaseButton className="!text-xs" rounded={false} href="/">Retourner à l'accueil</BaseButton>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage