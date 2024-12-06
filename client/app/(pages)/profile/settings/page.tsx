'use client';

import React, { useState } from 'react'

export default function UserSettings() {
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);

  const handleBannerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining to avoid errors
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewBanner(imageUrl);
    }
  };

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining to avoid errors
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewProfile(imageUrl);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-[50px]">
      <form className="w-[900px] bg-white p-[60px] drop-shadow-lg rounded-lg m-10">
        <h1 className="text-3xl font-bold text-gray-700 mb-5"> Setting Up Your Profile</h1>
        <div className="relative w-full h-[250px] bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-400 mb-8 rounded-lg">
          {previewBanner ? (
            <img
              src={previewBanner}
              alt="Banner Preview"
              className="w-full h-full object-cover"
            />
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

          <div className="absolute top-18 left-9">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-400 mb-4">
              {previewProfile ? (
                <img
                  src={previewProfile}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
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
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
                />
                <path
                  stroke="currentColor"
                  stroke-linejoin="round"
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
          <label
            htmlFor="bio"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Bio
          </label>
          <textarea
            id="bio"
            className="py-5 px-4 mb-3 bg-white rounded-lg border border-gray-400 text-sm text-gray-900 focus:ring-0 focus:outline-none"
            placeholder="Something about yourself"
            required
          ></textarea>
        </div>
        <div className="flex flex-wrap space-x-10 mb-5">
          <div className="flex-1 w-1/3">
            <label htmlFor="userFirstName" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
            <input className="appearance-none block w-full border border-gray-400 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="firstName" type="text" placeholder="First name" required />
          </div>
          <div className="flex-1 w-1/3">
            <label htmlFor="userLastName" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name
            </label>
            <input className="appearance-none block w-full border border-gray-400 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="lastName" type="text" placeholder="First name" required />
          </div>
          <div className="w-1/3 inline-block relative">
            <label htmlFor="skillLevel" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Skill Level
            </label>
            <select className="block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap space-x-10 mb-5">
          <div className="flex-1 w-1/3">
            <label htmlFor="schoolYear" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              School
            </label>
            <input className="appearance-none block w-full border border-gray-400 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="schoolYear" type="text" placeholder="School name" required />
          </div>
          <div className="flex-1 w-1/3">
            <label htmlFor="major" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Major
            </label>
            <input className="appearance-none block w-full border border-gray-400 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="major" type="text" placeholder="Major" required />
          </div>
          <div className="w-1/3 inline-block relative">
            <label htmlFor="schoolYear" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              School Year
            </label>
            <select className="block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none">
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
        </div>
        <div className="mb-4">
          <label htmlFor="sports-interested" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Sports Interested
          </label>
          <div id="sports-interested" className="grid grid-cols-5 gap-4">
            <div className="flex items-center">
              <input id="badminton-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="badminton-checkbox" className="ms-2 text-sm font-medium text-gray-900">Badminton</label>
            </div>
            <div className="flex items-center">
              <input id="baseball-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="baseball-checkbox" className="ms-2 text-sm font-medium text-gray-900">Baseball</label>
            </div>
            <div className="flex items-center">
              <input id="basketball-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="basketball-checkbox" className="ms-2 text-sm font-medium text-gray-900">Basketball</label>
            </div>
            <div className="flex items-center">
              <input id="cricket-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="cricket-checkbox" className="ms-2 text-sm font-medium text-gray-900">Cricket</label>
            </div>
            <div className="flex items-center">
              <input id="flagfootball-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="flagfootball-checkbox" className="ms-2 text-sm font-medium text-gray-900">FlagFootball</label>
            </div>
            <div className="flex items-center">
              <input id="frisbee-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="frisbee-checkbox" className="ms-2 text-sm font-medium text-gray-900">Frisbee</label>
            </div>
            <div className="flex items-center">
              <input id="golf-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="golf-checkbox" className="ms-2 text-sm font-medium text-gray-900">Golf</label>
            </div>
            <div className="flex items-center">
              <input id="pickleball-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="pickleball-checkbox" className="ms-2 text-sm font-medium text-gray-900">PickleBall</label>
            </div>
            <div className="flex items-center">
              <input id="running-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="running-checkbox" className="ms-2 text-sm font-medium text-gray-900">Running</label>
            </div>
            <div className="flex items-center">
              <input id="soccer-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="soccer-checkbox" className="ms-2 text-sm font-medium text-gray-900">Soccer</label>
            </div>
            <div className="flex items-center">
              <input id="softball-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="softball-checkbox" className="ms-2 text-sm font-medium text-gray-900">Softball</label>
            </div>
            <div className="flex items-center">
              <input id="swimming-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="swimming-checkbox" className="ms-2 text-sm font-medium text-gray-900">Swimming</label>
            </div>
            <div className="flex items-center">
              <input id="tabletennis-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="tabletennis-checkbox" className="ms-2 text-sm font-medium text-gray-900">TableTennis</label>
            </div>
            <div className="flex items-center">
              <input id="tennis-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="tennis-checkbox" className="ms-2 text-sm font-medium text-gray-900">Tennis</label>
            </div>
            <div className="flex items-center">
              <input id="volleyball-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="volleyball-checkbox" className="ms-2 text-sm font-medium text-gray-900">Volleyball</label>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button type="submit" className="px-9 py-3 bg-[#0055a2] text-white text-lg font-semibold rounded-lg hover:text-[#e5a823] transition duration-300">
            Save Information
          </button>
        </div>
      </form>

    </div>
  )
}
