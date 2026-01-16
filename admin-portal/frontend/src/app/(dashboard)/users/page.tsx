"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface User {
    id: string
    name: string
    email: string
    phone: string
    role: string
    status: string
    joined: string
}

import { useSearchParams } from "next/navigation"

import { Suspense } from "react"

function UsersContent() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()
    const search = searchParams.get('search')

    // ... rest of the component logic ...

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch(`${API_URL}/users`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('petshop_admin_token')}`
                    }
                })

                if (res.ok) {
                    const data = await res.json()
                    const mappedUsers = data.map((u: any) => ({
                        id: u._id,
                        name: u.name,
                        email: u.email || "No Email",
                        phone: u.phone || "No Phone",
                        role: u.role || 'User',
                        status: u.isBlocked ? 'Blocked' : 'Active',
                        joined: new Date(u.createdAt || Date.now()).toLocaleDateString()
                    }))
                    setUsers(mappedUsers)
                }
            } catch (error) {
                console.error("Failed to fetch users", error)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    const filteredUsers = users.filter(user => {
        if (!search) return true;
        const query = search.toLowerCase();
        return (
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.phone.includes(query)
        );
    });

    const deleteUser = async (user: User) => {
        if (!confirm(`Are you sure you want to permanently delete user ${user.name}? This action cannot be undone.`)) return;

        try {
            const res = await fetch(`${API_URL}/users/${user.id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                setUsers(users.filter(u => u.id !== user.id))
            } else {
                alert("Failed to delete user")
            }
        } catch (error) {
            console.error("Failed to delete user", error)
        }
    }

    if (loading) {
        return <div className="flex h-[200px] w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="sticky top-0 z-40 -mx-4 lg:-mx-6 px-4 lg:px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b">
                <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
            </div>

            <div className="rounded-md border bg-card w-full overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Phone</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{user.name}</td>
                                    <td className="p-4 align-middle">{user.phone}</td>
                                    <td className="p-4 align-middle">
                                        <span className={cn(
                                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                            user.role.toLowerCase() === "admin" ? "border-transparent bg-purple-100 text-purple-700" : "border-transparent bg-gray-100 text-gray-700"
                                        )}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <span className={cn(
                                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                            user.status === "Active" ? "border-transparent bg-green-100 text-green-700" : "border-transparent bg-red-100 text-red-700"
                                        )}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-muted-foreground">{user.joined}</td>
                                    <td className="p-4 align-middle text-right">
                                        {user.role.toLowerCase() !== "admin" ? (
                                            <button
                                                onClick={() => deleteUser(user)}
                                                className="text-xs font-medium text-red-500 hover:text-red-700 hover:underline transition-colors"
                                            >
                                                Remove
                                            </button>
                                        ) : (
                                            <span className="text-xs text-muted-foreground italic">No Actions</span>
                                        )}
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

export default function UsersPage() {
    return (
        <Suspense fallback={<div className="flex h-[200px] w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>}>
            <UsersContent />
        </Suspense>
    )
}
