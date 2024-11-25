import React, { useState } from 'react'

export default function CreateEvent() {

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="w-[900px] h-2/3 bg-white p-8 shadow-md rounded-lg p-20">
                <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center"> Create a New Game</h1>
                <div className="flex flex-wrap space-x-10 mb-5">
                    <div className="flex-1 w-1/3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Event Name
                        </label>
                        <input className="appearance-none block w-full border border-gray-400 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="eventName" type="text" placeholder="Tennis Game" required />

                    </div>
                    <div className="w-1/3 inline-block relative">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Sport
                        </label>

                        <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>Select Sport</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    <div className="w-1/3 inline-block relative">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Skill Level
                        </label>
                        <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>Select Skill</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap space-x-10 mb-5">
                    <div className="w-1/3 flex-1">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Date
                        </label>

                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <input type="date" className="text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Select date" />
                        </div>
                    </div>
                    <div className="w-1/3 flex-1">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Start Time
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M1.5 8a6.5 6.5 0 1 0 13 0a6.5 6.5 0 0 0-13 0m7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.75.75 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0" /></svg>
                            </div>
                            <input type="time" id="startTime" className="rounded-none rounded-s-lg border leading-none focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 ps-10 p-2.5" min="09:00" max="18:00" value="00:00" required />
                        </div>
                    </div>
                    <div className="w-1/3 flex-1">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            End Time
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M1.5 8a6.5 6.5 0 1 0 13 0a6.5 6.5 0 0 0-13 0m7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.75.75 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0" /></svg>
                            </div>
                            <input type="time" id="endTime" className="rounded-none rounded-e-lg border leading-none focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 ps-10 p-2.5" min="09:00" max="18:00" value="00:00" required />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap space-x-20 mx-10 mb-5">
                    <div className="w-1/2 flex-1">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Number of players
                        </label>
                        <input className="appearance-none block w-full border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Enter a number" />
                    </div>
                    <div className="w-1/2" flex-1>
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            offer waitlist?
                        </label>
                        <div className="relative">

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0055a2]"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Switch to allow others to join waitlist</span>
                            </label>

                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="button" className="text-white bg-[#0055a2] focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-m px-5 py-2.5">
                        Create Event
                    </button>
                </div>
            </form>
        </div>
    )
}
