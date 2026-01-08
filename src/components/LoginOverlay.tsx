import React, { useState, useEffect } from "react";
import { X, Phone, ArrowRight, ShieldCheck, CheckCircle2, User } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const LoginOverlay = () => {
    const { isLoginOpen, closeLogin, checkUser, verifyOtp, completeRegistration, registrationRequired } = useAuth();
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: Register
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isLoginOpen) {
            setStep(1);
            setPhone("");
            setOtp(["", "", "", ""]);
            setName("");
            setPhoto(null);
        }
    }, [isLoginOpen]);

    useEffect(() => {
        if (registrationRequired) {
            setStep(3);
        }
    }, [registrationRequired]);

    if (!isLoginOpen) return null;

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length !== 10) {
            toast.error("Please enter a valid 10-digit phone number");
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            checkUser(phone);
            setStep(2);
            toast.success("OTP sent to your phone!");
        }, 800);
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

    const handleVerifyOtp = () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 4) return;

        setIsLoading(true);
        setTimeout(() => {
            try {
                verifyOtp(enteredOtp);
                if (!registrationRequired) {
                    setIsLoading(false);
                }
            } catch (error: any) {
                setIsLoading(false);
                toast.error(error.message);
                setOtp(["", "", "", ""]);
                document.getElementById("otp-0")?.focus();
            }
        }, 1000);
    };

    const handleRegister = () => {
        if (!name.trim()) {
            toast.error("Please enter your name");
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            completeRegistration(name, photo || undefined);
            toast.success("Welcome to HomeRun!", {
                icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
            });
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
            <div className="absolute inset-0" onClick={closeLogin} />

            <div className="relative w-full md:max-w-md bg-white rounded-t-[2.5rem] md:rounded-[2rem] p-8 shadow-2xl animate-in slide-in-from-bottom-20 duration-500">
                <button
                    onClick={closeLogin}
                    className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {step === 1 && (
                    <div className="space-y-6 pt-4 text-center">
                        <div className="w-16 h-16 bg-[#EFC41A]/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EFC41A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Welcome back!</h2>
                            <p className="text-gray-500 text-sm font-medium">Enter your phone number to login or join HomeRun.</p>
                        </div>

                        <form onSubmit={handleSendOtp} className="space-y-4 pt-4">
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 font-bold group-focus-within:text-[#45a049] transition-colors">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm">+91</span>
                                </div>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                                    placeholder="Enter Phone Number"
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-4 pl-16 pr-4 font-bold text-gray-900 focus:outline-none focus:border-[#45a049] focus:bg-white transition-all tracking-widest text-lg"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={phone.length !== 10 || isLoading}
                                className="w-full bg-[#45a049] hover:bg-[#388e3c] h-14 rounded-2xl font-black text-lg gap-2 shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>CONTINUE <ArrowRight className="w-5 h-5" /></>
                                )}
                            </Button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 pt-4 text-center">
                        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-2 font-bold text-[#45a049]">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Verify OTP</h2>
                            <p className="text-gray-500 text-sm font-medium">
                                Code sent to <span className="text-gray-900 font-bold">+91 {phone}</span>
                                <br /><span className="text-[10px] text-gray-400">(Enter 1234 for success, 0000 for error)</span>
                            </p>
                        </div>

                        <div className="flex justify-center gap-3 pt-4">
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    id={`otp-${idx}`}
                                    type="tel"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                                    className="w-14 h-16 text-center bg-gray-50 border-2 border-gray-100 rounded-xl text-2xl font-black text-[#45a049] focus:outline-none focus:border-[#45a049] focus:bg-white transition-all"
                                />
                            ))}
                        </div>

                        <Button
                            onClick={handleVerifyOtp}
                            disabled={otp.some(d => !d) || isLoading}
                            className="w-full bg-[#45a049] hover:bg-[#388e3c] h-14 rounded-2xl font-black text-lg gap-2 shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                            ) : "VERIFY & LOGIN"}
                        </Button>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 pt-4 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 border-4 border-[#45a049]/10 relative group overflow-hidden">
                            {photo ? (
                                <img src={photo} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-8 h-8 text-gray-400" />
                            )}
                            <button
                                onClick={() => setPhoto("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop")}
                                className="absolute bottom-0 left-0 right-0 py-1 bg-black/60 text-[8px] text-white font-bold opacity-0 group-hover:opacity-100 transition-all"
                            >
                                UPLOAD
                            </button>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Finishing up!</h2>
                            <p className="text-gray-500 text-sm font-medium">Please enter your name to complete registration.</p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:border-[#45a049] focus:bg-white transition-all text-lg"
                            />

                            <Button
                                onClick={handleRegister}
                                disabled={!name.trim() || isLoading}
                                className="w-full bg-[#45a049] hover:bg-[#388e3c] h-14 rounded-2xl font-black text-lg gap-2 shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                ) : "COMPLETE PROFILE"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginOverlay;
