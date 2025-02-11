import { useState, useEffect } from "react";
import BottomNav, { bottomItems } from "./components/bottom-nav.component";
import ProfileInfo from "./components/profile-info.component";
import SidebarNav, { sidebarItems } from "./components/side-navbar.component";
import TabContent from "./components/tab-content.component";
import { useSelector } from "react-redux";
import { selectAuthLoading, selectCurrentUser } from "@/store/auth/auth.selector";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const authLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate("/signin")
    }
  }, [authLoading, currentUser])

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (tab: string) => setActiveTab(tab);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar Navigation for Large Screens */}
      {!isSmallScreen && (
        <SidebarNav
          items={sidebarItems.map((item) => ({
            ...item,
            onClick: () => handleTabChange(item.label),
          }))}
        />
      )}

      <main className="ml-[24rem] md:ml-0 pt-8 px-8">
        {
          (!authLoading && currentUser) ?
            <ProfileInfo user={currentUser} /> :
            <></>
        }
        <TabContent activeTab={activeTab} />
      </main>

      {/* Bottom Navigation for Small Screens */}
      {isSmallScreen && (
        <BottomNav
          items={bottomItems.map((item) => ({
            ...item,
            onClick: () => handleTabChange(item.label),
          }))}
        />
      )}
    </div>
  );
};

export default ProfilePage;