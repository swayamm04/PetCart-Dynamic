"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface User {
    id: string
    name: string
    email: string
    role: string
    status: string
    joined: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch('http://localhost:3000/api/users')
                if (res.ok) {
                    const data = await res.json()
                    setUsers(data)
                }
            } catch (error) {
                console.error("Failed to fetch users", error)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    if (loading) {
        return <div className="flex h-[200px] w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {users.map((user) => (
                                <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{user.name}</td>
                                    <td className="p-4 align-middle">{user.email}</td>
                                    <td className="p-4 align-middle">
                                        <span className={cn(
                                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                            user.role === "Admin" ? "border-transparent bg-purple-100 text-purple-700" : "border-transparent bg-gray-100 text-gray-700"
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
