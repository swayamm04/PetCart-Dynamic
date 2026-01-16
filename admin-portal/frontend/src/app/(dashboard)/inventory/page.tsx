"use client"

import { useEffect, useState } from "react"
import { Loader2, AlertTriangle, Package } from "lucide-react"
import { cn } from "@/lib/utils"

interface InventoryItem {
    id: string
    name: string
    category: string
    stock: number
    status: string
    lastUpdated: string
}

export default function InventoryPage() {
    const [items, setItems] = useState<InventoryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalProducts: 0,
        lowStock: 0,
        outOfStock: 0
    })

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        async function fetchInventory() {
            try {
                const res = await fetch(`${API_URL}/products`)
                if (res.ok) {
                    const data = await res.json()
                    const mappedItems = data.map((p: any) => ({
                        id: p._id,
                        name: p.name,
                        category: p.category,
                        stock: p.stock || 0,
                        status: p.stock === 0 ? 'Out of Stock' : p.stock < 5 ? 'Low Stock' : 'In Stock',
                        lastUpdated: new Date(p.updatedAt || Date.now()).toLocaleDateString()
                    }))
                    setItems(mappedItems)

                    // Calculate stats
                    const low = mappedItems.filter((i: any) => i.stock > 0 && i.stock < 5).length
                    const out = mappedItems.filter((i: any) => i.stock === 0).length
                    setStats({
                        totalProducts: mappedItems.length,
                        lowStock: low,
                        outOfStock: out
                    })
                }
            } catch (error) {
                console.error("Failed to fetch inventory", error)
            } finally {
                setLoading(false)
            }
        }
        fetchInventory()
    }, [])

    if (loading) {
        return <div className="flex h-[200px] w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="sticky top-0 z-40 -mx-4 lg:-mx-6 px-4 lg:px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b">
                <h1 className="text-lg font-semibold md:text-2xl">Inventory Management</h1>
            </div>

            <div className="flex-1">
                <div className="flex flex-col gap-6">
                    {/* Stats Cards */}
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <h3 className="tracking-tight text-sm font-medium">Total Products</h3>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-bold">{stats.totalProducts}</div>
                        </div>
                        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <h3 className="tracking-tight text-sm font-medium">Low Stock</h3>
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            </div>
                            <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
                            <p className="text-xs text-muted-foreground">Items with less than 5 qty</p>
                        </div>
                        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <h3 className="tracking-tight text-sm font-medium">Out of Stock</h3>
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                            </div>
                            <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
                        </div>
                    </div>

                    <div className="rounded-md border bg-card w-full overflow-hidden">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product Name</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock Qty</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Updated</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {items.map((item) => (
                                        <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle font-medium">{item.name}</td>
                                            <td className="p-4 align-middle">{item.category}</td>
                                            <td className="p-4 align-middle font-bold">{item.stock}</td>
                                            <td className="p-4 align-middle">
                                                <span className={cn(
                                                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                                    item.stock === 0 ? "border-transparent bg-red-100 text-red-700" :
                                                        item.stock < 5 ? "border-transparent bg-yellow-100 text-yellow-700" :
                                                            "border-transparent bg-green-100 text-green-700"
                                                )}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle text-muted-foreground">{item.lastUpdated}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
