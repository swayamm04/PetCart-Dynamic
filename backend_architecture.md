# Backend Architecture & API Specification for HomeRun

This document outlines the backend architecture, API endpoints, and data models required to support the HomeRun frontend application.

## 1. Overview
The backend should provide a RESTful API (or GraphQL) to handle user authentication, product catalog management, cart operations, order processing, and user address management. Use JSON for request and response payloads.

**Base URL**: `/api/v1` (recommended)

---

## 2. Authentication & User Management
**Context**: `AuthContext.tsx` currently mocks this behavior.

### 2.1. Check User Existence
*   **Endpoint**: `POST /auth/check-user`
*   **Purpose**: Determine if a phone number is already registered.
*   **Request**:
    ```json
    { "phone": "9999999999" }
    ```
*   **Response**:
    ```json
    { "exists": true, "name": "John Doe" } // "name" optional, helps verify identity
    ```

### 2.2. Login
*   **Endpoint**: `POST /auth/login`
*   **Request**:
    ```json
    { "phone": "9999999999", "password": "hashed_or_plain_password" }
    ```
*   **Response**:
    ```json
    {
      "token": "jwt_access_token",
      "user": {
        "id": "u_123",
        "phone": "9999999999",
        "name": "John Doe",
        "photo": "url_to_photo",
        "defaultAddressId": "addr_1"
      }
    }
    ```

### 2.3. Register
*   **Endpoint**: `POST /auth/register`
*   **Request**:
    ```json
    { "phone": "9999999999", "name": "Jane User", "password": "secure_password" }
    ```
*   **Response**: Same as Login (returns token and user).

### 2.4. Forgot Password Flow
*   **Step 1**: `POST /auth/otp/send` -> `{ "phone": "..." }`
*   **Step 2**: `POST /auth/otp/verify` -> `{ "phone": "...", "otp": "1234" }` -> Returns a temporary `reset_token`.
*   **Step 3**: `POST /auth/password/reset` -> `{ "token": "reset_token", "newPassword": "..." }`

### 2.5. User Profile & Addresses
*   **Get Profile**: `GET /user/profile` (Auth required) -> Returns full user details including `savedAddresses`.
*   **Update Profile**: `PUT /user/profile` -> Update name, email, etc.
*   **Add Address**: `POST /user/addresses`
    ```json
    {
      "pincode": "577201",
      "houseNo": "123/A",
      "area": "LBS Nagar",
      "landmark": "Near Park",
      "type": "Home"
    }
    ```
*   **Update Address**: `PUT /user/addresses/:id`
*   **Delete Address**: `DELETE /user/addresses/:id`

---

## 3. Product Catalog
**Context**: Mocked in `src/data/products.ts` and `src/data/categories.ts`.

### 3.1. List Products
*   **Endpoint**: `GET /products`
*   **Query Params**:
    *   `category`: Filter by category name (e.g., "Wires")
    *   `search`: Search query string
    *   `limit`, `page`: Pagination
*   **Response**:
    ```json
    {
      "products": [
        {
          "id": "p_001",
          "name": "Polycab Maxima+ Green Wire",
          "image": "url",
          "regularPrice": 2670,
          "salePrice": 1733,
          "discountPercentage": 35,
          "unit": "90m",
          "category": "Wires",
          "inStock": true
        }
      ],
      "total": 50,
      "page": 1
    }
    ```

### 3.2. Product Details
*   **Endpoint**: `GET /products/:id` (or by slug/name)
*   **Response**: Full product object, including detailed specs which are currently hardcoded in frontend.
    ```json
    {
      "id": "p_001",
      "name": "Polycab Maxima+ ...",
      "description": "Longer description...",
      "images": ["url1", "url2"],
      "specifications": [
        { "label": "Brand", "value": "Polycab" },
        { "label": "Grade", "value": "FR-LSH" }
      ],
      "features": [
        "Verified Quality",
        "Heat Resistant"
      ],
      "relatedProducts": ["p_002", "p_005"]
    }
    ```

### 3.3. Categories
*   **Endpoint**: `GET /categories`
*   **Response**:
    ```json
    [
      { "id": "c_1", "name": "Cement", "image": "url" },
      { "id": "c_2", "name": "Tiling", "image": "url" }
    ]
    ```

---

## 4. Cart Management
**Context**: `CartContext.tsx` (Currently syncs to `localStorage`). Backend cart is recommended for cross-device persistence.

*   **Get Cart**: `GET /cart` (Auth required)
*   **Add Item**: `POST /cart/items`
    ```json
    { "productId": "p_001", "quantity": 1 }
    ```
*   **Update Item**: `PUT /cart/items/:productId` -> `{ "quantity": 3 }`
*   **Remove Item**: `DELETE /cart/items/:productId`
*   **Clear Cart**: `DELETE /cart`

---

## 5. Orders & Checkout
**Context**: `OrderContext.tsx`.

### 5.1. Place Order
*   **Endpoint**: `POST /orders`
*   **Request**:
    ```json
    {
      "items": [
        { "productId": "p_001", "quantity": 2, "price": 1733 }
      ],
      "addressId": "addr_1", // Delivery address
      "paymentMethod": "COD" // or "UPI", etc.
    }
    ```
*   **Response**:
    ```json
    { "orderId": "HR123456", "status": "Processing", "total": 3466 }
    ```

### 5.2. List Orders
*   **Endpoint**: `GET /orders` (Auth required)
*   **Response**: History of user's past orders.

---

## 6. Location Services (Optional but Recommended)
**Context**: Frontend currently uses **OpenStreetMap (Nominatim)** via `fetch`.
*   **Endpoint**: `GET /location/reverse-geocode?lat=...&lon=...`
*   **Purpose**: Proxy the geocoding request through backend to hide API keys (if switching to Google Maps) or to standardize address structure before sending to frontend.

---

## 7. Data Models (TypeScript Interfaces Reference)

### User
```typescript
interface User {
    id: string;
    phone: string;
    name: string;
    photo?: string; // URL
    address?: Address; // Current selected/default address
    savedAddresses: Address[];
}
```

### Address
```typescript
interface Address {
    id: string;
    pincode: string;
    houseNo: string;
    area: string;
    landmark: string;
    type: "Home" | "Work" | "Other";
}
```

### Product
```typescript
interface Product {
    id: string;
    name: string;
    image: string; // Main display image
    regularPrice: number; // MRP
    salePrice: number;    // Selling Price
    discountPercentage: number;
    unit: string;         // e.g., "90m", "1 Set"
    category: string;
    description?: string;
    specifications?: { label: string; value: string }[];
}
```

### Order
```typescript
interface Order {
    id: string;
    userId: string;
    date: string; // ISO Date
    items: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
        image: string;
    }[];
    total: number;
    status: "Delivered" | "Processing" | "Cancelled";
    address: Address;
}
```
