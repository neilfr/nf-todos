import React, {useContext} from 'react'
import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const RouteGuard = ({requiredRoles, children}) => {
    const {authed, roles} = useContext(AuthContext)
    console.log("roles", roles)
    if (!requiredRoles || requiredRoles.length === 0) return children
    const canAccess = roles.some(role => requiredRoles.includes(role))
    console.log('canAccess', canAccess)
    console.log('authed', authed)
    return (canAccess && (authed === true)) ? children : <Navigate to="/login" />
}

export default RouteGuard