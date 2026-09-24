import {Navigate} from "react-router-dom";

export default function protectedRoutes({children}){
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if(!isLoggedIn){
        return<Navigate to="/login" replace/>
    }
    return children;
}