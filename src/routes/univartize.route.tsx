import { Outlet } from "react-router-dom"


const UnivartizeNavigation = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen">
        <Outlet/>
    </div>
  )
}

export default UnivartizeNavigation