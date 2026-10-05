import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";

export default function ProtectedRoute({ children }: { children: ReactElement }): ReactElement | null {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if(!isLoggedIn){
        return<Navigate to="/login" replace/>
    }
    return children;
}