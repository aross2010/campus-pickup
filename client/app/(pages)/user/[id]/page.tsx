'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    firstName: string;
    lastName: string;
    bio?: string;
    major?: string;
    favoriteSports?: string[];
    schoolYear?: string;
    profileImage?: string;
    coverImage?: string;
    skillLevel: string;
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

const sportsList = [
    'Badminton', 'Baseball', 'Basketball', 'Cricket', 'FlagFootball',
    'Frisbee', 'Golf', 'PickleBall', 'Running', 'Soccer', 'Softball',
    'Swimming', 'TableTennis', 'Tennis', 'Volleyball'
];

export default function UserProfile({ params }: { params: { id: string } }) {
    const { id } = params;
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<User>({
        firstName: '',
        lastName: '',
        bio: '',
        profileImage: '',
        coverImage: '',
        schoolYear: '',
        major: '',
        skillLevel: '',
        favoriteSports: [],
    });
    const [isEditing, setIsEditing] = useState(false);
    const [previewProfile, setPreviewProfile] = useState<string | null>(null);
    const [previewBanner, setPreviewBanner] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:3000/user/${id}`)
                .then((response) => {
                    setUser(response.data);
                    setUserData({
                        ...response.data,
                        firstName: response.data.firstName || '',
                        lastName: response.data.lastName || '',
                        bio: response.data.bio || '',
                        profileImage: response.data.profileImage || '',
                        coverImage: response.data.coverImage || '',
                        schoolYear: response.data.schoolYear || '',
                        major: response.data.major,
                        skillLevel: response.data.skillLevel,
                        favoriteSports: response.data.favoriteSports || [],
                    });
                })
                .catch((error) => {
                    setError('User not found');
                });
        }
    }, [id]);


    const handleEditClick = () => {
        setIsEditing(true); // Enable edit mode
    };

    const handleSaveChanges = async () => {
        const updatedUserData = {
            ...user,
            profileImage: previewProfile || user?.profileImage,
            coverImage: previewBanner || user?.coverImage,
            favoriteSports: userData.favoriteSports,
        };

        // Get the token (from localStorage or wherever you're storing it)
        const token = localStorage.getItem('authToken');  // or use cookies/sessionStorage if needed

        if (!token) {
            alert('No authentication token found');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/user/${id}`, updatedUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Add the token in the Authorization header
                }
            });
            setUser(response.data);
            alert('Profile updated successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to update profile');
        }
    };


    const handleCancelEdit = () => {
        setIsEditing(false);
    };


    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewProfile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBannerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewBanner(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission
        handleSaveChanges(); // Call the save changes function
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full min-h-screen mb-20">
            {/* Conditionally render the layout based on isEditing */}
            {isEditing ? (
                <div className="flex items-center justify-center min-h-screen py-[50px]">
                    <form onSubmit={handleSubmit} className="w-[900px] bg-white p-[60px] drop-shadow-lg rounded-lg m-10">
                        <h1 className="text-3xl font-bold text-gray-700 mb-5"> Setting Up Your Profile</h1>
                        <div className="relative w-full h-[450px]">
                            <div className="relative w-full h-[250px] bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-400 mb-8 rounded-lg">
                                {previewBanner ? (
                                    <img src={previewBanner || user?.coverImage} alt="Banner Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-500">No Banner Image</span>
                                )}
                                <label
                                    htmlFor="banner-image-upload"
                                    className="absolute bottom-4 right-4 px-5 py-2 bg-[#939597] text-white text-sm font-semibold rounded-lg hover:bg-gray-600 transition duration-300 cursor-pointer"
                                >
                                    Upload Banner
                                </label>
                                <input
                                    type="file"
                                    id="banner-image-upload"
                                    accept="image/*"
                                    onChange={handleBannerImageChange}
                                    className="hidden"
                                />
                            </div>

                            <div className="absolute top-[50px] left-9">
                                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-400 mb-4">
                                    {previewProfile ? (
                                        <img src={previewProfile || user?.profileImage} alt="Profile Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-500">No Image</span>
                                    )}
                                </div>
                                <label
                                    htmlFor="profile-pic-upload"
                                    className="absolute bottom-[16px] left-[40px] bg-opacity-70 p-2 cursor-pointer"
                                >
                                    <svg
                                        className="w-8 h-8 text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinejoin="round"
                                            stroke-width="2"
                                            d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
                                        />
                                        <path
                                            stroke="currentColor"
                                            strokeLinejoin="round"
                                            stroke-width="2"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                </label>
                                <input
                                    type="file"
                                    id="profile-pic-upload"
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-5">
                            <label htmlFor="bio" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Bio</label>
                            <textarea
                                id="bio"
                                value={user.bio}
                                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                className="py-5 px-4 mb-3 bg-white rounded-lg border border-gray-400 text-sm text-gray-900 focus:ring-0 focus:outline-none"
                                placeholder="Something about yourself"
                            />
                        </div>

                        <div className="flex flex-wrap space-x-10 mb-5">
                            <div className="flex-1 w-1/3">
                                <label htmlFor="userFirstName" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">First Name</label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={userData.firstName}
                                    onChange={(e) => setUser({ ...userData, firstName: e.target.value })}
                                />
                            </div>

                            {/* Last Name */}
                            <div className="flex-1 w-1/3">
                                <label htmlFor="userLastName" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Last Name</label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={userData.lastName}
                                    onChange={(e) => setUser({ ...userData, lastName: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap space-x-10 mb-5">
                            <div className="flex-1 w-1/3">
                                <label htmlFor="major" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Major
                                </label>
                                <input
                                    value={userData.major}
                                    onChange={(e) => setUser({ ...userData, major: e.target.value })}
                                    className="appearance-none block w-full border border-gray-400 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="major" type="text" placeholder="Major" required />
                            </div>
                            <div className="w-1/3 inline-block relative">
                                <label htmlFor="schoolYear" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    School Year
                                </label>
                                <select value={userData.schoolYear}
                                    onChange={(e) => setUser({ ...userData, schoolYear: e.target.value })}
                                    className="block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none">
                                    <option>Freshman</option>
                                    <option>Sophomore</option>
                                    <option>Junior</option>
                                    <option>Senior</option>
                                    <option>Graduate</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                            <div className="w-1/3 inline-block relative">
                                <label htmlFor="skillLevel" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Skill Level
                                </label>
                                <select value={userData.skillLevel} onChange={(e) => setUser({ ...userData, skillLevel: e.target.value })} className="block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none">
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sports-interested" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Sports Interested
                            </label>
                            <div>
                                {sportsList.map((sport) => (
                                    <div key={sport} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={sport}
                                            name="favoriteSports"
                                            value={sport}
                                            checked={(userData.favoriteSports ?? []).includes(sport)} // Ensure it's never undefined
                                            onChange={(e) => {
                                                setUserData((prevData) => {
                                                    const favoriteSports = prevData.favoriteSports ?? []; // Default to an empty array

                                                    if (e.target.checked) {
                                                        // Add sport if checked
                                                        return {
                                                            ...prevData,
                                                            favoriteSports: [...favoriteSports, sport],
                                                        };
                                                    } else {
                                                        // Remove sport if unchecked
                                                        return {
                                                            ...prevData,
                                                            favoriteSports: favoriteSports.filter((item) => item !== sport),
                                                        };
                                                    }
                                                });
                                            }}
                                        />
                                        <label htmlFor={sport} className="ml-2">{sport}</label>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Save/Cancel Buttons */}
                        <div className="flex space-x-4">
                            <button
                                onClick={handleSaveChanges}
                                className="px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg hover:text-[#d78a22] transition duration-300"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="px-6 py-3 bg-gray-400 text-white text-lg font-semibold rounded-lg hover:bg-gray-600 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            ) : (
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

                            <button onClick={handleEditClick} className="px-9 py-3 bg-black text-white text-lg font-semibold rounded-lg hover:text-[#d78a22] transition duration-300">
                                Edit Profile
                            </button>

                        </div>
                    </div>

                    <div className="space-y-2 mt-4 mx-[50px] mb-20">
                        <h1 className="text-5xl mb-[30px] font-bold text-white">{user.school?.name}</h1>
                        <h3 className="text-2xl font-bold text-white">{user.schoolYear}</h3>
                        <h3 className="text-2xl font-bold text-white">
                            {user.favoriteSports && user.favoriteSports.length > 0
                                ? user.favoriteSports.join(', ')
                                : 'No sports selected'}
                        </h3>
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
            )}
        </div>
    );
}
