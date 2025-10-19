import { createContext, useState, useEffect, useContext } from "react";
import { getUserProfile, loginUser, registerUser, logoutUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserProfile();
                setUser(data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            await loginUser(credentials);
            const data = await getUserProfile();
            setUser(data.user);
            return { success: true, data };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error };
        }
    };

    const register = async (credentials) => {
        try {
            await registerUser(credentials);
            const data = await getUserProfile();
            setUser(data.user);
            return { success: true, data };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error };
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error };
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};