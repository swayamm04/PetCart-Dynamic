"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, mockAuth, Address } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (name: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    checkUser: (phone: string) => Promise<boolean>;
    sendOTP: (phone: string) => Promise<boolean>;
    verifyOTP: (phone: string, otp: string) => Promise<boolean>;
    resetPassword: (phone: string, newPassword: string) => Promise<boolean>;
    addAddress: (address: Omit<Address, 'id'>) => Promise<boolean>;
    updateAddress: (id: string, address: Partial<Address>) => Promise<boolean>;
    deleteAddress: (id: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Check for saved session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const storedUser = localStorage.getItem("petshop_user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Session check failed", error);
            } finally {
                setIsLoading(false);
            }
        };
        checkSession();
    }, []);

    const login = async (phone: string, password: string) => {
        setIsLoading(true);
        try {
            const user = await mockAuth.login(phone, password);
            if (user) {
                setUser(user);
                localStorage.setItem("petshop_user", JSON.stringify(user));
                return { success: true };
            }
            return { success: false, error: "Invalid credentials" };
        } catch (error) {
            return { success: false, error: "Login failed" };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, phone: string, password: string) => {
        setIsLoading(true);
        try {
            const newUser = await mockAuth.register({ name, phone, password });
            setUser(newUser);
            localStorage.setItem("petshop_user", JSON.stringify(newUser));
            return { success: true };
        } catch (error) {
            return { success: false, error: "Registration failed" };
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (phone: string, newPassword: string) => {
        setIsLoading(true);
        try {
            return await mockAuth.resetPassword(phone, newPassword);
        } catch (error) {
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const addAddress = async (addressData: Omit<Address, 'id'>) => {
        if (!user) return false;
        const newAddress: Address = {
            ...addressData,
            id: Math.random().toString(36).substr(2, 9)
        };
        const updatedUser = { ...user, addresses: [...(user.addresses || []), newAddress] };
        setUser(updatedUser);
        localStorage.setItem("petshop_user", JSON.stringify(updatedUser));
        return true;
    };

    const updateAddress = async (id: string, addressData: Partial<Address>) => {
        if (!user) return false;
        const updatedAddresses = user.addresses.map(addr =>
            addr.id === id ? { ...addr, ...addressData } : addr
        );
        const updatedUser = { ...user, addresses: updatedAddresses };
        setUser(updatedUser);
        localStorage.setItem("petshop_user", JSON.stringify(updatedUser));
        return true;
    };

    const deleteAddress = async (id: string) => {
        if (!user) return false;
        const updatedAddresses = user.addresses.filter(addr => addr.id !== id);
        const updatedUser = { ...user, addresses: updatedAddresses };
        setUser(updatedUser);
        localStorage.setItem("petshop_user", JSON.stringify(updatedUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("petshop_user");
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            login,
            register,
            logout,
            checkUser: mockAuth.checkUserExists,
            sendOTP: mockAuth.sendOTP,
            verifyOTP: mockAuth.verifyOTP,
            resetPassword,
            addAddress,
            updateAddress,
            deleteAddress
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
