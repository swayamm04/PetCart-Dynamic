import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    id: string;
    date: string;
    items: OrderItem[];
    total: number;
    status: "Delivered" | "Processing" | "Cancelled";
    address: {
        pincode: string;
        houseNo: string;
        area: string;
        landmark: string;
    };
}

interface OrderContextType {
    orders: Order[];
    addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>(() => {
        const saved = localStorage.getItem("homerun_orders");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("homerun_orders", JSON.stringify(orders));
    }, [orders]);

    const addOrder = (orderData: Omit<Order, "id" | "date" | "status">) => {
        const newOrder: Order = {
            ...orderData,
            id: `HR${Math.floor(100000 + Math.random() * 900000)}`,
            date: new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
            }),
            status: "Processing"
        };
        setOrders([newOrder, ...orders]);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrders must be used within an OrderProvider");
    }
    return context;
};
