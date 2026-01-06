import { useState, useEffect } from "react";

const AnnouncementBar = () => {
  const announcements = [
    "Open 8am to 8pm (All Days)",
    "Free delivery for orders above Rs 10,000 ",
    "Serving Shimoga with ❤️",
    "1st delivery free with \"FreeRun\" ",
    "Superfast delivery in minutes ",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="bg-primary py-2.5 overflow-hidden relative min-h-[40px] flex items-center justify-center">
      <div
        key={currentIndex}
        className="text-primary-foreground text-xs md:text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-500 text-center px-4"
      >
        {announcements[currentIndex]}
      </div>
    </div>
  );
};

export default AnnouncementBar;
