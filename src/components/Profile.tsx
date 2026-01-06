import { User, MapPin, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react";

const Profile = () => {
    const menuItems = [
        { icon: MapPin, label: "My Addresses" },
        { icon: Settings, label: "Settings" },
        { icon: HelpCircle, label: "Help & Support" },
        { icon: LogOut, label: "Logout", className: "text-red-500" },
    ];

    return (
        <div className="bg-gray-50 flex flex-col animate-in fade-in duration-300 min-h-[calc(100vh-180px)] mb-20">
            {/* Alter header padding (p-6 pb-10) and rounded corner (rounded-b-[2.5rem]) here */}
            <div className="bg-white p-6 pb-10 rounded-b-[2.5rem] shadow-sm mb-6">
                <div className="flex flex-col items-center">
                    {/* Alter avatar size (w-24 h-24) or border thickness (border-4) here */}
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-5 border-4 border-white shadow-md">
                        <User className="w-10 h-10 text-gray-400" />
                    </div>
                    {/* Alter name font size (text-xl) here */}
                    <h2 className="text-xl font-black text-gray-900 mb-1">Guest User</h2>
                    <p className="text-gray-500 text-sm font-medium">+91 99999 99999</p>
                </div>
            </div>

            <div className="px-5 space-y-4">
                <div className="bg-white rounded-[1.5rem] shadow-sm overflow-hidden border border-gray-100">
                    {menuItems.map((item, idx) => (
                        <div
                            key={idx}
                            /* Alter menu item padding (p-4) below */
                            className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                {/* Alter menu icon container size (w-9 h-9) here */}
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.className ? "bg-red-50" : "bg-gray-50"}`}>
                                    <item.icon className={`w-4 h-4 ${item.className || "text-gray-600"}`} />
                                </div>
                                {/* Alter label font size (text-sm) and weight (semibold) here */}
                                <span className={`font-semibold text-sm ${item.className || "text-gray-900"}`}>{item.label}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
