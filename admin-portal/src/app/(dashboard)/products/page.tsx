"use client"

import Link from "next/link"
import { Plus, Pencil, Trash, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface Product {
    id: string
    name: string
    category: string
    regularPrice: number
    salePrice: number
    inStock: boolean
    image?: string
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('http://localhost:3000/api/products')
                if (res.ok) {
                    const data = await res.json()
                    setProducts(data)
                }
            } catch (error) {
                console.error("Failed to fetch products", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const deleteProduct = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return

        try {
            const res = await fetch(`http://localhost:3000/api/products?id=${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id))
            }
        } catch (error) {
            console.error("Failed to delete product", error)
        }
    }

    if (loading) {
        return <div className="flex h-[200px] w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
                <Link
                    href="/products/new"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground h-9 px-4 py-2"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Link>
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[80px]">Image</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {products.map((product) => (
                                <tr key={product.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle">
                                        <div className="relative h-10 w-10 overflow-hidden rounded-md border bg-muted">
                                            <img
                                                src={product.image || "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=100&q=60"}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle font-medium">{product.name}</td>
                                    <td className="p-4 align-middle">{product.category}</td>
                                    <td className="p-4 align-middle">
                                        {product.salePrice ? (
                                            <div className="flex flex-col">
                                                <span className="font-bold">₹{product.salePrice.toFixed(2)}</span>
                                                <span className="text-xs line-through text-muted-foreground">₹{product.regularPrice.toFixed(2)}</span>
                                            </div>
                                        ) : (
                                            `₹${product.regularPrice.toFixed(2)}`
                                        )}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <span className={cn(
                                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                            product.inStock ? "border-transparent bg-green-100 text-green-700" : "border-transparent bg-red-100 text-red-700"
                                        )}>
                                            {product.inStock ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 ghost hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors">
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="p-2 ghost hover:bg-destructive/10 rounded-md text-destructive transition-colors"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </button>
                                        </div>
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
