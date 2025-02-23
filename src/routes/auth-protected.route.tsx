import { ADMIN_STATUS } from "@/api/types"
import { selectCurrentUser } from "@/store/auth/auth.selector"
import React, { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Location, Navigate, useLocation } from "react-router-dom"


interface ProtectedRouteProps {
    children: ReactNode,
    adminStatus?:ADMIN_STATUS
}

export type nextRouteLocation = {
    fromRoute:Location
}

const AuthProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminStatus }: ProtectedRouteProps) => {

    const currentUser = useSelector(selectCurrentUser);
    const location = useLocation();

    if (!currentUser) {
        return <Navigate to={"/signin"} state={{ fromRoute: location } as nextRouteLocation} replace></Navigate>
    }
    if(adminStatus && (!currentUser.adminStatus || (adminStatus===ADMIN_STATUS.MAIN_ADMIN && currentUser.adminStatus===ADMIN_STATUS.CO_ADMIN))){
        return <Navigate to={"not-found"} replace/>
    }

    return ( <>{children}</> )
}

export default AuthProtectedRoute