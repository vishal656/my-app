import React from 'react';
import { BsBag } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BsBag className="text-3xl text-orange-500" />
            <h1 className="text-2xl font-bold">VishalMegaMart</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in
            gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at
            amet.
          </p>
        </div>

        {/* About Us */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">About Us</h2>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Our Stores</li>
            <li className="hover:text-white cursor-pointer">Our Cares</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Customer Care</h2>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">How to Buy</li>
            <li className="hover:text-white cursor-pointer">Track Your Order</li>
            <li className="hover:text-white cursor-pointer">Corporate & Bulk Purchasing</li>
            <li className="hover:text-white cursor-pointer">Returns & Refunds</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li>70 Washington Square South, New York, NY 10012, United States</li>
            <li>Email: uilib.help@gmail.com</li>
            <li>Phone: +1 1123 456 780</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
