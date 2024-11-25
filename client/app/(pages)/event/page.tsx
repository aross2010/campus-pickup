import React from 'react'
import Image from 'next/image';

export default function GamesFeed() {
    return (
        <div className="min-h-screen w-full">
            <div className="relative w-full h-[450px]">
                <Image
                    src="/background.png"
                    alt="Games Banner"
                    fill
                    objectFit="cover"
                />
                <div className="w-full absolute top-0 left-0 text-center mt-10">
                    <h1 className="text-4xl mt-[120px] font-bold text-white text-center">Your Next Match Starts Here</h1>
                    <p className="text-sm mt-5 text-gray-100/60 text-center">Play a sport you love or discover a new one</p>
                </div>
                <button className="absolute bottom-[100px] left-1/2 -translate-x-1/2 text-white font-bold rounded-md px-4 py-2 bg-gradient-to-r from-[#e5a823] to-[#e57a23]">
                    Create a new game
                </button>
            </div>

            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 w-[800px] mx-auto dark:text-gray-400 dark:border-gray-700">
                <ul className="flex justify-between -mb-px">
                    <li className="flex-1 text-center">
                        <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">For you</a>
                    </li>
                    <li className="flex-1 text-center">
                        <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">All games</a>
                    </li>
                </ul>
            </div>

        </div>
    )
}