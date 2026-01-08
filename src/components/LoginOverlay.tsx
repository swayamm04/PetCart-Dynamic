import React, { useState, useEffect } from "react";
import { X, Phone, ArrowRight, User, Lock, Eye, EyeOff, KeyRound, ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const LoginOverlay = () => {
    const { isLoginOpen, closeLogin, login, register, verifyResetOtp, resetPassword } = useAuth();
    const [view, setView] = useState<"LOGIN" | "REGISTER" | "FORGOT_PASSWORD">("LOGIN");

    // Common State
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Login Inputs
    const [loginPhone, setLoginPhone] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Register Inputs
    const [regName, setRegName] = useState("");
    const [regPhone, setRegPhone] = useState("");
    const [regPassword, setRegPassword] = useState("");

    // Forgot Password Inputs
    const [forgotStep, setForgotStep] = useState<"PHONE" | "VERIFY" | "RESET">("PHONE");
    const [forgotPhone, setForgotPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Reset state when closed
    useEffect(() => {
        if (!isLoginOpen) {
            const timer = setTimeout(() => {
                setView("LOGIN");
                setForgotStep("PHONE");
                setLoginPhone("");
                setLoginPassword("");
                setRegName("");
                setRegPhone("");
                setRegPassword("");
                setForgotPhone("");
                setOtp(["", "", "", ""]);
                setNewPassword("");
                setConfirmPassword("");
                setIsLoading(false);
                setShowPassword(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isLoginOpen]);

    if (!isLoginOpen) return null;

    // --- Handlers ---

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loginPhone.length !== 10) {
            toast.error("Please enter a valid 10-digit phone number");
            return;
        }
        if (!loginPassword) {
            toast.error("Please enter your password");
            return;
        }
        setIsLoading(true);
        try {
            await login(loginPhone, loginPassword);
            toast.success("Welcome back!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!regName.trim()) {
            toast.error("Name is required");
            return;
        }
        if (regPhone.length !== 10) {
            toast.error("Please enter a valid 10-digit phone number");
            return;
        }
        if (regPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        setIsLoading(true);
        try {
            await register(regPhone, regName, regPassword);
            toast.success("Account created successfully!");
            // Login happens automatically in context
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (forgotPhone.length !== 10) {
            toast.error("Please enter a valid phone number");
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setForgotStep("VERIFY");
            toast.success("OTP sent to your phone");
        }, 1000);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 4) {
            toast.error("Please enter the 4-digit OTP");
            return;
        }
        setIsLoading(true);
        try {
            await verifyResetOtp(forgotPhone, enteredOtp);
            setForgotStep("RESET");
            toast.success("OTP Verified! Please set a new password.");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Invalid OTP");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const validatePassword = (pwd: string) => {
        const minLength = pwd.length >= 8;
        const hasUpper = /[A-Z]/.test(pwd);
        const hasLower = /[a-z]/.test(pwd);
        const hasNumber = /[0-9]/.test(pwd);
        const hasSymbol = /[^A-Za-z0-9]/.test(pwd);

        return minLength && hasUpper && hasLower && hasNumber && hasSymbol;
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePassword(newPassword)) {
            toast.error("Password must contain 8+ chars, 1 uppercase, 1 lowercase, 1 number, and 1 symbol.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            const enteredOtp = otp.join("");
            await resetPassword(forgotPhone, enteredOtp, newPassword);
            toast.success("Password reset successfully! Please login.");
            setView("LOGIN");
            setForgotStep("PHONE");
            setLoginPhone(forgotPhone);
            setLoginPassword("");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to reset password");
            }
            setOtp(["", "", "", ""]); // Clear OTP on failure
        } finally {
            setIsLoading(false);
        }
    };

    // --- Render Helpers ---

    return (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
            <div className="absolute inset-0" onClick={closeLogin} />

            <div className="relative w-full md:max-w-md bg-white rounded-t-[2rem] md:rounded-[2rem] p-6 md:p-8 shadow-2xl animate-in slide-in-from-bottom-20 duration-500 overflow-hidden">
                <button
                    onClick={closeLogin}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-1.5 md:p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
                >
                    <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                </button>

                {/* LOGIN VIEW */}
                {view === "LOGIN" && (
                    <div className="space-y-4 md:space-y-6 pt-2 md:pt-4 text-center animate-in fade-in slide-in-from-right-10 duration-300">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-[#EFC41A]/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2">
                            <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="#EFC41A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        </div>
                        <div className="space-y-1 md:space-y-2">
                            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Welcome Back!</h2>
                            <p className="text-gray-500 text-xs md:text-sm font-medium">Login to continue to HomeRun</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-3 md:space-y-4 pt-2">
                            {/* Phone Input */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 font-bold group-focus-within:text-[#45a049] transition-colors">
                                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </div>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    value={loginPhone}
                                    onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ""))}
                                    placeholder="Phone Number"
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 font-bold text-gray-900 focus:outline-none focus:border-[#45a049] focus:bg-white transition-all text-sm md:text-lg"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#45a049] transition-colors">
                                    <Lock className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-10 md:pr-12 font-bold text-gray-900 focus:outline-none focus:border-[#45a049] focus:bg-white transition-all text-sm md:text-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                                </button>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setView("FORGOT_PASSWORD")}
                                    className="text-xs font-bold text-[#45a049] hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#45a049] hover:bg-[#388e3c] h-11 md:h-14 rounded-xl md:rounded-2xl font-black text-sm md:text-lg gap-2 shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                ) : "LOGIN"}
                            </Button>
                        </form>

                        <div className="pt-3 md:pt-4 border-t border-gray-100">
                            <p className="text-gray-500 text-xs md:text-sm font-medium">
                                Don't have an account?{" "}
                                <button onClick={() => setView("REGISTER")} className="text-[#45a049] font-black hover:underline">
                                    Create Account
                                </button>
                            </p>
                        </div>
                    </div>
                )}

                {/* REGISTER VIEW */}
                {view === "REGISTER" && (
                    <div className="space-y-4 md:space-y-6 pt-2 md:pt-4 text-center animate-in fade-in slide-in-from-right-10 duration-300">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 text-blue-500">
                            <User className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Create Account</h2>
                            <p className="text-gray-500 text-xs md:text-sm font-medium">Join us and start ordering!</p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-3 md:space-y-4 pt-2">
                            {/* Name Input */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                    <User className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <input
                                    type="text"
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                    placeholder="Full Name"
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-sm md:text-lg"
                                />
                            </div>

                            {/* Phone Input */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 font-bold group-focus-within:text-blue-500 transition-colors">
                                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </div>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    value={regPhone}
                                    onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ""))}
                                    placeholder="Phone Number"
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-sm md:text-lg"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                    <Lock className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    placeholder="Set Password"
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-10 md:pr-12 font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-sm md:text-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                                </button>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-500 hover:bg-blue-600 h-11 md:h-14 rounded-xl md:rounded-2xl font-black text-sm md:text-lg gap-2 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                ) : "CREATE ACCOUNT"}
                            </Button>
                        </form>

                        <div className="pt-3 md:pt-4 border-t border-gray-100">
                            <p className="text-gray-500 text-xs md:text-sm font-medium">
                                Already have an account?{" "}
                                <button onClick={() => setView("LOGIN")} className="text-blue-500 font-black hover:underline">
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                )}

                {/* FORGOT PASSWORD VIEW */}
                {view === "FORGOT_PASSWORD" && (
                    <div className="space-y-4 md:space-y-6 pt-2 md:pt-4 text-center animate-in fade-in slide-in-from-right-10 duration-300">
                        {/* Back Button */}
                        <button
                            onClick={() => {
                                if (forgotStep === "RESET") setForgotStep("VERIFY");
                                else if (forgotStep === "VERIFY") setForgotStep("PHONE");
                                else setView("LOGIN");
                            }}
                            className="absolute top-4 left-4 md:top-6 md:left-6 p-1.5 md:p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                        </button>

                        <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-50 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 text-orange-500">
                            <KeyRound className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                                {forgotStep === "RESET" ? "Set New Password" : "Reset Password"}
                            </h2>
                            <p className="text-gray-500 text-xs md:text-sm font-medium">
                                {forgotStep === "PHONE" && "Enter your phone number to get OTP"}
                                {forgotStep === "VERIFY" && "Enter the OTP sent to your phone"}
                                {forgotStep === "RESET" && "Create a strong password for your account"}
                            </p>
                        </div>

                        {forgotStep === "PHONE" && (
                            <form onSubmit={handleForgotPhoneSubmit} className="space-y-3 md:space-y-4 pt-2 md:pt-4">
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 font-bold group-focus-within:text-orange-500 transition-colors">
                                        <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </div>
                                    <input
                                        type="tel"
                                        maxLength={10}
                                        value={forgotPhone}
                                        onChange={(e) => setForgotPhone(e.target.value.replace(/\D/g, ""))}
                                        placeholder="Phone Number"
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 font-bold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm md:text-lg"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading || forgotPhone.length !== 10}
                                    className="w-full bg-orange-500 hover:bg-orange-600 h-11 md:h-14 rounded-xl md:rounded-2xl font-black text-sm md:text-lg gap-2 shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>GET OTP <ArrowRight className="w-4 h-4 md:w-5 md:h-5" /></>
                                    )}
                                </Button>
                            </form>
                        )}

                        {forgotStep === "VERIFY" && (
                            <form onSubmit={handleVerifyOtp} className="space-y-4 md:space-y-6 pt-2">
                                <div className="space-y-2">
                                    <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Enter OTP</label>
                                    <div className="flex justify-center gap-2 md:gap-3">
                                        {otp.map((digit, idx) => (
                                            <input
                                                key={idx}
                                                id={`otp-${idx}`}
                                                type="tel"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                                className="w-10 h-12 md:w-12 md:h-14 text-center bg-gray-50 border-2 border-gray-100 rounded-xl text-lg md:text-xl font-black text-orange-500 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[9px] md:text-[10px] text-gray-400 font-medium">Use 1234 as OTP</p>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-orange-500 hover:bg-orange-600 h-11 md:h-14 rounded-xl md:rounded-2xl font-black text-sm md:text-lg gap-2 shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>VERIFY OTP <ArrowRight className="w-4 h-4 md:w-5 md:h-5" /></>
                                    )}
                                </Button>
                            </form>
                        )}

                        {forgotStep === "RESET" && (
                            <form onSubmit={handleResetPassword} className="space-y-3 md:space-y-4 pt-2">
                                {/* New Password */}
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                        <Lock className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="New Password"
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-12 font-bold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm md:text-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                                    </button>
                                </div>
                                {/* Confirm Password */}
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                        <Lock className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 font-bold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm md:text-lg"
                                    />
                                </div>

                                <div className="text-left text-[9px] md:text-[10px] text-gray-400 space-y-1 font-medium bg-gray-50 p-2 md:p-3 rounded-xl border border-gray-100">
                                    <p className={newPassword.length >= 8 ? "text-green-500" : ""}>• 8+ characters</p>
                                    <p className={/[A-Z]/.test(newPassword) ? "text-green-500" : ""}>• One uppercase letter</p>
                                    <p className={/[a-z]/.test(newPassword) ? "text-green-500" : ""}>• One lowercase letter</p>
                                    <p className={/[0-9]/.test(newPassword) ? "text-green-500" : ""}>• One number</p>
                                    <p className={/[^A-Za-z0-9]/.test(newPassword) ? "text-green-500" : ""}>• One symbol</p>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-orange-500 hover:bg-orange-600 h-11 md:h-14 rounded-xl md:rounded-2xl font-black text-sm md:text-lg gap-2 shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : "COMPLETE RESET"}
                                </Button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginOverlay;
