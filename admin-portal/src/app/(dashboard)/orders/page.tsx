"use client"

import { useEffect, useState } from "react"
import { MoreHorizontal, Loader2, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface Order {
    id: string
    customer: string
    date: string
    total: number
    status: string
    items: number
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    const fetchOrders = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/orders')
            if (res.ok) {
                const data = await res.json()
                setOrders(data)
            }
        } catch (error) {
            console.error("Failed to fetch orders", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const updateStatus = async (id: string, newStatus: string) => {
        // Optimistic update
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o))

        try {
            await fetch('http://localhost:3000/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            })
        } catch (e) {
            console.error("Failed to update status", e)
            fetchOrders() // Revert on error
        }
    }

    if (loading) {
        return <div className="flex h-[200px] w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{order.id}</td>
                                    <td className="p-4 align-middle">{order.customer}</td>
                                    <td className="p-4 align-middle">{order.date}</td>
                                    <td className="p-4 align-middle">₹{order.total.toFixed(2)}</td>
                                    <td className="p-4 align-middle">
                                        <div className={cn(
                                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                            order.status === "Delivered" && "border-transparent bg-green-100 text-green-700",
                                            order.status === "Processing" && "border-transparent bg-blue-100 text-blue-700",
                                            order.status === "Pending" && "border-transparent bg-yellow-100 text-yellow-700",
                                            order.status === "Shipped" && "border-transparent bg-purple-100 text-purple-700",
                                            order.status === "Cancelled" && "border-transparent bg-red-100 text-red-700",
                                        )}>
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>
                                                    Copy Order ID
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => updateStatus(order.id, "Processing")}>Mark Processing</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(order.id, "Shipped")}>Mark Shipped</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(order.id, "Delivered")}>Mark Delivered</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(order.id, "Cancelled")} className="text-red-600">Cancel Order</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
