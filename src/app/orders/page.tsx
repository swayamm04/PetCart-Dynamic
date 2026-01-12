import { OrdersList } from "@/components/features/orders/OrdersList";

export const metadata = {
    title: "My Orders - PetShop",
    description: "View your order history.",
};

export default function OrdersPage() {
    return <OrdersList />;
}
