"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Phone, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

type ViewState = "LOGIN" | "REGISTER_PHONE" | "OTP" | "REGISTER_SETUP" | "FORGOT_PHONE" | "FORGOT_OTP" | "FORGOT_RESET";

export function AuthPage() {
    const { login, register, checkUser, sendOTP, verifyOTP, resetPassword } = useAuth();
    const router = useRouter();

    const [view, setView] = useState<ViewState>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Form Data
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [otp, setOtp] = useState("");

    const resetForm = () => {
        setError("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setOtp("");
        setShowPassword(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!phone || !password) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        const result = await login(phone, password);
        if (result.success) {
            router.push("/profile");
        } else {
            setError(result.error || "Invalid phone or password");
        }
        setIsLoading(false);
    };

    // Step 1: Register - Check Phone & Send OTP
    const handleRegisterStep1 = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (phone.length < 10) {
            setError("Please enter a valid phone number");
            setIsLoading(false);
            return;
        }

        try {
            const exists = await checkUser(phone);
            if (exists) {
                setError("An account with this phone number already exists");
                setIsLoading(false);
                return;
            }

            await sendOTP(phone);
            setView("OTP");
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2: Verify OTP (Generic for Register & Forgot Password)
    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const isValid = await verifyOTP(phone, otp);
            if (isValid) {
                if (view === "OTP") {
                    setView("REGISTER_SETUP");
                } else if (view === "FORGOT_OTP") {
                    setView("FORGOT_RESET");
                }
            } else {
                setError("Invalid OTP");
            }
        } catch (err) {
            setError("Verification failed");
        } finally {
            setIsLoading(false);
        }
    };

    // Step 3: Setup Profile and Create Account
    const handleRegisterFinal = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!name || !password || !confirmPassword) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        const result = await register(name, phone, password);
        if (result.success) {
            router.push("/profile");
        } else {
            setError(result.error || "Registration failed");
        }
        setIsLoading(false);
    };

    // --- Forgot Password Handlers ---

    // Step 1: Check Phone & Send OTP for Forgot Password
    const handleForgotStep1 = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (phone.length < 10) {
            setError("Please enter a valid phone number");
            setIsLoading(false);
            return;
        }

        try {
            const exists = await checkUser(phone);
            if (!exists) {
                setError("No account found with this phone number");
                setIsLoading(false);
                return;
            }

            await sendOTP(phone);
            setView("FORGOT_OTP");
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Step 3: Reset Password
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!password || !confirmPassword) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const success = await resetPassword(phone, password);
            if (success) {
                resetForm(); // Clear form
                setView("LOGIN");
                // Optional: Show success message/toast here, or rely on user logging in
            } else {
                setError("Failed to reset password");
            }
        } catch (err) {
            setError("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4 py-8 bg-white/50">
            <Card className="w-full max-w-[400px] border-none shadow-none bg-transparent">
                <CardHeader className="space-y-4 text-center px-0 pb-8">

                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-slate-900">
                            {view === "LOGIN" && "Welcome Back!"}
                            {view === "REGISTER_PHONE" && "Create Account"}
                            {view === "OTP" && "Verify Verification"}
                            {view === "REGISTER_SETUP" && "Setup Profile"}
                            {view === "FORGOT_PHONE" && "Reset Password"}
                            {view === "FORGOT_OTP" && "Verify OTP"}
                            {view === "FORGOT_RESET" && "New Password"}
                        </CardTitle>
                        <CardDescription className="text-slate-500 text-sm">
                            {view === "LOGIN" && "Login to continue to Petzy"}
                            {view === "REGISTER_PHONE" && "Enter your phone number to start"}
                            {(view === "OTP" || view === "FORGOT_OTP") && `We sent a code to +91 ${phone}`}
                            {view === "REGISTER_SETUP" && "Just a few more details"}
                            {view === "FORGOT_PHONE" && "Enter your registered phone number"}
                            {view === "FORGOT_RESET" && "Create a new strong password"}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="px-0">

                    {/* LOGIN VIEW */}
                    {view === "LOGIN" && (
                        <form onSubmit={handleLogin} className="space-y-6">
                            {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg font-medium">{error}</div>}

                            <div className="space-y-4">
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        disabled={isLoading}
                                        className="pl-12 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-yellow-500/20 focus:border-yellow-500 font-medium text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={isLoading}
                                            className="pl-12 pr-12 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-yellow-500/20 focus:border-yellow-500 font-medium text-base"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                resetForm();
                                                setView("FORGOT_PHONE");
                                            }}
                                            className="text-sm font-semibold text-yellow-600 hover:text-yellow-700"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl text-base shadow-lg shadow-yellow-400/20 transition-all hover:scale-[1.02]" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "LOGIN"}
                            </Button>

                            <div className="text-center text-sm font-medium text-gray-500">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    className="text-yellow-600 hover:text-yellow-700 font-bold ml-1"
                                    onClick={() => {
                                        resetForm();
                                        setView("REGISTER_PHONE");
                                    }}
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                    )}

                    {/* REGISTER: PHONE INPUT */}
                    {view === "REGISTER_PHONE" && (
                        <form onSubmit={handleRegisterStep1} className="space-y-6">
                            {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">{error}</div>}

                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                                <Input
                                    id="reg-phone"
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    disabled={isLoading}
                                    className="pl-12 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-yellow-500/20 focus:border-yellow-500 font-medium text-base"
                                />
                            </div>

                            <Button type="submit" className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl text-base shadow-lg shadow-yellow-400/20 transition-all" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "CONTINUE"}
                            </Button>

                            <div className="text-center text-sm font-medium text-gray-500">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="text-yellow-600 hover:text-yellow-700 font-bold ml-1"
                                    onClick={() => {
                                        resetForm();
                                        setView("LOGIN");
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    )}

                    {/* FORGOT PASSWORD: PHONE INPUT */}
                    {view === "FORGOT_PHONE" && (
                        <form onSubmit={handleForgotStep1} className="space-y-6">
                            {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">{error}</div>}

                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                                <Input
                                    id="forgot-phone"
                                    type="tel"
                                    placeholder="Registered Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    disabled={isLoading}
                                    className="pl-12 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-yellow-500/20 focus:border-yellow-500 font-medium text-base"
                                />
                            </div>

                            <Button type="submit" className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl text-base shadow-lg shadow-yellow-400/20 transition-all" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "SEND OTP"}
                            </Button>

                            <div className="text-center text-sm font-medium text-gray-500">
                                <button
                                    type="button"
                                    className="text-gray-600 hover:text-gray-800 font-semibold"
                                    onClick={() => {
                                        resetForm();
                                        setView("LOGIN");
                                    }}
                                >
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    )}

                    {/* OTP VIEW (Generic) */}
                    {(view === "OTP" || view === "FORGOT_OTP") && (
                        <form onSubmit={handleVerifyOTP} className="space-y-6">
                            {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">{error}</div>}
                            <div className="space-y-2">
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="• • • •"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    disabled={isLoading}
                                    autoFocus
                                    className="h-14 text-center text-2xl tracking-[0.5em] font-bold bg-gray-50 border-gray-200 rounded-xl focus:ring-yellow-500/20 focus:border-yellow-500"
                                    maxLength={4}
                                />
                                <p className="text-xs text-gray-500 text-center font-medium">Mock OTP is 1234</p>
                            </div>

                            <Button type="submit" className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-400/20" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "VERIFY"}
                            </Button>
                        </form>
                    )}

                    {/* REGISTER: SETUP PROFILE */}
                    {view === "REGISTER_SETUP" && (
                        <form onSubmit={handleRegisterFinal} className="space-y-4">
                            {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">{error}</div>}

                            <div className="space-y-3">
                                <Input
                                    id="reg-name"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isLoading}
                                    className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-yellow-500/20 focus:border-yellow-500"
                                />
                                <Input
                                    id="reg-password"
                                    type="password"
                                    placeholder="Create Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-yellow-500/20 focus:border-yellow-500"
                                />
                                <Input
                                    id="reg-confirm"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={isLoading}
                                    className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-yellow-500/20 focus:border-yellow-500"
                                />
                            </div>

                            <Button type="submit" className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl mt-4 shadow-lg shadow-yellow-400/20" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "CREATE ACCOUNT"}
                            </Button>
                        </form>
                    )}

                    {/* FORGOT: RESET PASSWORD */}
                    {view === "FORGOT_RESET" && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">{error}</div>}

                            <div className="space-y-3">
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                                    <Input
                                        id="new-password"
                                        type="password"
                                        placeholder="New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                        className="pl-12 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-yellow-500/20 focus:border-yellow-500"
                                    />
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                                    <Input
                                        id="confirm-new-password"
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={isLoading}
                                        className="pl-12 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-yellow-500/20 focus:border-yellow-500"
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl mt-4 shadow-lg shadow-yellow-400/20" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "RESET PASSWORD"}
                            </Button>
                        </form>
                    )}

                </CardContent>
            </Card>
        </div>
    );
}
