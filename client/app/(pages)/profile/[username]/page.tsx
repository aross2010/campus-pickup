// user profile page
import React from 'react'

export default function UserProfile() {
    return (
        <div className="w-full min-h-screen mb-20">
            <div className="w-full h-[450px] bg-[#e5a823] relative">
                <div className="absolute top-4 left-4 flex flex-col items-center">
                    <img
                        src="https://imageio.forbes.com/specials-images/imageserve/61290485e59b1a3c399d34e7/0x0.jpg?format=jpg&crop=2699,1519,x0,y0,safe&height=900&width=1600&fit=bounds"
                        className="object-cover w-[200px] h-[200px] mt-[70px] mx-[20px] border-4 rounded-full"
                        alt="User Image"
                    />
                    <span className="mt-5 text-white text-3xl font-semibold">User Name</span>
                </div>

                {/* Bio Box and Edit Profile Button */}
                <div className="absolute bottom-4 w-full flex justify-between items-center px-8">
                    {/* Bio Box */}
                    <div className="w-[80%] h-[80%] border-4 p-4 rounded-lg shadow-md">
                        <p className="text-white text-m font-semibold">
                            This is the user's bio. You can add more information about the user here.
                        </p>
                    </div>

                    {/* Edit Profile Button */}
                    <button className="px-9 py-3 bg-black text-white text-lg font-semibold rounded-lg hover:text-[#d78a22] transition duration-300">
                        Edit Profile
                    </button>
                </div>
            </div>
            <div className="space-y-2 mt-4 mx-[50px] mb-20">
                <h1 className='text-5xl mb-[30px] font-bold text-white'>School</h1>
                <h3 className='text-2xl font-bold text-white'>Year</h3>
                <h3 className='text-2xl font-bold text-white'>Sport Interest</h3>
            </div>
            <div className="w-full flex justify-between items-center px-10 py-10">
                {/* Stats Box */}
                <div className="w-[100%] h-[200px] border-4 p-4 rounded-lg shadow-md">
                    <h3 className="text-white text-3xl text-center font-semibold">
                    Stats and Achievements
                    </h3>
                </div>
            </div>
            <div className="w-full flex justify-between items-center px-10 py-10">
                {/* Activity Box */}
                <div className="w-[100%] h-[200px] border-4 p-4 rounded-lg shadow-md">
                    <h3 className="text-white text-3xl text-center font-semibold">
                        Activity Feed
                    </h3>
                </div>
            </div>
            <div className="w-full flex justify-between items-center px-10 py-10">
                {/* Create Event Box */}
                <div className="w-[100%] h-[200px] border-4 p-4 m-5 rounded-lg shadow-md">
                    <h3 className="text-white text-3xl text-center font-semibold">
                       Create An Event
                    </h3>
                </div>
                <div className="w-[100%] h-[200px] border-4 p-4 rounded-lg shadow-md">
                    <h3 className="text-white text-3xl text-center font-semibold">
                        Reviews
                    </h3>
                </div>
            </div>
            <div className="w-full flex justify-between items-center px-10 py-10">
                {/* Status Box */}
                <div className="w-[100%] h-[200px] border-4 p-4 rounded-lg shadow-md">
                    <h3 className="text-white text-3xl text-center font-semibold">
                        Status
                    </h3>
                </div>
            </div>
        </div>

    )
}

