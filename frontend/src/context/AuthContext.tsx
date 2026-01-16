"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, mockAuth, Address } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
    updateProfile: (data: { name: string }) => Promise<boolean>;
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
                // Check if we have a token (Optional: verify token with backend)
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
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, password })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                const userData = data.user;
                // Ensure addresses is initialized if missing
                if (!userData.addresses) userData.addresses = [];

                setUser(userData);
                localStorage.setItem("petshop_user", JSON.stringify(userData));
                localStorage.setItem("petshop_token", data.token);
                return { success: true };
            }
            return { success: false, error: data.message || "Invalid credentials" };
        } catch (error) {
            return { success: false, error: "Login failed. Check server." };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, phone: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, password })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                const userData = data.user;
                if (!userData.addresses) userData.addresses = [];

                setUser(userData);
                localStorage.setItem("petshop_user", JSON.stringify(userData));
                localStorage.setItem("petshop_token", data.token);
                return { success: true };
            }
            return { success: false, error: data.message || "Registration failed" };
        } catch (error) {
            return { success: false, error: "Registration failed" };
        } finally {
            setIsLoading(false);
        }
    };

    const checkUser = async (phone: string) => {
        try {
            const res = await fetch(`${API_URL}/auth/check-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone })
            });
            const data = await res.json();
            return data.exists;
        } catch (error) {
            console.error("Check user failed", error);
            return false;
        }
    };

    // Mocks for now (will implement SMS API later if needed)
    const sendOTP = async (phone: string) => {
        return await mockAuth.sendOTP(phone);
    };

    const verifyOTP = async (phone: string, otp: string) => {
        return await mockAuth.verifyOTP(phone, otp);
    };

    const resetPassword = async (phone: string, newPassword: string) => {
        try {
            const res = await fetch(`${API_URL}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, newPassword })
            });
            const data = await res.json();
            return data.success;
        } catch (error) {
            console.error("Reset password failed", error);
            return false;
        }
    };

    const updateProfile = async (data: { name: string }) => {
        if (!user) return false;
        try {
            const res = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: user.id, ...data })
            });
            const resData = await res.json();
            if (res.ok && resData.success) {
                const updatedUser = resData.user;
                // Ensure addresses persisted if backend doesn't return them fully populated (though backend route does)
                updatedUser.addresses = user.addresses;

                setUser(updatedUser);
                localStorage.setItem("petshop_user", JSON.stringify(updatedUser));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Update profile failed", error);
            return false;
        }
    };

    // --- Address Management (Local-only for now, sync later) ---
    // --- Address Management ---
    const addAddress = async (addressData: Omit<Address, 'id'>) => {
        if (!user) return false;
        try {
            const res = await fetch(`${API_URL}/users/${user.id}/addresses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addressData)
            });
            if (res.ok) {
                const updatedAddresses = await res.json();
                // Map _id to id for frontend consistency
                const mappedAddresses = updatedAddresses.map((addr: Address & { _id?: string }) => ({ ...addr, id: addr._id || addr.id }));

                const updatedUser = { ...user, addresses: mappedAddresses };
                setUser(updatedUser);
                localStorage.setItem("petshop_user", JSON.stringify(updatedUser));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to add address", error);
            return false;
        }
    };

    const updateAddress = async (id: string, addressData: Partial<Address>) => {
        if (!user) return false;
        try {
            const res = await fetch(`${API_URL}/users/${user.id}/addresses/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addressData)
            });
            if (res.ok) {
                const updatedAddresses = await res.json();
                const mappedAddresses = updatedAddresses.map((addr: Address & { _id?: string }) => ({ ...addr, id: addr._id || addr.id }));

                const updatedUser = { ...user, addresses: mappedAddresses };
                setUser(updatedUser);
                localStorage.setItem("petshop_user", JSON.stringify(updatedUser));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to update address", error);
            return false;
        }
    };

    const deleteAddress = async (id: string) => {
        if (!user) return false;
        try {
            const res = await fetch(`${API_URL}/users/${user.id}/addresses/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                const updatedAddresses = await res.json();
                const mappedAddresses = updatedAddresses.map((addr: Address & { _id?: string }) => ({ ...addr, id: addr._id || addr.id }));

                const updatedUser = { ...user, addresses: mappedAddresses };
                setUser(updatedUser);
                localStorage.setItem("petshop_user", JSON.stringify(updatedUser));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to delete address", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("petshop_user");
        localStorage.removeItem("petshop_token");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            login,
            register,
            logout,
            checkUser,
            sendOTP,
            verifyOTP,
            resetPassword,
            updateProfile,
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
