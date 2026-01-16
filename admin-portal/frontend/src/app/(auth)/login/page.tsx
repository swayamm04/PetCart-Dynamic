"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Phone, Loader2, Store } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        phone: "",
        password: ""
    })

    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const result = await login(formData.phone, formData.password);
        // Wait, typical admin uses email? The backend expects phone. 
        // Admin User in seed.js has phone: "9876543210".
        // I should probably update the form to accept Phone or just pass "email" input as phone if it looks like one, or just update the label.
        // Let's assume for now I will change the input to phone or keep it loose.

        if (result.success) {
            router.push("/dashboard")
            router.refresh()
        } else {
            setError(result.error || "Login failed")
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 relative">
            {/* Mobile Background Image (Visible only on small screens) */}
            <div className="absolute inset-0 z-0 lg:hidden">
                <img
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
                    alt="Pet Shop Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            </div>

            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8 relative z-10">
                <div className="w-full max-w-sm space-y-6 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 p-6 rounded-xl shadow-xl border lg:border-none lg:shadow-none lg:p-0 lg:bg-transparent">
                    <div className="flex flex-col space-y-2 text-center">
                        <div className="mx-auto h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                            <Store className="h-6 w-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your credentials to access the admin console
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="phone">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="9876543210"
                                    required
                                    disabled={isLoading}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="admin123"
                                    required
                                    disabled={isLoading}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                "inline-flex w-full items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                                "bg-primary text-primary-foreground h-10 px-4 py-2 hover:bg-primary/90"
                            )}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </button>
                    </form>

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <a href="#" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>

            {/* Right Side - Image/Banner */}
            <div className="hidden lg:flex flex-col justify-center p-12 relative bg-black text-white border-l overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
                        alt="Pet Shop Admin"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                <div className="max-w-lg mx-auto space-y-6 relative z-10">
                    <div className="flex items-center gap-2 mb-8">
                        <Store className="h-8 w-8 text-white" />
                        <span className="text-xl font-bold">Petzy Admin</span>
                    </div>
                    <blockquote className="space-y-2">
                        <p className="text-2xl font-serif">
                            &ldquo;The best way to predict the future is to create it. Manage your store with confidence and style.&rdquo;
                        </p>
                        <footer className="text-sm font-medium text-white/80">
                            &mdash; Petzy Team
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}
