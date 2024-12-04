'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

interface Event {
    id: string;  // Prisma generates a string-based ObjectId
    title: string;
    description: string;
    date: string;  // You can convert DateTime to string or use Date object as needed
    location: string;
    skillLevel: string;
    sport: string;
    coed: boolean;
    schoolId: string;
    hostId: string;
    maxPlayers: number;
    usersJoinedIds: string[];
}

export default function GamesFeed() {
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('all'); // State to manage active tab

    // Sample card data for each tab
    const gamesForYou = [
        { id: 1, title: 'Football Match', description: 'Join a local football match.', date: 'Fri Dec 15, 2024', time: '7:00PM', location: 'SJSU SRAC Court 1', sport: 'Basket Ball', maxPlayers: '10', currentPlayers: '7', skill: 'Beginner', host: 'Alex Ross' },
        { id: 2, title: 'Basketball Game', description: 'Play a friendly basketball game.' },
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/events');
                setAllEvents(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch events');
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div>{error}</div>;  // Display the error message if present
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center">
            {/* Banner */}
            <div className="relative w-full h-[450px]">
                <Image
                    src="/gamesbanner.png"
                    alt="Games Banner"
                    fill
                    objectFit="cover"
                    className="opacity-70"
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
                            className={`w-full p-4 border-b-2 rounded-t-lg ${activeTab === 'forYou'
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
                            className={`w-full p-4 border-b-2 rounded-t-lg ${activeTab === 'all'
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
            <div className="w-[800px] mb-[100px] flex flex-col gap-4 py-6">
                {activeTab === 'forYou' &&
                    gamesForYou.map((game) => (
                        <div
                            key={game.id}
                            className="rounded-lg shadow-lg p-4 bg-gray-800"
                        >
                            <div className="flex justify-between mb-4">
                                <div className="flex flex-col">
                                    <p className="text-m text-white flex items-center gap-2">
                                        <svg
                                            className="h-5 w-5 text-[#e5a823]"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="M9 3.6c5 6 7 10.5 7.5 16.2" />
                                            <path d="M6.4 19c3.5-3.5 6-6.5 14.5-6.4" />
                                            <path d="M3.1 10.75c5 0 9.814-.38 15.314-5" />
                                        </svg>
                                        {game.sport}
                                    </p>

                                    <p className="text-m text-white flex items-center gap-2">
                                        <svg
                                            className="h-5 w-5 text-[#e5a823]"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <circle cx="12" cy="5" r="2" />
                                            <path d="M10 22v-5l-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4l-1 1v5" />
                                        </svg>
                                        {game.currentPlayers}/{game.maxPlayers} Players
                                    </p>

                                    <p className="text-m text-white flex items-center gap-2">
                                        <svg
                                            className="h-5 w-5 text-yellow-500"
                                            fill="#e5a823"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        {game.skill}
                                    </p>

                                </div>

                                <div className="flex flex-col items-end">
                                    {/* Add additional properties if needed */}
                                    <p className="text-m text-gray-400 uppercase font-semibold">{game.date}</p>
                                    <p className="text-m text-gray-400 font-semibold">{game.time}</p>
                                    <p className="text-m text-gray-400 uppercase font-semibold">{game.location}</p>
                                </div>
                            </div>
                            {/* Title and Description */}
                            <h2 className="text-2xl font-bold text-white">{game.title}</h2>
                            <p className="text-m text-gray-400 mt-2">{game.description}</p>
                            <p className="text-m text-gray-400 mt-2">Hosted by: <a className='text-white font-medium'>{game.host}</a></p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="bg-gradient-to-r from-[#e5a823] to-[#e57a23] text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 font-semibold"
                                    onClick={() => alert(`Joined the game: ${game.title}`)}
                                >
                                    Reserve your spot
                                </button>
                            </div>
                        </div>
                    ))}

                {activeTab === 'all' &&
                    allEvents.map((event) => (
                        <div
                            key={event.id}
                            className="rounded-lg shadow-lg p-4 bg-gray-800"
                        >
                            <div className="flex justify-between mb-4">
                                <div className="flex flex-col">
                                    <p className="text-m text-white flex items-center gap-2">
                                        <svg
                                            className="h-5 w-5 text-[#e5a823]"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="M9 3.6c5 6 7 10.5 7.5 16.2" />
                                            <path d="M6.4 19c3.5-3.5 6-6.5 14.5-6.4" />
                                            <path d="M3.1 10.75c5 0 9.814-.38 15.314-5" />
                                        </svg>
                                        {event.sport}
                                    </p>

                                    <p className="text-m text-white flex items-center gap-2">
                                        <svg
                                            className="h-5 w-5 text-[#e5a823]"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <circle cx="12" cy="5" r="2" />
                                            <path d="M10 22v-5l-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4l-1 1v5" />
                                        </svg>
                                        {event.usersJoinedIds.length}/{event.maxPlayers} Players
                                    </p>

                                    <p className="text-m text-white flex items-center gap-2">
                                        <svg
                                            className="h-5 w-5 text-yellow-500"
                                            fill="#e5a823"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        {event.skillLevel}
                                    </p>

                                </div>

                                <div className="flex flex-col items-end">
                                    {/* Add additional properties if needed */}
                                    <p className="text-m text-gray-400 uppercase font-semibold">{new Date(event.date).toISOString().split('T')[0]}</p>
                                    <p className="text-m text-gray-400 uppercase font-semibold">{new Date(event.date).toISOString().split('T')[1].split('.')[0]}</p>
                                    <p className="text-m text-gray-400 uppercase font-semibold">{event.location}</p>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white">
                                <Link href={`/event/${event.id}`}>
                                    {event.title}
                                </Link></h2>
                            <p className="text-m text-gray-400 mt-2">{event.description}</p>
                            <p className="text-m text-gray-400 mt-2">Hosted by: <a className='text-white font-medium'>{event.id}</a></p>
                            <div className="mt-9 flex justify-between">
                                <button
                                    className="bg-gradient-to-r from-[#e5a823] to-[#e57a23] text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 font-semibold"
                                    onClick={() => alert(`Joined the game: ${event.title}`)}
                                    disabled={event.usersJoinedIds.length >= event.maxPlayers}
                                >
                                    Reserve your spot
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
