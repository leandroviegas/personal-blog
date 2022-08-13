import React from "react";
import { navigate, useLocation } from "@reach/router"
import { useAuth } from "./hooks/Auth";
import validateCookies from "./utils/validateCookies"

const permissions = [
    {
        roles: ["admin"],
        route: "/admin",
        optionalFunction: (route: string) => route.startsWith("/admin")
    },
];

const RouteTreat = (route) => route.replace(new RegExp("/", 'g'), " ").trim().replace(new RegExp(" ", 'g'), "/").toLowerCase();

function Redirect({ children }) {
    const location = useLocation();
    const { cookies } = useAuth();

    const routePermissions = permissions.find(permission => permission.optionalFunction ? permission.optionalFunction(location.pathname) : RouteTreat(permission.route) === RouteTreat(location.pathname));

    if (routePermissions) {
        if (!validateCookies(cookies.authentication) || !routePermissions.roles.includes(cookies?.role || "")) {
            navigate('/');
            return <></>
        }
    }

    return children
};

export default Redirect