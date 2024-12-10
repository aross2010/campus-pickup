'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface User {
    firstName: string;
    lastName: string;
    bio?: string;
    major?: string;
    favoriteSports?: string[];
    schoolYear?: string;
    profileImage?: string;
    coverImage?: string;
    school?: {
        name: string;
        year: string;
    };
    eventsHosted?: Event[];
    eventsJoined?: Event[];
    eventsWaiting?: Event[];
    comments?: Comment[];
}

interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description?: string;
}

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    userId: string;
    eventId: string;
}

export default function UserProfile({ params }: { params: { id: string } }) {
    const { id } = params;

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:3000/user/${id}`)
                .then((response) => {
                    setUser(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    setError('User not found');
                });
        }
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full min-h-screen mb-20">
            <div
                className="w-full h-[450px] relative"
                style={{
                    backgroundImage: `url(${user.coverImage || 'https://via.placeholder.com/1600x450?text=Cover+Image'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute top-4 left-4 flex flex-col items-center">
                    <img
                        src={user.profileImage || "https://imageio.forbes.com/specials-images/imageserve/61290485e59b1a3c399d34e7/0x0.jpg?format=jpg&crop=2699,1519,x0,y0,safe&height=900&width=1600&fit=bounds"}
                        className="object-cover w-[200px] h-[200px] mt-[70px] mx-[20px] border-4 rounded-full"
                        alt="User Profile Image"
                    />
                    <span className="mt-5 text-white text-3xl font-semibold">{user.firstName} {user.lastName}</span>
                </div>

                <div className="absolute bottom-4 w-full flex justify-between items-center px-8">
                    <div className="w-[70%] h-[70px] p-4">
                        <p className="text-white text-m font-semibold">{user.bio}</p>
                    </div>
                    <Link href={`/user/settings`}>
                        <button className="px-9 py-3 bg-black text-white text-lg font-semibold rounded-lg hover:text-[#d78a22] transition duration-300">
                            Edit Profile
                        </button>
                    </Link>
                </div>
            </div>

            <div className="space-y-2 mt-4 mx-[50px] mb-20">
                <h1 className="text-5xl mb-[30px] font-bold text-white">{user.school?.name}</h1>
                <h3 className="text-2xl font-bold text-white">{user.schoolYear}</h3>
                <h3 className="text-2xl font-bold text-white">{user.favoriteSports?.join(', ')}</h3>
            </div>

            <div className="w-full flex justify-between items-center px-10 py-10">
                <div className="w-[100%] h-[500px] border-4 p-4 rounded-lg shadow-md">
                    <h3 className="text-white text-3xl text-center font-semibold mb-6">
                        Activity Feed
                    </h3>

                    <div className="grid grid-cols-2 gap-6 text-white">
                        <div className="space-y-4 p-4 rounded-lg bg-gray-800">  {/* Added background color */}
                            <h2 className="text-2xl font-bold text-white">Hosted Events</h2>
                            {user.eventsHosted && user.eventsHosted.length > 0 ? (
                                user.eventsHosted.map((event) => (
                                    <div key={event.id} className="event">
                                        <h4 className="text-2xl font-bold">{event.title}</h4>
                                        <p>{event.location}</p>
                                        <p>{new Date(event.date).toISOString().split('T')[0]}</p>
                                        <p>{new Date(event.date).toISOString().split('T')[1].split('.')[0]}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No events hosted.</p>
                            )}
                        </div>

                        <div className="space-y-4 p-4 rounded-lg bg-blue-800">  {/* Added background color */}
                            <h2 className="text-2xl font-bold text-white">Joined Events</h2>
                            {user.eventsJoined && user.eventsJoined.length > 0 ? (
                                user.eventsJoined.map((event) => (
                                    <div key={event.id} className="event">
                                        <h4 className="text-lg font-bold">{event.title}</h4>
                                        <p>{event.location}</p>
                                        <p>{new Date(event.date).toISOString().split('T')[0]}</p>
                                        <p>{new Date(event.date).toISOString().split('T')[1].split('.')[0]}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No events joined.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
