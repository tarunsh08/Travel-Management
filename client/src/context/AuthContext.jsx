import { createContext, useState, useEffect, useContext } from "react";
import { getUserProfile, loginUser, registerUser } from "../api/auth";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserProfile()
                setUser(data.user)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    const login = async (credentials) => {
        try {
            await loginUser(credentials);
            const data = await getUserProfile();
            setUser(data.user);
            return Promise.resolve();
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    const register = async (credentials) => {
        try {
            await registerUser(credentials);
            const data = await getUserProfile();
            setUser(data.user);
            return Promise.resolve();
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{user, loading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);