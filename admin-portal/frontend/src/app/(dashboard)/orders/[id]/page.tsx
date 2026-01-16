"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Package, MapPin, CreditCard, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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

export default function OrderDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`${API_URL}/orders/${params.id}`)
                if (res.ok) {
                    const o = await res.json()
                    const mappedOrder = {
                        id: o._id,
                        customer: o.user ? o.user.name : "Guest",
                        email: o.user ? o.user.email : "N/A",
                        phone: o.user ? o.user.phone : "N/A",
                        date: new Date(o.createdAt).toLocaleDateString(),
                        total: o.totalAmount || o.totalPrice || 0,
                        status: o.status || 'Pending',
                        itemsCount: o.items?.length || o.orderItems?.length || 0,
                        paymentMethod: o.paymentMethod || 'Card',
                        items: o.items || [],
                        shippingAddress: o.shippingAddress || {}
                    }
                    setOrder(mappedOrder)
                } else {
                    setError("Failed to fetch order details")
                }
            } catch (err) {
                setError("Error loading order details")
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            fetchOrder()
        }
    }, [params.id, API_URL])

    const updateStatus = async (newStatus: string) => {
        if (!order) return

        // Optimistic update
        setOrder({ ...order, status: newStatus })

        try {
            await fetch(`${API_URL}/orders/${order.id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
        } catch (e) {
            console.error("Failed to update status", e)
            // Revert on failure (could refetch)
        }
    }

    if (loading) {
        return <div className="flex h-[50vh] w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    if (error || !order) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <p className="text-red-500">{error || "Order not found"}</p>
                <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Order Details</h1>
                    <p className="text-sm text-muted-foreground">ID: {order.id}</p>
                </div>
                <div className="ml-auto">
                    <div className={cn(
                        "inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold",
                        order.status === "Delivered" && "border-transparent bg-green-100 text-green-700",
                        order.status === "Processing" && "border-transparent bg-blue-100 text-blue-700",
                        order.status === "Pending" && "border-transparent bg-yellow-100 text-yellow-700",
                        order.status === "Shipped" && "border-transparent bg-purple-100 text-purple-700",
                        order.status === "Cancelled" && "border-transparent bg-red-100 text-red-700",
                    )}>
                        {order.status}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="p-6 flex flex-col gap-6">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Package className="h-4 w-4" /> Order Items
                            </h3>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item._id} className="flex gap-4 items-start border-b pb-4 last:border-0 last:pb-0">
                                        <div
                                            className="relative bg-muted/20 border rounded-md overflow-hidden shrink-0"
                                            style={{ width: '80px', height: '80px' }}
                                        >
                                            {item.product?.image ? (
                                                <div className="w-full h-full p-2">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-muted-foreground text-xs">No Img</div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium truncate">{item.product?.name || "Unknown Product"}</h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Unit Price: ₹{item.price}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                        <div className="font-bold">
                                            ₹{(item.quantity * item.price).toFixed(0)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4 flex justify-between items-center">
                                <span className="font-medium">Total Amount</span>
                                <span className="text-2xl font-bold">₹{order.total.toFixed(0)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer & Actions */}
                <div className="space-y-6">
                    {/* Status Actions */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                        <h3 className="font-semibold">Update Status</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                size="sm"
                                variant={order.status === 'Processing' ? 'default' : 'outline'}
                                onClick={() => updateStatus("Processing")}
                                className={cn("w-full", order.status === 'Processing' ? 'bg-blue-600 hover:bg-blue-700' : 'text-blue-600 hover:bg-blue-50')}
                            >Processing</Button>
                            <Button
                                size="sm"
                                variant={order.status === 'Shipped' ? 'default' : 'outline'}
                                onClick={() => updateStatus("Shipped")}
                                className={cn("w-full", order.status === 'Shipped' ? 'bg-purple-600 hover:bg-purple-700' : 'text-purple-600 hover:bg-purple-50')}
                            >Shipped</Button>
                            <Button
                                size="sm"
                                variant={order.status === 'Delivered' ? 'default' : 'outline'}
                                className={cn("w-full col-span-2", order.status === 'Delivered' ? 'bg-green-600 hover:bg-green-700' : '')}
                                onClick={() => updateStatus("Delivered")}
                            >Delivered</Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full col-span-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => updateStatus("Cancelled")}
                            >Cancel Order</Button>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                            <User className="h-4 w-4" /> Customer
                        </h3>
                        <div className="space-y-1">
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-muted-foreground">{order.email}</p>
                            <p className="text-sm text-muted-foreground">{order.phone}</p>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> Shipping Address
                        </h3>
                        <div className="text-sm bg-muted/30 p-3 rounded-md space-y-1">
                            <p>{order.shippingAddress?.street}</p>
                            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                            <p className="font-semibold">{order.shippingAddress?.zip}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                            <CreditCard className="h-4 w-4" /> Payment Details
                        </h3>
                        <div className="space-y-1">
                            <p className="text-sm">Method: <span className="font-medium">{order.paymentMethod}</span></p>
                            <p className="text-sm flex items-center gap-2">
                                <Calendar className="h-3 w-3" /> {order.date}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
