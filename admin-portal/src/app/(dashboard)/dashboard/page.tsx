"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
    { name: "Jan", total: 1200 },
    { name: "Feb", total: 2100 },
    { name: "Mar", total: 1800 },
    { name: "Apr", total: 2400 },
    { name: "May", total: 3200 },
    { name: "Jun", total: 4500 },
]

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[
                    { title: "Active Orders", value: "2350", change: "+180.1% from last month" },
                    { title: "Sales", value: "12,234", change: "+19% from last month" },
                    { title: "Active Now", value: "573", change: "+201 since last hour" }
                ].map((item) => (
                    <div key={item.title} className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-between space-y-2">
                        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{item.title}</h3>
                        <div className="text-2xl font-bold">{item.value}</div>
                        <p className="text-xs text-muted-foreground">{item.change}</p>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="font-semibold leading-none tracking-tight">Overview</h3>
                        <p className="text-sm text-muted-foreground">Monthly sales activity</p>
                    </div>
                    <div className="p-6 pt-0 pl-2">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="font-semibold leading-none tracking-tight">Recent Sales</h3>
                        <p className="text-sm text-muted-foreground">You made 265 sales this month.</p>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="space-y-8">
                            {[
                                { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+₹1,999.00" },
                                { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+₹39.00" },
                                { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+₹299.00" },
                                { name: "William Kim", email: "will@email.com", amount: "+₹99.00" },
                                { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+₹39.00" }
                            ].map((sale, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs text-primary">
                                        {sale.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{sale.name}</p>
                                        <p className="text-sm text-muted-foreground">{sale.email}</p>
                                    </div>
                                    <div className="ml-auto font-medium">{sale.amount}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
