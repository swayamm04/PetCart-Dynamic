import React, { useState, useEffect } from "react";
import {
    MapPin, Settings, HelpCircle, LogOut, ChevronRight,
    UserCircle2, Wallet, Gift, Bell, CreditCard, ShieldCheck,
    Pencil, Check, X, Info, ChevronLeft
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ProfileProps {
    initialView?: 'main' | 'addresses';
    view?: 'main' | 'addresses';
    onViewChange?: (view: 'main' | 'addresses') => void;
}

const Profile = ({ initialView = 'main', view: externalView, onViewChange }: ProfileProps) => {
    const { user, isAuthenticated, openLogin, logout, updateProfile, addAddress, selectAddress, location, detectLocation } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(user?.name || "");

    // Internal state mainly if external state isn't provided (fallback)
    const [internalView, setInternalView] = useState<'main' | 'addresses'>(initialView);
    const view = externalView || internalView;

    const setView = (v: 'main' | 'addresses') => {
        if (onViewChange) {
            onViewChange(v);
        } else {
            setInternalView(v);
        }
    };

    useEffect(() => {
        if (externalView) setInternalView(externalView);
    }, [externalView]);

    // Address UI State
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [newAddress, setNewAddress] = useState({
        pincode: "",
        houseNo: "",
        area: "",
        landmark: "",
        type: "Home" as "Home" | "Work" | "Other"
    });
    const [isDetecting, setIsDetecting] = useState(false);

    useEffect(() => {
        if (user) setNewName(user.name || "");
    }, [user]);

    const handleUpdateName = () => {
        if (newName.trim()) {
            updateProfile(newName.trim());
            setIsEditing(false);
        }
    };

    const handleSaveAddress = () => {
        if (!newAddress.pincode || !newAddress.area || !newAddress.houseNo) {
            return; // Basic validation
        }
        addAddress(newAddress);
        setShowAddAddress(false);
        setNewAddress({ pincode: "", houseNo: "", area: "", landmark: "", type: "Home" });
    };

    const handleDetectLocation = async () => {
        setIsDetecting(true);
        try {
            await detectLocation();
            setTimeout(() => {
                // We rely on the toast in detectLocation for feedback
            }, 100);
        } catch (e) {
            // Error handled in context
        } finally {
            setIsDetecting(false);
        }
    };

    // Hook to auto-fill form if global location changes while adding address
    React.useEffect(() => {
        if (showAddAddress && location && isDetecting === false) {
            setNewAddress(prev => ({
                ...prev,
                pincode: location.pincode,
                area: location.area,
                landmark: location.landmark,
                // Keep existing houseNo/type
            }));
        }
    }, [location, showAddAddress]);


    if (!isAuthenticated) {
        return (
            <div className="bg-gray-50 flex flex-col items-center justify-center animate-in fade-in duration-300 min-h-[calc(100vh-180px)] p-6 text-center mb-20 px-4 py-12">
                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 max-w-sm w-full space-y-4 md:space-y-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#45a049]/10 rounded-full flex items-center justify-center mx-auto">
                        <UserCircle2 className="w-8 h-8 md:w-10 md:h-10 text-[#45a049]" />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Your Account</h2>
                        <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">
                            Log in to track orders, manage addresses, and enjoy a faster checkout experience.
                        </p>
                    </div>
                    <Button
                        onClick={openLogin}
                        className="w-full bg-[#45a049] hover:bg-[#388e3c] h-12 md:h-14 rounded-2xl font-black text-sm md:text-lg shadow-lg shadow-green-100 uppercase tracking-wider transition-all active:scale-95"
                    >
                        Login / Signup
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 flex flex-col animate-in fade-in duration-300 min-h-[calc(100vh-200px)] mb-32 px-3 py-4 md:px-4 md:py-6 text-gray-900">
            <div className="max-w-md mx-auto w-full space-y-4 md:space-y-6">

                {view === 'addresses' ? (
                    <div className="space-y-4 md:space-y-6 animate-in slide-in-from-right duration-300">
                        <div className="flex items-center gap-2 mb-2 md:mb-4">
                            <button
                                onClick={() => setView('main')}
                                className="p-1.5 md:p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-600 hover:text-gray-900"
                            >
                                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                            <h2 className="text-lg md:text-xl font-black text-gray-900">Saved Addresses</h2>
                        </div>

                        {/* Address Management (Moved here) */}
                        <div>
                            <div className="flex items-center justify-between mb-2 px-2">
                                <h3 className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Manage Locations</h3>
                                <button
                                    onClick={() => setShowAddAddress(!showAddAddress)}
                                    className="text-[9px] md:text-[10px] font-black text-[#45a049] uppercase tracking-wider hover:underline"
                                >
                                    {showAddAddress ? "Cancel" : "+ Add New"}
                                </button>
                            </div>

                            {showAddAddress && (
                                <div className="bg-white p-4 md:p-5 rounded-[2rem] border border-[#45a049]/20 shadow-lg shadow-green-50 mb-3 md:mb-4 animate-in slide-in-from-top-4 space-y-3 md:space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-gray-900 text-sm md:text-base">Add New Address</h4>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-[10px] md:text-xs h-7 md:h-8 gap-1.5 rounded-xl border-[#45a049] text-[#45a049] hover:bg-[#45a049]/10"
                                            onClick={handleDetectLocation}
                                            disabled={isDetecting}
                                        >
                                            {isDetecting ? <div className="animate-spin w-3 h-3 border-2 border-current border-t-transparent rounded-full" /> : <MapPin className="w-3 h-3" />}
                                            Detect
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                                        <Input
                                            placeholder="House No / Flat"
                                            value={newAddress.houseNo}
                                            onChange={e => setNewAddress({ ...newAddress, houseNo: e.target.value })}
                                            className="col-span-1 rounded-xl bg-gray-50 border-gray-100 h-9 md:h-10 text-xs md:text-sm"
                                        />
                                        <Input
                                            placeholder="Pincode"
                                            value={newAddress.pincode}
                                            onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                            className="col-span-1 rounded-xl bg-gray-50 border-gray-100 h-9 md:h-10 text-xs md:text-sm"
                                        />
                                        <Input
                                            placeholder="Area / Colony"
                                            value={newAddress.area}
                                            onChange={e => setNewAddress({ ...newAddress, area: e.target.value })}
                                            className="col-span-2 rounded-xl bg-gray-50 border-gray-100 h-9 md:h-10 text-xs md:text-sm"
                                        />
                                        <Input
                                            placeholder="Landmark (Optional)"
                                            value={newAddress.landmark}
                                            onChange={e => setNewAddress({ ...newAddress, landmark: e.target.value })}
                                            className="col-span-2 rounded-xl bg-gray-50 border-gray-100 h-9 md:h-10 text-xs md:text-sm"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        {["Home", "Work", "Other"].map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setNewAddress({ ...newAddress, type: t as any })}
                                                className={`flex-1 py-1.5 md:py-2 text-[10px] md:text-xs font-bold rounded-xl transition-all ${newAddress.type === t ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>

                                    <Button
                                        onClick={handleSaveAddress}
                                        className="w-full bg-[#45a049] hover:bg-[#388e3c] rounded-xl font-bold h-10 md:h-auto text-xs md:text-sm"
                                    >
                                        Save Address
                                    </Button>

                                </div>
                            )}

                            <div className="space-y-2 md:space-y-3">
                                {user?.savedAddresses && user.savedAddresses.length > 0 ? (
                                    user.savedAddresses.map((addr, idx) => (
                                        <div
                                            key={addr.id || idx}
                                            onClick={() => selectAddress(addr)}
                                            className={`bg-white p-3 md:p-4 rounded-xl md:rounded-[1.5rem] border flex items-center gap-3 md:gap-4 cursor-pointer transition-all active:scale-[0.98] ${location?.id === addr.id
                                                ? "border-[#45a049] ring-1 ring-[#45a049] shadow-md shadow-green-50"
                                                : "border-gray-100 hover:border-gray-200"
                                                }`}
                                        >
                                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 ${location?.id === addr.id ? "bg-[#45a049] text-white" : "bg-gray-100 text-gray-500"
                                                }`}>
                                                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-black text-xs md:text-sm text-gray-900 uppercase">{addr.type}</h4>
                                                    {location?.id === addr.id && <span className="bg-[#45a049]/10 text-[#45a049] text-[8px] font-bold px-1.5 py-0.5 rounded-md">SELECTED</span>}
                                                </div>
                                                <p className="text-[10px] md:text-xs text-gray-500 font-medium truncate">
                                                    {addr.houseNo}, {addr.area}
                                                </p>
                                                <p className="text-[9px] md:text-[10px] text-gray-400 font-medium">
                                                    {addr.landmark ? `${addr.landmark}, ` : ""}{addr.pincode}
                                                </p>
                                            </div>
                                            {location?.id === addr.id && <Check className="w-4 h-4 md:w-5 md:h-5 text-[#45a049]" />}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-6 md:py-8 bg-white rounded-[2rem] border border-gray-100 border-dashed">
                                        <MapPin className="w-6 h-6 md:w-8 md:h-8 text-gray-300 mx-auto mb-2" />
                                        <p className="text-[10px] md:text-xs text-gray-400 font-bold">No saved addresses</p>
                                        <button onClick={() => setShowAddAddress(true)} className="text-[#45a049] text-[10px] md:text-xs font-bold mt-1 hover:underline">Add one now</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Main Profile View
                    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
                        {/* Header Card */}
                        <div className="bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-3 md:gap-4 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[#45a049]/5 rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16 transition-transform group-hover:scale-110 duration-700" />
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#45a049]/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-[#45a049] text-2xl md:text-3xl font-black shrink-0 border border-[#45a049]/10 shadow-inner">
                                {user?.photo ? (
                                    <img src={user.photo} className="w-full h-full object-cover" />
                                ) : (
                                    user?.name?.[0] || <UserCircle2 className="w-8 h-8 md:w-10 md:h-10" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0 z-10">
                                {isEditing ? (
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="h-8 md:h-10 rounded-xl border-gray-100 focus:border-[#45a049] font-black text-sm md:text-base"
                                            autoFocus
                                        />
                                        <div className="flex gap-2">
                                            <button onClick={handleUpdateName} className="p-1.5 md:p-2 bg-[#45a049] text-white rounded-lg shadow-sm">
                                                <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                            </button>
                                            <button onClick={() => { setIsEditing(false); setNewName(user?.name || ""); }} className="p-1.5 md:p-2 bg-gray-100 text-gray-500 rounded-lg">
                                                <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-lg md:text-2xl font-black text-gray-900 truncate tracking-tight uppercase">
                                                {user?.name || "User"}
                                            </h2>
                                            <button onClick={() => setIsEditing(true)} className="p-1.5 text-gray-300 hover:text-[#45a049] transition-colors hover:bg-gray-50 rounded-lg">
                                                <Pencil className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                            </button>
                                        </div>
                                        <p className="text-gray-500 text-xs md:text-sm font-semibold tracking-wide">+91 {user?.phone}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Menu Categories */}
                        <div className="space-y-4 md:space-y-6">
                            {/* Account Section */}
                            <div>
                                <h3 className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-3 px-4 md:px-6">My Account</h3>
                                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-gray-100 divide-y divide-gray-50 shadow-sm">
                                    <MenuItem
                                        icon={MapPin}
                                        label="Saved Addresses"
                                        onClick={() => setView('addresses')}
                                    />
                                    <MenuItem icon={CreditCard} label="Payment Methods" />
                                    <MenuItem icon={Bell} label="Notifications" />
                                </div>
                            </div>

                            {/* App Settings */}
                            <div>
                                <h3 className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-3 px-4 md:px-6">Preferences</h3>
                                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-gray-100 divide-y divide-gray-50 shadow-sm">
                                    <MenuItem icon={ShieldCheck} label="Privacy & Security" />
                                    <MenuItem icon={Settings} label="App Settings" />
                                </div>
                            </div>

                            {/* Support */}
                            <div>
                                <h3 className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-3 px-4 md:px-6">Support</h3>
                                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-gray-100 divide-y divide-gray-50 shadow-sm">
                                    <MenuItem icon={HelpCircle} label="Help & Support" />
                                    <MenuItem icon={Info} label="About HomeRun" />
                                    <MenuItem
                                        icon={LogOut}
                                        label="Logout"
                                        className="text-red-500"
                                        onClick={logout}
                                        hideChevron
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <p className="text-center text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-2 md:pt-4 opacity-50">
                    HomeRun v2.4.1 • Made with ❤️
                </p>
            </div>
        </div>
    );
};

const MenuItem = ({ icon: Icon, label, className = "", onClick, hideChevron = false }: any) => (
    <div
        onClick={onClick}
        className={`flex items-center justify-between p-3 md:p-5 cursor-pointer hover:bg-gray-50/80 transition-all duration-300 group ${className}`}
    >
        <div className="flex items-center gap-3 md:gap-4">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${className.includes("text-red-500") ? "bg-red-50" : "bg-gray-50"}`}>
                <Icon className={`w-4 h-4 md:w-5 md:h-5 ${className.includes("text-red-500") ? "text-red-500" : "text-gray-600"}`} />
            </div>
            <span className={`font-black text-xs md:text-[14px] uppercase tracking-wide ${className ? className : "text-gray-800"}`}>
                {label}
            </span>
        </div>
        {!hideChevron && <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-300 group-hover:text-[#45a049] group-hover:translate-x-1 transition-all" />}
    </div>
);

export default Profile;
