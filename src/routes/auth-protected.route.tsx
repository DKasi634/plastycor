import { selectCurrentUser } from "@/store/auth/auth.selector"
import React, { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Location, Navigate, useLocation } from "react-router-dom"


interface ProtectedRouteProps {
    children: ReactNode
}

export type nextRouteLocation = {
    fromRoute:Location
}

const AuthProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {

    const currentUser = useSelector(selectCurrentUser);
    const location = useLocation();

    if (!currentUser) {
        return <Navigate to={"/signin"} state={{ fromRoute: location } as nextRouteLocation} replace></Navigate>
    }

    return ( <>{children}</> )
}

export default AuthProtectedRoute