import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="fixed top-0 w-full flex items-center justify-between px-6 bg-black py-4 z-50">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/" className="text-2xl font-extrabold text-[#e5a823]">
          CampusPickup
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow flex justify-center space-x-10">
        <Link href="/event" className="text-m font-semibold text-white">
          Games
        </Link>
        <Link href="/community" className="text-m font-semibold text-white">
          Community
        </Link>
        <Link href="/sports" className="text-m font-semibold text-white">
          Sports
        </Link>
      </div>

      {/* Sign Up */}
      <div className="flex-shrink-0">
        <Link href="/signup" className="text-m font-semibold text-white">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
