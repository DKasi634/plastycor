import Footer from "@/components/footer/footer.component"
import TopNavbar from "@/components/top-navbar/top-navbar.component"
import { Outlet } from "react-router-dom"


const MainNavigation = () => {
  return (
    <div className="flex flex-col">
      <TopNavbar />
      <main className="mt-[3rem]">
        <Outlet />
        <Footer />
      </main>
    </div>
  )
}

export default MainNavigation

