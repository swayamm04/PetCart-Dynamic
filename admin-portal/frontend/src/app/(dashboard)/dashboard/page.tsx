"use client"

import { useEffect, useState } from "react"
import { Loader2, Users, Package, IndianRupee } from "lucide-react"

export default function DashboardPage() {
    const [stats, setStats] = useState({
        activeOrders: 0,
        totalSales: 0,
        activeNow: 0,
        recentSales: [] as any[]
    })
    const [loading, setLoading] = useState(true)

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        async function fetchStats() {
            try {
                // Fetch Orders
                const ordersRes = await fetch(`${API_URL}/orders`);
                const orders: any[] = ordersRes.ok ? await ordersRes.json() : [];

                // Fetch Users for "Active Now" (Total Users)
                const usersRes = await fetch(`${API_URL}/users`);
                const users: any[] = usersRes.ok ? await usersRes.json() : [];

                // Calculate Stats
                const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

                // Total Revenue: Only 'Delivered' orders
                const totalSales = orders
                    .filter(o => o.status === 'Delivered')
                    .reduce((acc, o) => acc + (o.totalAmount || o.totalPrice || 0), 0);

                // Recent Sales: Only 'Delivered' orders (take last 5)
                const recentSales = orders
                    .filter(o => o.status === 'Delivered')
                    .slice()
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5)
                    .map(o => ({
                        id: o._id, // Added id for key
                        username: o.user?.name || "Guest User", // Changed name to username
                        email: o.user?.email || o.shippingAddress?.phone || "No contact",
                        amount: (o.totalAmount || o.totalPrice || 0) // Stored as number for toFixed
                    }));

                setStats({
                    activeOrders,
                    totalSales,
                    activeNow: users.length,
                    recentSales
                })

            } catch (error) {
                console.error("Failed to fetch dashboard stats", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [API_URL])

    if (loading) {
        return <div className="flex h-[400px] w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold md:text-2xl mb-2">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Registered Users</h3>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.activeNow}</div>
                    <p className="text-xs text-muted-foreground">All time registrations</p>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Active Orders</h3>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.activeOrders}</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Revenue</h3>
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">₹{stats.totalSales.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">+8% from last month</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm col-span-4 lg:col-span-7">
                    <div className="p-6">
                        <h3 className="font-semibold leading-none tracking-tight">Recent Sales</h3>
                        <p className="text-sm text-muted-foreground">Recent delivered orders.</p>
                    </div>
                    <div className="p-6 pt-0 space-y-8">
                        {stats.recentSales.length > 0 ? stats.recentSales.map((sale) => (
                            <div key={sale.id} className="flex items-center">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{sale.username}</p>
                                    <p className="text-xs text-muted-foreground">{sale.email}</p>
                                </div>
                                <div className="ml-auto font-medium">+₹{sale.amount.toFixed(2)}</div>
                            </div>
                        )) : (
                            <p className="text-sm text-muted-foreground">No recent sales.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
