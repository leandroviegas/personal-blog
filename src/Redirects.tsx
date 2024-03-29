import React from "react";
import { navigate } from "gatsby";
import { useAuth } from "@hooks/useAuth";

import { BiLoaderAlt } from "react-icons/bi"

import validateCookies from "@utils/validateCookies"

const permissions = [
    {
        roles: ["admin", "writer", "user"],
        route: "/dashboard/customize-profile",
        valid: (route: string) => route.split("/").filter(n => n).join("/") === "dashboard/customize-profile"
    },
    {
        roles: ["admin"],
        route: "/dashboard",
        valid: (route: string) => route.startsWith("/dashboard")
    },
];

const RouteTreat = (route) => route.replace(new RegExp("/", 'g'), " ").trim().replace(new RegExp(" ", 'g'), "/").toLowerCase();

export function Admin({ children }) {
    const { cookies } = useAuth();

    const location = typeof window !== "undefined" ? window.location : { pathname: "/" };

    const routePermissions = permissions.find(permission => permission.valid ? permission.valid(location.pathname) : RouteTreat(permission.route) === RouteTreat(location.pathname));

    let hasPermission = true;

    if (routePermissions) {
        hasPermission = validateCookies(cookies?.authentication);
        hasPermission = hasPermission && routePermissions.roles.includes(cookies?.role || "");
    }

    if (typeof window !== "undefined")
        !hasPermission && navigate("/")

    return hasPermission ? children : (
        <div className="fixed h-screen w-screen top-0 left-0 flex items-center jusfify-center bg-white">
            <BiLoaderAlt className="w-[10vw] h-[10vh] max-w-[8em] animate-spin fill-zinc-800 mx-auto" />
        </div>
    )
};