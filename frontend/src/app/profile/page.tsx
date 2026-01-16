import { Suspense } from "react";
import { UserProfile } from "@/components/features/profile/UserProfile";

export default function ProfilePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div></div>}>
            <UserProfile />
        </Suspense>
    );
}
