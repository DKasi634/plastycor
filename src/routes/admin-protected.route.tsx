import { ADMIN_STATUS } from "@/api/types"
import NotFoundPage from "@/pages/errors/not-found.page"
import { selectCurrentUser } from "@/store/auth/auth.selector"
import React, { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { nextRouteLocation } from "./auth-protected.route"


interface ProtectedRouteProps {
    children: ReactNode,
    adminStatus:ADMIN_STATUS
}


const AdminProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminStatus }: ProtectedRouteProps) => {

    const currentUser = useSelector(selectCurrentUser);
    const location = useLocation();

    if (!currentUser) {
        return <Navigate to={"/signin"} state={{ fromRoute: location } as nextRouteLocation} replace></Navigate>
    }
    if(adminStatus && (!currentUser.adminStatus || (adminStatus===ADMIN_STATUS.MAIN_ADMIN && currentUser.adminStatus===ADMIN_STATUS.CO_ADMIN))){
        return <NotFoundPage/>
    }
    return ( <>{children}</> )
}

export default AdminProtectedRoute