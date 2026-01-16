"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Loader2 } from "lucide-react"
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"

interface OrderItem {
    product: {
        _id: string
        name: string
        image: string
        price: number
    }
    quantity: number
    price: number
    _id: string
}

interface Order {
    id: string
    customer: string
    email: string
    phone: string
    date: string
    total: number
    status: string
    itemsCount: number
    paymentMethod: string
    items: OrderItem[]
    shippingAddress: {
        street: string
        city: string
        state: string
        zip: string
    }
}

export default function OrdersPage() {
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${API_URL}/orders`)
            if (res.ok) {
                const data = await res.json()
                const mappedOrders = data.map((o: any) => ({
                    id: o._id,
                    customer: o.user?.name || "Guest",
                    email: o.user?.email || "N/A",
                    phone: o.user?.phone || "N/A",
                    date: new Date(o.createdAt).toLocaleDateString(),
                    total: o.totalAmount || o.totalPrice || 0,
                    status: o.status || 'Pending',
                    itemsCount: o.items?.length || o.orderItems?.length || 0,
                    paymentMethod: o.paymentMethod || 'Card',
                    items: o.items || [],
                    shippingAddress: o.shippingAddress || {}
                }))
                setOrders(mappedOrders)
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
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o))
        try {
            await fetch(`${API_URL}/orders/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
        } catch (e) {
            console.error("Failed to update status", e)
            fetchOrders()
        }
    }

    if (loading) {
        return <div className="flex h-[200px] w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="sticky top-0 z-40 -mx-4 lg:-mx-6 px-4 lg:px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b">
                <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
            </div>

            <div className="rounded-md border bg-card w-full overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Payment</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
                                    onClick={() => router.push(`/orders/${order.id}`)}
                                >
                                    <td className="p-4 align-middle font-medium text-xs text-muted-foreground">{order.id.slice(-6)}...</td>
                                    <td className="p-4 align-middle">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{order.customer}</span>
                                            <span className="text-xs text-muted-foreground">{order.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">{order.date}</td>
                                    <td className="p-4 align-middle font-medium">₹{order.total.toFixed(0)}</td>
                                    <td className="p-4 align-middle">{order.paymentMethod}</td>
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
                                    <td className="p-4 align-middle text-right" onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => router.push(`/orders/${order.id}`)}>
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => updateStatus(order.id, "Processing")}>
                                                    <span style={{ color: '#2563eb' }}>Mark Processing</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(order.id, "Shipped")}>
                                                    <span style={{ color: '#9333ea' }}>Mark Shipped</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(order.id, "Delivered")}>
                                                    <span style={{ color: '#16a34a' }}>Mark Delivered</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(order.id, "Cancelled")}>
                                                    <span style={{ color: '#dc2626' }}>Cancel Order</span>
                                                </DropdownMenuItem>
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
