'use client';

import axios from 'axios';
import React, { useState } from 'react';

export default function CreateEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [sport, setSport] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const [maxPlayers, setMaxPlayers] = useState('');
    const [location, setLocation] = useState('');
    const [coed, setCoed] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if each field is filled in and provide more specific error messages
        if (!title) {
            setError('Event name is required.');
            return;
        }
        if (!description) {
            setError('Description is required.');
            return;
        }
        if (!date) {
            setError('Date is required.');
            return;
        }
        if (!startTime) {
            setError('Start time is required.');
            return;
        }
        if (!sport) {
            setError('Sport is required.');
            return;
        }
        if (!skillLevel) {
            setError('Skill level is required.');
            return;
        }
        if (!maxPlayers) {
            setError('Number of players is required.');
            return;
        }
        if (!location) {
            setError('Location is required.');
            return;
        }

        // If all fields are filled, reset error and proceed
        setError('');

        // Combine the date and time
        const combinedDateTime = new Date(`${date}T${startTime}:00`);

        const eventData = {
            title,
            description,
            date: combinedDateTime.toISOString(),
            sport,
            skillLevel,
            location,
            coed,
            maxPlayers,
        };

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('You must be logged in to create an event.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/event', eventData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert(`Event created successfully: ${response.data.message}`);
            console.log(eventData);
           
        } catch (err) {
            setError('Error creating event.');
            console.log(err)
        }
    };

    return (
        <div className="w-full h-full bg-[url('/background.png')]">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="flex items-center justify-center h-screen">
                <form onSubmit={handleSubmit} className="w-[900px] h-[670px] bg-white p-[60px] drop-shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-700 mb-5 text-center"> Create a New Game</h1>
                    <div className="flex flex-wrap space-x-10 mb-5">
                        <div className="flex-1 w-1/3">
                            <label htmlFor="eventTitle" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Event Name
                            </label>
                            <input
                                name="title"
                                className="appearance-none block w-full border border-gray-400 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="eventTitle"
                                type="text"
                                placeholder="Name your game"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap space-x-10 mb-5">
                        <div className="w-1/3 inline-block relative">
                            <label htmlFor="sport" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Sport
                            </label>
                            <select
                                id="sport"
                                name="sport"
                                value={sport}
                                onChange={(e) => setSport(e.target.value)}
                                className="block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none">
                                <option>Badminton</option>
                                <option>Baseball</option>
                                <option>Basketball</option>
                                <option>Cricket</option>
                                <option>FlagFootball</option>
                                <option>Frisbee</option>
                                <option>Golf</option>
                                <option>PickleBall</option>
                                <option>Running</option>
                                <option>Soccer</option>
                                <option>Softball</option>
                                <option>Swimming</option>
                                <option>TableTennis</option>
                                <option>Tennis</option>
                                <option>Volleyball</option>
                            </select>
                        </div>

                        <div className="w-1/3 inline-block relative">
                            <label htmlFor="skillLevel" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Skill Level
                            </label>
                            <select
                                id="skillLevel"
                                name="skillLevel"
                                value={skillLevel}
                                onChange={(e) => setSkillLevel(e.target.value)}
                                className="block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <div className="w-1/2 flex-1">
                            <label htmlFor="maxPlayers" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Number of players
                            </label>
                            <input
                                id="maxPlayers"
                                name="maxPlayers"
                                value={maxPlayers}
                                onChange={(e) => setMaxPlayers(e.target.value)}
                                className="mb-3 appearance-none block w-full border border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Enter a number" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-5">
                        <label
                            htmlFor="description"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            className="py-5 px-4 mb-3 bg-white rounded-lg border border-gray-400 text-sm text-gray-900 focus:ring-0 focus:outline-none"
                            placeholder="Something about your game"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="flex flex-wrap space-x-10 mb-5">
                        <div className="w-1/3 flex-1">
                            <label htmlFor="date" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Date
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    className="mb-3 text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Select date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-1/3 flex-1">
                            <label htmlFor="time" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Time
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" className="text-gray-500">
                                        <path fill="currentColor" d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M1.5 8a6.5 6.5 0 1 0 13 0a6.5 6.5 0 0 0-13 0m7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.75.75 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0" />
                                    </svg>
                                </div>
                                <input
                                    name="eventTime"
                                    type="time"
                                    id="time"
                                    className="mb-3 rounded-lg border leading-none focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 pl-10 p-2.5"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="w-1/3">
                            <label htmlFor="location" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Location
                            </label>
                            <input
                                name="location"
                                type="text"
                                id="location"
                                className="mb-3 rounded-lg border leading-none focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 p-2.5"
                                placeholder="Location of your game"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button type="submit" className="text-white bg-[#0055a2] focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-m px-5 py-2.5 mx-auto mt-5 block">
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    );
}
