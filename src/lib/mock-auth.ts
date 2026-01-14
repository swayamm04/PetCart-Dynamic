export interface Address {
    id: string;
    type: "Home" | "Work" | "Other";
    street: string;
    city: string;
    state: string;
    zip: string;
    isDefault?: boolean;
}

export interface User {
    id: string;
    name: string;
    phone: string;
    password?: string; // In real app, this would be hashed
    orders: any[];
    addresses: Address[];
    role: "user" | "admin";
}

// Mock Database
const USERS: User[] = [
    {
        id: "1",
        name: "Admin User",
        phone: "9999999999",
        password: "admin",
        orders: [],
        addresses: [],
        role: "admin"
    },
    {
        id: "2",
        name: "Demo User",
        phone: "9876543210",
        password: "user123",
        orders: [],
        addresses: [{
            id: "addr_1",
            type: "Home",
            street: "123 Pet St",
            city: "Bangalore",
            state: "KA",
            zip: "560001"
        }],
        role: "user"
    }
];

// Verify OTP Mock Store
const OTP_STORE: Record<string, string> = {};

export const mockAuth = {
    // Check if user exists by phone
    checkUserExists: async (phone: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
        return USERS.some(u => u.phone === phone);
    },

    // Send OTP
    sendOTP: async (phone: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        const otp = "1234"; // Fixed OTP for demo
        OTP_STORE[phone] = otp;
        console.log(`[MockAuth] OTP for ${phone}: ${otp}`);
        // In a real app, you would trigger an SMS API here
        return true;
    },

    // Verify OTP
    verifyOTP: async (phone: string, otp: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return OTP_STORE[phone] === otp;
    },

    // Login with Password
    login: async (phone: string, password: string): Promise<User | null> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        const user = USERS.find(u => u.phone === phone && u.password === password);
        return user || null;
    },

    // Register New User
    register: async (data: { name: string; phone: string; password: string }): Promise<User> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: data.name,
            phone: data.phone,
            password: data.password,
            orders: [],
            addresses: [],
            role: "user"
        };
        USERS.push(newUser);
        return newUser;
    },

    // Reset Password
    resetPassword: async (phone: string, newPassword: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const userIndex = USERS.findIndex(u => u.phone === phone);
        if (userIndex !== -1) {
            USERS[userIndex].password = newPassword;
            return true;
        }
        return false;
    }
};
