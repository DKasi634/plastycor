import Footer from "@/components/footer/footer.component"
import TopNavbar from "@/components/top-navbar/top-navbar.component"
import { RECAPTCHA_CONTAINER_ID } from "@/utils/firebase/firebase.auth";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"


const scrollToHash = () => {
  const hash = window.location.hash.substring(1); // Remove the "#" character
  const targetElement = document.getElementById(hash);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
};



const MainNavigation = () => {

  const location = useLocation();

  useEffect(() => {
    // Scroll to the hash when the location changes
    scrollToHash();
  }, [location]);
  return (
    <div className="flex flex-col">
      <TopNavbar />
      <main className="mt-[3rem]">
        <Outlet />
        <Footer />
      </main>
      <div id={RECAPTCHA_CONTAINER_ID}></div>
    </div>
  )
}

export default MainNavigation

