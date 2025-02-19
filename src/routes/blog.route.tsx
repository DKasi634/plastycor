import { Outlet } from "react-router-dom"


const BlogNavigation = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen">
        <Outlet/>
    </div>
  )
}

export default BlogNavigation