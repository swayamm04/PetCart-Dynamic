"use client"

import { ChevronLeft, Upload, Loader2, Plus, X, ImagePlus } from "lucide-react"
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
        type: "",
        stock: "100",
        description: "",
        image: "",
        isDeal: false
    })

    // New state for multiple images
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [newImageUrl, setNewImageUrl] = useState("")
    const [showImageInput, setShowImageInput] = useState(false)

    // New state for specifications
    const [specifications, setSpecifications] = useState<{ label: string; value: string }[]>([
        { label: "Brand", value: "" },
        { label: "Material", value: "" }
    ])

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    const addImage = () => {
        if (newImageUrl) {
            setImageUrls([...imageUrls, newImageUrl])
            setNewImageUrl("")
            setShowImageInput(false)
        }
    }

    const removeImage = (index: number) => {
        setImageUrls(imageUrls.filter((_, i) => i !== index))
    }

    const addSpec = () => {
        setSpecifications([...specifications, { label: "", value: "" }])
    }

    const removeSpec = (index: number) => {
        setSpecifications(specifications.filter((_, i) => i !== index))
    }

    const updateSpec = (index: number, field: 'label' | 'value', value: string) => {
        const newSpecs = [...specifications]
        newSpecs[index][field] = value
        setSpecifications(newSpecs)
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            // Validation
            if (!formData.name || !formData.category || !formData.type || !formData.regularPrice || !formData.stock || !formData.description) {
                alert("Please fill in all required fields: Name, Category, Type, Regular Price, Stock, and Description.")
                setLoading(false)
                return
            }

            if (imageUrls.length === 0) {
                alert("Please add at least one product image.")
                setLoading(false)
                return
            }

            // First image is thumbnail
            const thumbnail = imageUrls.length > 0 ? imageUrls[0] : ""

            // Filter out empty specs
            const validSpecs = specifications.filter(s => s.label.trim() !== "" && s.value.trim() !== "")

            const payload = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.regularPrice),
                salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
                category: formData.category,
                type: formData.type,
                stock: isNaN(Number(formData.stock)) ? 0 : Number(formData.stock),
                image: thumbnail,
                images: imageUrls,
                specifications: validSpecs,
                isDeal: formData.isDeal
            }

            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                router.push('/products')
                router.refresh()
            } else {
                alert("Failed to create product")
            }
        } catch (e) {
            console.error(e)
            alert("Error creating product")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-6 max-w-3xl pb-10">
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
                            <label className="text-sm font-medium" htmlFor="name">Product Name <span className="text-red-500">*</span></label>
                            <input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="e.g. Premium Dog Kibble"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium" htmlFor="category">Category <span className="text-red-500">*</span></label>
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
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium" htmlFor="type">Product Type <span className="text-red-500">*</span></label>
                                <select
                                    id="type"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="">Select Type</option>
                                    <option value="Food">Food</option>
                                    <option value="Accessory">Accessory</option>
                                    <option value="Medicine">Medicine</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium" htmlFor="price">Regular Price (₹) <span className="text-red-500">*</span></label>
                                <input
                                    id="price"
                                    type="number"
                                    value={formData.regularPrice}
                                    onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    placeholder="0.00"
                                    onWheel={(e) => e.currentTarget.blur()}
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
                                    onWheel={(e) => e.currentTarget.blur()}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium" htmlFor="stock">Stock Quantity <span className="text-red-500">*</span></label>
                                <input
                                    id="stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    placeholder="100"
                                    onWheel={(e) => e.currentTarget.blur()}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="images">
                                Upload Images <span className="text-red-500">*</span>
                                <span className="ml-2 text-xs font-normal text-muted-foreground">(First image will be the thumbnail)</span>
                            </label>
                            {showImageInput && (
                                <div className="flex gap-2 mb-2">
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
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => setShowImageInput(false)}
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 border bg-background hover:bg-muted transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

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
                                {!showImageInput && (
                                    <button
                                        type="button"
                                        onClick={() => setShowImageInput(true)}
                                        className="flex items-center justify-center aspect-square rounded-md border border-dashed hover:bg-muted transition-colors group"
                                    >
                                        <Plus className="h-8 w-8 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Product Specifications Section */}
                        <div className="grid gap-2 border-t pt-4 mt-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Product Specifications</label>
                                <button
                                    onClick={addSpec}
                                    type="button"
                                    className="text-xs text-primary hover:underline flex items-center gap-1"
                                >
                                    <Plus className="h-3 w-3" /> Add Specification
                                </button>
                            </div>
                            <div className="space-y-3">
                                {specifications.map((spec, index) => (
                                    <div key={index} className="flex gap-2 items-start">
                                        <div className="flex-1">
                                            <input
                                                value={spec.label}
                                                onChange={(e) => updateSpec(index, 'label', e.target.value)}
                                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                placeholder="Label (e.g. Brand)"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                value={spec.value}
                                                onChange={(e) => updateSpec(index, 'value', e.target.value)}
                                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                placeholder="Value (e.g. Royal Canin)"
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeSpec(index)}
                                            type="button"
                                            className="h-9 w-9 flex items-center justify-center rounded-md border hover:bg-red-50 hover:text-red-500 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                {specifications.length === 0 && (
                                    <p className="text-xs text-muted-foreground italic">No specifications added.</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 border-t pt-4 mt-2">
                            <input
                                type="checkbox"
                                id="isDeal"
                                checked={formData.isDeal}
                                onChange={(e) => setFormData({ ...formData, isDeal: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label
                                htmlFor="isDeal"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Deal of the Week
                            </label>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="desc">Description <span className="text-red-500">*</span></label>
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
