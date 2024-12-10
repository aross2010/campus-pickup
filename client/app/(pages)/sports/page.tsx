'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const EventsPage = () => {
    const [events, setEvents] = useState<any[]>([]); 
    const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
    const [selectedSports, setSelectedSports] = useState<string[]>([]); 
    const [loading, setLoading] = useState<boolean>(false); 
    const [error, setError] = useState<string>(""); 

    //Define sports
    const sports = [
        "Badminton",
        "Baseball",
        "Basketball",
        "Cricket",
        "FlagFootball",
        "Frisbee",
        "Golf",
        "PickleBall",
        "Running",
        "Soccer",
        "Softball",
        "Swimming",
        "TableTennis",
        "Tennis",
        "Volleyball"
    ];

    // Fetch all events
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await axios.get("http://localhost:3000/events");
                setEvents(response.data);
                setFilteredEvents(response.data); // Set all events initially
            } catch (err) {
                console.error("Failed to fetch events:", err);
                setError("Failed to load events.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Filter events by sport
    const filterBySports = (sports: string[]) => {
        if (sports.length === 0) {
            setFilteredEvents(events); // Reset to all events if no sports selected
        } else {
            setFilteredEvents(events.filter((event) => sports.includes(event.sport)));
        }
    };

    // Handle sport filter change
    const handleSportChange = (sport: string) => {
        setSelectedSports((prevSelectedSports) => {
            if (prevSelectedSports.includes(sport)) {
                return prevSelectedSports.filter((item) => item !== sport); 
            } else {
                return [...prevSelectedSports, sport]; 
            }
        });
    };

    useEffect(() => {
        filterBySports(selectedSports); 
    }, [selectedSports, events]);

    return (
        <div className="min-h-screen w-full flex flex-col items-center mb-[80px]">
            {/* Banner */}
            <div className="relative w-full h-[300px]">
                <Image
                    src="/gamesbanner.png"
                    alt="Games Banner"
                    fill
                    objectFit="cover"
                    className="opacity-70"
                />
                <div className="w-full absolute top-0 left-0 text-center mt-10">
                    <h1 className="text-4xl mt-[120px] font-bold text-white text-center">
                        Explore All Sports
                    </h1>
                    <p className="text-m mt-5 text-gray-100/60 text-center">
                        Explore and connect with all students
                    </p>
                </div>
            </div>

            <div className="container mx-auto p-4 text-white flex">
                {/* Filter Sidebar */}
                <div className="w-1/6 mt-2 bg-gray-800 p-4 rounded-lg mr-6">
                    <h2 className="text-2xl font-bold mb-4">Filter by Sport</h2>
                    <div className="space-y-2 text-lg font-semibold">
                        {sports.map((sport) => (
                            <div key={sport} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={sport}
                                    checked={selectedSports.includes(sport)}
                                    onChange={() => handleSportChange(sport)}
                                    className="mr-2 accent-orange-300/50"
                                />
                                <label htmlFor={sport}>{sport}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Events List */}
                <div className="w-5/6">
                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    {/* Loading Spinner */}
                    {loading && <p>Loading events...</p>}

                    {/* Events Grid */}
                    <div className="mt-2 mb-3">
                        {filteredEvents.length > 0 ? (
                            <div>
                                <h2 className="text-3xl font-semibold mb-2">
                                    {selectedSports.length > 0
                                        ? `Events for ${selectedSports.join(", ")}`
                                        : "All Events"}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            className="rounded-lg shadow-lg p-6 bg-gray-800 text-white"
                                        >
                                            <div className="flex justify-between mb-4">
                                                <div className="flex flex-col">
                                                    <p className="text-sm text-white flex items-center gap-2">
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

                                                    <p className="text-md text-white flex items-center gap-2">
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

                                                    <p className="text-sm text-white flex items-center gap-2">
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
                                                    <p className="text-sm text-gray-400 uppercase font-semibold">
                                                        {new Date(event.date).toISOString().split('T')[0]}
                                                    </p>
                                                    <p className="text-sm text-gray-400 uppercase font-semibold">
                                                        {new Date(event.date).toISOString().split('T')[1].split('.')[0]}
                                                    </p>
                                                    <p className="text-sm text-gray-400 uppercase font-semibold">
                                                        {event.location}
                                                    </p>
                                                </div>
                                            </div>

                                            <h2 className="text-2xl font-bold text-white">
                                                <Link href={`/event/${event.id}`}>{event.title}</Link>
                                            </h2>

                                            <p className="text-md text-gray-400 mt-2">{event.description}</p>
                                            <p className="text-md text-gray-400 mt-2">
                                                Hosted by: <a className="text-white font-medium">{event.id}</a>
                                            </p>

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
                        ) : (
                            !loading && <p>No events found for this sport.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
