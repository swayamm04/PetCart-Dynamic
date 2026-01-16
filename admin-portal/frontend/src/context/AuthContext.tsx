"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
    _id: string;
    name: string;
    email?: string;
    phone: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => ({ success: false }),
    logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const storedUser = localStorage.getItem("petshop_admin_user");
        const token = localStorage.getItem("petshop_admin_token");
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (phone: string, password: string) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, password })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                if (data.user.role !== 'admin') {
                    return { success: false, error: "Access denied. Admins only." };
                }

                setUser(data.user);
                localStorage.setItem("petshop_admin_user", JSON.stringify(data.user));
                localStorage.setItem("petshop_admin_token", data.token);
                // Also set cookie for middleware if needed
                document.cookie = "admin_token=" + data.token + "; path=/";
                return { success: true };
            }
            return { success: false, error: data.message || "Invalid credentials" };
        } catch (error) {
            return { success: false, error: "Login failed" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("petshop_admin_user");
        localStorage.removeItem("petshop_admin_token");
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
