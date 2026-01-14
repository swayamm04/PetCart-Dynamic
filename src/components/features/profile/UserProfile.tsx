"use client";

import { useState, useEffect } from "react";
import { User, MapPin, CreditCard, Bell, Shield, Settings, HelpCircle, Info, LogOut, ChevronRight, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Address } from "@/lib/mock-auth";
import { Loader2, Plus, Trash2, Navigation } from "lucide-react";

export function UserProfile() {
    const { user, logout, isLoading, addAddress, updateAddress, deleteAddress } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");

    // Address Management State
    const [view, setView] = useState<'main' | 'addresses'>('main');
    const [showAddressDialog, setShowAddressDialog] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [addressForm, setAddressForm] = useState({
        type: "Home" as "Home" | "Work" | "Other",
        street: "",
        city: "",
        state: "",
        zip: ""
    });

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
        if (user) {
            setNewName(user.name);
        }
    }, [user, isLoading, router]);


    const handleLiveLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setIsLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    // Using OpenStreetMap Nominatim API for better accuracy
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();

                    const addr = data.address;
                    setAddressForm(prev => ({
                        ...prev,
                        street: [addr.road, addr.suburb, addr.neighbourhood].filter(Boolean).join(", "),
                        city: addr.city || addr.town || addr.village || addr.county || "",
                        state: addr.state || "",
                        zip: addr.postcode || ""
                    }));
                } catch (error) {
                    console.error("Error fetching location", error);
                    alert("Failed to fetch address details");
                } finally {
                    setIsLoadingLocation(false);
                }
            },
            (error) => {
                console.error("Error getting location", error);
                setIsLoadingLocation(false);
                alert("Please enable location services");
            }
        );
    };

    const handleSaveAddress = async () => {
        if (editingAddress) {
            await updateAddress(editingAddress.id, addressForm);
        } else {
            await addAddress(addressForm);
        }
        setShowAddressDialog(false);
        resetForm();
    };

    const handleDeleteAddress = async (id: string) => {
        if (confirm("Are you sure you want to delete this address?")) {
            await deleteAddress(id);
        }
    };

    const resetForm = () => {
        setEditingAddress(null);
        setAddressForm({
            type: "Home",
            street: "",
            city: "",
            state: "",
            zip: ""
        });
    };

    const openEditAddress = (addr: Address) => {
        setEditingAddress(addr);
        setAddressForm({
            type: addr.type,
            street: addr.street,
            city: addr.city,
            state: addr.state,
            zip: addr.zip
        });
        setShowAddressDialog(true);
    };

    if (isLoading || !user) {
        return null;
    }

    const menuItems = [
        { icon: MapPin, label: "Saved Addresses", href: "#" },
        { icon: CreditCard, label: "Payment Methods", href: "#" },
        { icon: Bell, label: "Notifications", href: "#" },
    ];

    const preferenceItems = [
        { icon: Shield, label: "Privacy & Security", href: "#" },
        { icon: Settings, label: "App Settings", href: "#" },
    ];

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
                                                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold" onClick={() => setIsEditing(false)}>
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
                                user.addresses?.map((addr) => (
                                    <div key={addr.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between group">
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
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                        <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="flex gap-2">
                                        {['Home', 'Work', 'Other'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setAddressForm(prev => ({ ...prev, type: type as any }))}
                                                className={cn(
                                                    "flex-1 py-2 text-xs font-bold rounded-xl border transition-all",
                                                    addressForm.type === type
                                                        ? "bg-black text-white border-black"
                                                        : "bg-white text-gray-500 border-gray-200 hover:border-black"
                                                )}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={handleLiveLocation}
                                        disabled={isLoadingLocation}
                                        className="w-full bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200 gap-2"
                                    >
                                        {isLoadingLocation ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-3 h-3" />}
                                        Use Current Location
                                    </Button>

                                    <div className="space-y-3">
                                        <Input
                                            value={addressForm.street}
                                            onChange={(e) => setAddressForm(prev => ({ ...prev, street: e.target.value }))}
                                            placeholder="Street Address / Flat No."
                                            className="bg-gray-50 border-gray-200 focus:ring-black"
                                        />
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input
                                                value={addressForm.city}
                                                onChange={(e) => setAddressForm(prev => ({ ...prev, city: e.target.value }))}
                                                placeholder="City"
                                                className="bg-gray-50 border-gray-200 focus:ring-black"
                                            />
                                            <Input
                                                value={addressForm.state}
                                                onChange={(e) => setAddressForm(prev => ({ ...prev, state: e.target.value }))}
                                                placeholder="State"
                                                className="bg-gray-50 border-gray-200 focus:ring-black"
                                            />
                                        </div>
                                        <Input
                                            value={addressForm.zip}
                                            onChange={(e) => setAddressForm(prev => ({ ...prev, zip: e.target.value }))}
                                            placeholder="ZIP / Pincode"
                                            className="bg-gray-50 border-gray-200 focus:ring-black"
                                        />
                                    </div>

                                    <Button
                                        onClick={handleSaveAddress}
                                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                                    >
                                        Save Address
                                    </Button>
                                </div>
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
                                {preferenceItems.map((item, idx) => (
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
                                ))}
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
