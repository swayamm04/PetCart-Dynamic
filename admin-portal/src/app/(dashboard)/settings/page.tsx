"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
    const [loading, setLoading] = useState(false)

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your store settings and preferences.
                </p>
            </div>
            <Separator />
            <div className="space-y-4">
                <div className="grid gap-2 max-w-xl">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" placeholder="Petzy Store" defaultValue="Petzy Store" />
                </div>
                <div className="grid gap-2 max-w-xl">
                    <Label htmlFor="email">Support Email</Label>
                    <Input id="email" placeholder="support@petzy.com" defaultValue="admin@petzy.com" />
                </div>
                <div className="grid gap-2 max-w-xl">
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" disabled defaultValue="Indian Rupee (₹)" />
                </div>

                <div className="pt-4">
                    <Button onClick={handleSave} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}
