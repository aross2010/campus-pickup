'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function GamesFeed() {
    const [activeTab, setActiveTab] = useState('all'); // State to manage active tab

    // Sample card data for each tab
    const gamesForYou = [
        { id: 1, title: 'Football Match', description: 'Join a local football match.' },
        { id: 2, title: 'Basketball Game', description: 'Play a friendly basketball game.' },
    ];

    const allGames = [
        { id: 3, title: 'Tennis Match', description: 'Play a singles or doubles match.' },
        { id: 4, title: 'Running Group', description: 'Join a running group for fitness.' },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col items-center">
            {/* Banner */}
            <div className="relative w-full h-[450px] bg-gray-800">
            <Image
                    src="/gamesbanner.png"
                    alt="Games Banner"
                    fill
                    objectFit="cover"
                    className="opacity-60"
                />
                <div className="w-full absolute top-0 left-0 text-center mt-10">
                    <h1 className="text-4xl mt-[120px] font-bold text-white text-center">Your Next Match Starts Here</h1>
                    <p className="text-sm mt-5 text-gray-100/60 text-center">Play a sport you love or discover a new one</p>
                </div>
                <a href="event/create" className="absolute bottom-[100px] left-1/2 -translate-x-1/2 text-white font-bold rounded-md px-4 py-2 bg-gradient-to-r from-[#e5a823] to-[#e57a23]">
                    Create a new game
                </a>
            </div>

            {/* Tabs */}
            <div className="text-lg font-medium text-center text-gray-600 border-b border-gray-200 w-[800px] dark:text-gray-400 dark:border-gray-700">
                <ul className="flex justify-between -mb-px">
                    <li className="flex-1 text-center">
                        <button
                            onClick={() => setActiveTab('forYou')}
                            className={`w-full p-4 border-b-2 rounded-t-lg ${
                                activeTab === 'forYou'
                                    ? 'text-[#e5a823] text-lg font-bold border-[#e5a823]'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                            }`}
                        >
                            For you
                        </button>
                    </li>
                    <li className="flex-1 text-center">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`w-full p-4 border-b-2 rounded-t-lg ${
                                activeTab === 'all'
                                    ? 'text-[#e5a823] text-lg font-bold border-[#e5a823]'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                            }`}
                        >
                            All games
                        </button>
                    </li>
                </ul>
            </div>

            {/* List of cards of games */}
            <div className="w-[800px] flex flex-col gap-4 py-6">
                {activeTab === 'forYou' &&
                    gamesForYou.map((game) => (
                        <div
                            key={game.id}
                            className="rounded-lg shadow-lg p-4 bg-gray-600"
                        >
                            <h2 className="text-2xl font-bold text-white">{game.title}</h2>
                            <p className="text-m text-gray-400 mt-2">{game.description}</p>
                        </div>
                    ))}

                {activeTab === 'all' &&
                    allGames.map((game) => (
                        <div
                            key={game.id}
                            className="rounded-lg shadow-lg p-4 bg-gray-600"
                        >
                            <h2 className="text-2xl font-bold text-white">{game.title}</h2>
                            <p className="text-m text-gray-400 mt-2">{game.description}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
