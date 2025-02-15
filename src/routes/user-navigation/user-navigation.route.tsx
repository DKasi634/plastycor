
import TopNavbar from "@/components/top-navbar/top-navbar.component"
import BottomNav from "@/routes/user-navigation/bottom-nav.component"
import SidebarNav from "@/routes/user-navigation/side-navbar.component"
import { RECAPTCHA_CONTAINER_ID } from "@/utils/firebase/firebase.auth"
import { Outlet } from "react-router-dom"



const UserProfileNavigation = () => {
  return (
    <div className="flex flex-col">
      <TopNavbar />
      <main className="mt-[3rem] relative">
        <SidebarNav/>
        <div className="min-h-screen top-0 lg:ml-[18rem] mr-0 overflow-auto py-12 px-8">
          <Outlet/>
        </div>
        <BottomNav />
      </main>
      <div id={RECAPTCHA_CONTAINER_ID}></div>
    </div>
  )
}

export default UserProfileNavigation