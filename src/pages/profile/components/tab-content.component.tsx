

interface TabContentProps {
    activeTab: string;
  }
  
  const TabContent = ({ activeTab }: TabContentProps) => {
    const contentMap: Record<string, JSX.Element> = {
      Profile: <p className="text-center">Profile Content</p>,
      Products: <p className="text-center">Products Content</p>,
      Innovations: <p className="text-center">Innovations Content</p>,
      Dashboard: <p className="text-center">Dashboard Content</p>,
    };
  
    return contentMap[activeTab] || <p className="text-center">No Content Available</p>;
  };
  
  export default TabContent;