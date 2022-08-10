import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import api from "../services/api";
import { User } from "../types/blog.type";

type AuthContextType = {
    user?: User;
    cookies: {
        authentication?: any;
    };
    signOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signIn: (usernameOrEmail: string, password: string) => Promise<void>;
    signUp: (username: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
    children: ReactNode
}

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>()

    const [cookies, setCookie, removeCookie] = useCookies(['authentication']);

    useEffect(() => {
        if (cookies.authentication) {
            if (String(cookies.authentication).split(".").length === 3) {
                api.get("/login", { headers: { authorization: `Bearer ${cookies.authentication}` } }).then(response => {
                    setUser(response.data.user);
                }).catch(err => { console.error(err) })
            } else {
                signOut()
            }
        } else {
            signOut();
        }
    }, [])

    async function signInWithGoogle() {

    }

    async function signIn(usernameOrEmail: string, password: string) {
        return api.post("/login", { usernameOrEmail, password }).then(response => {
            setUser(response.data.user);
            setCookie("authentication", response.data.token, { path: '/' });
        }).catch(err => { console.error(err); throw err; })
    }

    async function signUp(username: string, email: string, password: string) {
        return api.post("/users", { username, password, email, link: username, profilePicture: "" }).then(() => {
            return signIn(username, password)
        }).catch(err => { console.error(err); throw err })
    }

    async function signOut() {
        setUser(undefined);
        removeCookie("authentication");
    }

    return (
        <AuthContext.Provider value={{ user, cookies, signInWithGoogle, signUp, signIn, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}