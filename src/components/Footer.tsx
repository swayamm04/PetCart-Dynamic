import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#EFC41A] text-gray-900 text-sm md:text-base">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
              <span className="text-2xl md:text-3xl font-black tracking-tight">
                HomeRun
              </span>
            </div>
            <p className="text-gray-900/80 mb-6 md:mb-8 max-w-sm font-medium leading-relaxed text-xs md:text-base">
              Serving Shimoga with love ❤️ <br />
              Construction & Interior Materials delivered in minutes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-black/5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors">
                <Instagram className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-black/5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors">
                <Facebook className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-black/5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors">
                <Twitter className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 uppercase tracking-wider text-gray-900/90">Company</h4>
            <ul className="space-y-2 md:space-y-4 font-medium text-xs md:text-base">
              <li><a href="#" className="hover:text-black hover:translate-x-1 transition-all inline-block">About Us</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-1 transition-all inline-block">Careers</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-1 transition-all inline-block">Press</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-1 transition-all inline-block">Partner with us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 uppercase tracking-wider text-gray-900/90">Resources</h4>
            <ul className="space-y-2 md:space-y-4 font-medium text-xs md:text-base">
              <li><a href="#" className="hover:text-black hover:translate-x-1 transition-all inline-block">Blog</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-1 transition-all inline-block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-1 transition-all inline-block">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-1 transition-all inline-block">Shipping Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 uppercase tracking-wider text-gray-900/90">Contact</h4>
            <ul className="space-y-2 md:space-y-4 font-medium text-xs md:text-base">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0 mt-0.5 md:mt-1" />
                <span>LBSnagar, Shimoga, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0" />
                <span>+91 99999 99999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0" />
                <span>support@homerun.co</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-black/10 mt-8 md:mt-16 pt-4 md:pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-sm font-semibold opacity-75">
          <p>© {new Date().getFullYear()} HomeRun. All rights reserved.</p>
          <Link to="/admin/login" className="hover:text-black transition-colors opacity-50 hover:opacity-100">
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
