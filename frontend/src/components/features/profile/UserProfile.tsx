"use client";

import { useState, useEffect } from "react";
import { MapPin, Shield, HelpCircle, Info, LogOut, ChevronRight, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Address } from "@/lib/mock-auth";
import { AddressForm } from "./AddressForm";
import { Loader2, Plus, Trash2 } from "lucide-react";

export function UserProfile() {
    const { user, logout, isLoading, addAddress, updateAddress, deleteAddress, updateProfile } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [isUpdatingName, setIsUpdatingName] = useState(false);
    const searchParams = useSearchParams();

    const [view, setView] = useState<'main' | 'addresses'>('main');
    const [showAddressDialog, setShowAddressDialog] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    // Password Change State
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [passData, setPassData] = useState({ phone: "", currentPassword: "", newPassword: "" });
    const [passLoading, setPassLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
        if (user) {
            setNewName(user.name);
        }

        // Handle Deep Linking
        const tab = searchParams.get('tab');
        const action = searchParams.get('action');
        const id = searchParams.get('id');

        if (tab === 'addresses') {
            setView('addresses');
            if (action === 'add') {
                resetForm();
                setShowAddressDialog(true);
            } else if (action === 'edit' && id && user?.addresses) {
                const addr = user.addresses.find(a => a.id === id);
                if (addr) {
                    openEditAddress(addr);
                }
            }
        }
    }, [user, isLoading, router, searchParams]);


    // handleLiveLocation was removed as it used undefined state

    const handleSaveAddress = async (data: any) => {
        if (editingAddress) {
            await updateAddress(editingAddress.id, data);
        } else {
            // New address logic
            // If it's the first address, it might become default automatically depending on backend, 
            // but we can ensure it here or rely on AuthContext.
            await addAddress(data);
        }
        setShowAddressDialog(false);
        resetForm();

        // Redirect if returnTo is present
        const returnTo = searchParams.get('returnTo');
        if (returnTo) {
            router.push(returnTo);
        }
    };

    const handleDeleteAddress = async (id: string) => {
        if (confirm("Are you sure you want to delete this address?")) {
            await deleteAddress(id);
        }
    };

    const resetForm = () => {
        setEditingAddress(null);
    };

    const openEditAddress = (addr: Address) => {
        setEditingAddress(addr);
        setShowAddressDialog(true);
    };

    if (isLoading || !user) {
        return null;
    }

    const menuItems = [
        { icon: MapPin, label: "Saved Addresses", href: "#" },
    ];

    const handleUpdateName = async () => {
        if (!newName.trim()) return;
        setIsUpdatingName(true);
        const success = await updateProfile({ name: newName });
        setIsUpdatingName(false);
        if (success) {
            setIsEditing(false);
        } else {
            alert("Failed to update name");
        }
    };

    const preferenceItems = [
        { icon: Shield, label: "Privacy & Security", href: "#" },
    ];



    const handleChangePassword = async () => {
        if (!passData.phone || !passData.currentPassword || !passData.newPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (!/^\d{10}$/.test(passData.phone)) {
            alert("Phone number must be exactly 10 digits");
            return;
        }

        setPassLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${API_URL}/auth/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(passData)
            });
            const data = await res.json();
            if (res.ok) {
                alert("Password changed successfully");
                setIsPasswordOpen(false);
                setPassData({ phone: "", currentPassword: "", newPassword: "" });
            } else {
                alert(data.message || "Failed to change password");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setPassLoading(false);
        }
    };

    const supportItems = [
        { icon: HelpCircle, label: "Help & Support", href: "#" },
        { icon: Info, label: "About Petzy", href: "#" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">

            {/* User Card */}
            <div className="bg-white px-4 pt-4 pb-6 mb-4 shadow-sm rounded-b-[2rem] relative z-10">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-[#FEFCE8] rounded-3xl p-6 flex items-center justify-between shadow-sm border border-yellow-50">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#FEF9C3] rounded-2xl flex items-center justify-center text-[#CA8A04] font-bold text-2xl shadow-inner">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-black text-[#1E1E1E] uppercase tracking-wide">{user.name}</h2>
                                    <Dialog open={isEditing} onOpenChange={setIsEditing}>
                                        <DialogTrigger asChild>
                                            <button className="text-gray-400 hover:text-yellow-600 transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Name</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <Input
                                                    value={newName}
                                                    onChange={(e) => setNewName(e.target.value)}
                                                    placeholder="Enter full name"
                                                    className="focus:ring-yellow-500"
                                                />
                                                <Button
                                                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                                                    onClick={handleUpdateName}
                                                    disabled={isUpdatingName}
                                                >
                                                    {isUpdatingName ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <p className="text-sm font-semibold text-gray-500 tracking-wider">+91 {user.phone}</p>
                            </div>
                        </div>
                        {/* Decorative Circle */}
                        <div className="w-24 h-24 bg-white/20 rounded-full blur-2xl absolute right-10 top-0 pointer-events-none"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-xl mx-auto px-4 space-y-6">

                {view === 'addresses' ? (
                    <div>
                        <button
                            onClick={() => setView('main')}
                            className="flex items-center gap-2 text-gray-500 hover:text-black mb-4 transition-colors p-2 -ml-2 rounded-lg hover:bg-gray-100 w-fit"
                        >
                            <ChevronRight className="w-4 h-4 rotate-180" />
                            <span className="font-bold text-sm">Back to Profile</span>
                        </button>

                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-neutral-900">Saved Addresses</h3>
                            <Button
                                onClick={() => { resetForm(); setShowAddressDialog(true); }}
                                className="bg-black text-white hover:bg-neutral-800 text-xs gap-2 rounded-xl"
                            >
                                <Plus className="w-3 h-3" /> Add New
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {user.addresses?.length === 0 ? (
                                <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
                                    <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 font-medium text-sm">No saved addresses yet</p>
                                </div>
                            ) : (
                                user.addresses?.map((addr, idx) => (
                                    <div
                                        key={addr.id || `addr-${idx}`}
                                        onClick={async () => {
                                            const returnTo = searchParams.get('returnTo');
                                            if (returnTo) {
                                                // Make this address default or just proceed?
                                                // Assuming we want to use this address.
                                                // Ideally call updateAddress to set isDefault=true if backend supports, 
                                                // OR just redirect.
                                                // For now, let's just redirect.
                                                router.push(returnTo);
                                            }
                                        }}
                                        className={cn(
                                            "bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between group cursor-pointer hover:border-yellow-400 transition-all",
                                            searchParams.get('returnTo') && "hover:bg-yellow-50/50"
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 mt-1">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-sm text-neutral-900">{addr.type}</span>
                                                    {addr.isDefault && <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold">Default</span>}
                                                </div>
                                                <p className="text-xs text-gray-500 leading-relaxed">
                                                    {addr.street}, {addr.city}<br />
                                                    {addr.state} - {addr.zip}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => openEditAddress(addr)}
                                                className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-black transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAddress(addr.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Add/Edit Address Dialog */}
                        <Dialog
                            open={showAddressDialog}
                            onOpenChange={(open) => {
                                setShowAddressDialog(open);
                                if (!open) {
                                    // CLEAR URL PARAMS ON CLOSE
                                    const newUrl = new URL(window.location.href);
                                    newUrl.searchParams.delete('action');
                                    newUrl.searchParams.delete('id');
                                    window.history.replaceState({}, '', newUrl.toString());
                                }
                            }}
                        >
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
                                </DialogHeader>
                                <AddressForm
                                    initialData={editingAddress}
                                    onSave={handleSaveAddress}
                                    onCancel={() => setShowAddressDialog(false)}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                ) : (
                    <>
                        {/* Account Section */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">My Account</h3>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {menuItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            if (item.label === "Saved Addresses") setView('addresses');
                                            else router.push(item.href);
                                        }}
                                        className={cn(
                                            "flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group cursor-pointer",
                                            idx !== menuItems.length - 1 && "border-b border-gray-100"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-gray-700">{item.label}</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-yellow-600 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Preferences Section */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Preferences</h3>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {preferenceItems.map((item, idx) => {
                                    if (item.label === "Privacy & Security") {
                                        return (
                                            <Dialog key={idx} open={isPasswordOpen} onOpenChange={setIsPasswordOpen}>
                                                <DialogTrigger asChild>
                                                    <div className={cn(
                                                        "flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group cursor-pointer",
                                                        idx !== preferenceItems.length - 1 && "border-b border-gray-100"
                                                    )}>
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                                                                <item.icon className="w-5 h-5" />
                                                            </div>
                                                            <span className="font-bold text-gray-700">{item.label}</span>
                                                        </div>
                                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-yellow-600 transition-colors" />
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Change Password</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium">Phone Number</label>
                                                            <Input
                                                                value={passData.phone}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    if (val.length <= 10) {
                                                                        setPassData({ ...passData, phone: val });
                                                                    }
                                                                }}
                                                                placeholder="Enter your phone number"
                                                                type="number"
                                                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium">Current Password</label>
                                                            <Input
                                                                type="password"
                                                                value={passData.currentPassword}
                                                                onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                                                                placeholder="Enter current password"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium">New Password</label>
                                                            <Input
                                                                type="password"
                                                                value={passData.newPassword}
                                                                onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                                                                placeholder="Enter new password"
                                                            />
                                                        </div>
                                                        <Button
                                                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                                                            onClick={handleChangePassword}
                                                            disabled={passLoading}
                                                        >
                                                            {passLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                            Update Password
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        )
                                    }
                                    return (
                                        <Link
                                            key={idx}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group",
                                                idx !== preferenceItems.length - 1 && "border-b border-gray-100"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <span className="font-bold text-gray-700">{item.label}</span>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-yellow-600 transition-colors" />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Support Section */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Support</h3>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {supportItems.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group",
                                            idx !== supportItems.length - 1 && "border-b border-gray-100"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-gray-700">{item.label}</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-yellow-600 transition-colors" />
                                    </Link>
                                ))}
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 group-hover:bg-red-100 transition-colors">
                                            <LogOut className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-red-500">Logout</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
