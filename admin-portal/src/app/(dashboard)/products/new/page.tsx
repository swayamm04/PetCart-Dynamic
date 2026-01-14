"use client"

import { ChevronLeft, Upload, Loader2, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function AddProductPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        regularPrice: "",
        salePrice: "",
        category: "",
        description: "",
        image: "" // Kept for backward compat as thumbnail
    })

    // New state for multiple images
    const [imageUrls, setImageUrls] = useState<string[]>([
        "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=60"
    ])
    const [newImageUrl, setNewImageUrl] = useState("")

    const addImage = () => {
        if (newImageUrl) {
            setImageUrls([...imageUrls, newImageUrl])
            setNewImageUrl("")
        }
    }

    const removeImage = (index: number) => {
        setImageUrls(imageUrls.filter((_, i) => i !== index))
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            // First image is thumbnail
            const thumbnail = imageUrls.length > 0 ? imageUrls[0] : ""

            const payload = {
                ...formData,
                regularPrice: parseFloat(formData.regularPrice),
                salePrice: parseFloat(formData.salePrice || formData.regularPrice),
                discountPercentage: 0,
                inStock: true,
                image: thumbnail,
                images: imageUrls // New field
            }

            const res = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                router.push('/products')
                router.refresh()
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-4">
                <Link href="/products" className="inline-flex items-center justify-center rounded-full w-8 h-8 border bg-background hover:bg-muted transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                </Link>
                <h1 className="text-lg font-semibold md:text-2xl">Add New Product</h1>
            </div>

            <div className="grid gap-6">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                    <div>
                        <h3 className="text-lg font-medium">Product Details</h3>
                        <p className="text-sm text-muted-foreground">Basic information about your product</p>
                    </div>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="name">Product Name</label>
                            <input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="e.g. Premium Dog Kibble"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="category">Category</label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="">Select Category</option>
                                <option value="Dogs">Dogs</option>
                                <option value="Cats">Cats</option>
                                <option value="Birds">Birds</option>
                                <option value="Fish">Fish</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium" htmlFor="price">Regular Price (₹)</label>
                                <input
                                    id="price"
                                    type="number"
                                    value={formData.regularPrice}
                                    onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium" htmlFor="salePrice">Sale Price (₹)</label>
                                <input
                                    id="salePrice"
                                    type="number"
                                    value={formData.salePrice}
                                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    placeholder="Optional"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="images">
                                Product Images
                                <span className="ml-2 text-xs font-normal text-muted-foreground">(First image will be the thumbnail)</span>
                            </label>
                            <div className="flex gap-2">
                                <input
                                    id="images"
                                    value={newImageUrl}
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    placeholder="Paste image URL here..."
                                />
                                <button
                                    onClick={addImage}
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 border bg-background hover:bg-muted transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-4 gap-4 mt-2">
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border group">
                                        <img src={url} alt={`Product ${index + 1}`} className="object-cover w-full h-full" />
                                        <button
                                            onClick={() => removeImage(index)}
                                            type="button"
                                            className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                        {index === 0 && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-1">
                                                Thumbnail
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="desc">Description</label>
                            <textarea
                                id="desc"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="Product description..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/products" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border bg-background hover:bg-muted transition-colors">
                        Cancel
                    </Link>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={cn(
                            "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
                            loading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Product
                    </button>
                </div>
            </div>
        </div>
    )
}
