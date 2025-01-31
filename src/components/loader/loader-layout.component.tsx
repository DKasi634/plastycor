import LoaderItem from "./loader.component"


const LoaderLayout = () => {
    return (
        <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-light-variant z-50">
            <LoaderItem className="!m-auto" />
        </div>
    )
}

export default LoaderLayout