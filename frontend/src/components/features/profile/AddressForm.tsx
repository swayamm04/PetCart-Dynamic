"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Navigation } from "lucide-react";
import { Address } from "@/lib/mock-auth";
import { cn } from "@/lib/utils";

interface AddressFormProps {
    initialData?: Address | null;
    onSave: (data: Omit<Address, "id" | "isDefault">) => Promise<void>;
    onCancel?: () => void;
}

export function AddressForm({ initialData, onSave, onCancel }: AddressFormProps) {
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [formData, setFormData] = useState({
        type: "Home" as "Home" | "Work" | "Other",
        street: "",
        city: "",
        state: "",
        zip: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                type: initialData.type,
                street: initialData.street,
                city: initialData.city,
                state: initialData.state,
                zip: initialData.zip
            });
        }
    }, [initialData]);

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
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();
                    const addr = data.address;

                    setFormData(prev => ({
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

    const handleSubmit = async () => {
        await onSave(formData);
    };

    return (
        <div className="space-y-4 py-4">
            <div className="flex gap-2">
                {['Home', 'Work', 'Other'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFormData(prev => ({ ...prev, type: type as Address['type'] }))}
                        className={cn(
                            "flex-1 py-2 text-xs font-bold rounded-xl border transition-all",
                            formData.type === type
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
                    value={formData.street}
                    onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                    placeholder="Street Address / Flat No."
                    className="bg-gray-50 border-gray-200 focus:ring-black"
                />
                <div className="grid grid-cols-2 gap-3">
                    <Input
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="City"
                        className="bg-gray-50 border-gray-200 focus:ring-black"
                    />
                    <Input
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                        placeholder="State"
                        className="bg-gray-50 border-gray-200 focus:ring-black"
                    />
                </div>
                <Input
                    value={formData.zip}
                    onChange={(e) => setFormData(prev => ({ ...prev, zip: e.target.value }))}
                    placeholder="ZIP / Pincode"
                    className="bg-gray-50 border-gray-200 focus:ring-black"
                />
            </div>

            <Button
                onClick={handleSubmit}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
            >
                Save Address
            </Button>
        </div>
    );
}
