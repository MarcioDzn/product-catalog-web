import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { User } from "../types/Users";
import { getMe } from "../services/users";

type AuthContextData = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    logout: () => void;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    async function refreshUser() {
        const token = localStorage.getItem("access_token");

        if (!token) {
            setUser(null);
            return;
        }

        try {
            const userData = await getMe();

            setUser(userData);
        } catch {
            localStorage.removeItem("access_token");
            setUser(null);
        }
    }

    useEffect(() => {
        async function initializeAuth() {
            try {
                await refreshUser();
            } finally {
                setIsLoading(false);
            }
        }

        initializeAuth();
    }, []);

    function logout() {
        localStorage.removeItem("access_token");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                isLoading,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth deve ser usado dentro de um AuthProvider"
        );
    }

    return context;
}
