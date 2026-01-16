import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
            <div className="hidden border-r bg-muted/40 md:block overflow-y-auto">
                <Sidebar />
            </div>
            <div className="flex flex-col h-full overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 w-full min-w-0">
                    {children}
                </main>
            </div>
        </div>
    )
}
