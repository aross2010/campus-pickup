import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="fixed top-0 w-full flex items-center justify-between px-6 bg-black-100 py-4">
      <div className="flex-shrink-0">
        <Link href="/" className="text-2xl font-extrabold text-[#e5a823]">CampusPickup</Link>
      </div>

      <div className="flex-grow text-center space-x-10">
        <Link href="event" className="text-m font-semibold">Games</Link>
        <Link href="event" className="text-m font-semibold">Community</Link>
        <Link href="event" className="text-m font-semibold">Sports</Link>
      </div>

      <div className="flex-shrink-0">
        <Link href="signup" className="text-m font-semibold">Sign Up</Link>
      </div>
    </div>
  )
}
