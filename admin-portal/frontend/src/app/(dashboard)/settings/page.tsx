"use client"

import { useState } from "react"
import { Loader2, Lock, ShieldCheck } from "lucide-react"

export default function SettingsPage() {
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        phone: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.newPassword !== formData.confirmPassword) {
            alert("New passwords do not match")
            return
        }

        if (formData.newPassword.length < 6) {
            alert("Password must be at least 6 characters")
            return
        }

        setSaving(true)
        try {
            const res = await fetch(`${API_URL}/auth/admin-update-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: formData.phone,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            })

            const data = await res.json()

            if (res.ok) {
                alert("Password updated successfully")
                setFormData({
                    phone: "",
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                })
            } else {
                alert(data.message || "Failed to update password")
            }
        } catch (error) {
            console.error("Error updating password", error)
            alert("An error occurred")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="max-w-2xl space-y-6">
                <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>

                <form onSubmit={handleUpdatePassword} className="grid gap-6">

                    {/* Security Settings */}
                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                        <div className="flex items-center gap-2 border-b pb-2">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Security & Password</h3>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            To update your password, please verify your phone number and current password.
                        </p>

                        <div className="grid gap-4 mt-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter registered phone number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Current Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter current password"
                                    value={formData.currentPassword}
                                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        value={formData.newPassword}
                                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-8 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
