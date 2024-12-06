'use client';

import React from "react";

const signUpInputs = [
  {
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    name: "firstName",
  },
  {
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    name: "lastName",
  },
  {
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
    name: "email",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    name: "password",
  },
  {
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    name: "confirmPassword",
  },
];

export default function SignUp() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center text-white flex flex-col"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      {/* Main Section */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 flex-grow">
        {/* Left Section - Placeholder */}
        <div className="hidden lg:block w-1/2 text-center">
          <div className="relative">
            <img
              src="/calendar.png" // Replace with your calendar image
              alt="Calendar"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
            Sign Up
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Register to start playing
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {signUpInputs.map((input) => (
              <div key={input.name}>
                <label
                  htmlFor={input.name}
                  className="block text-sm font-medium mb-1"
                >
                  {input.label}
                </label>
                <input
                  id={input.name}
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.name}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Already a member?{" "}
            <a href="#" className="text-blue-600 font-semibold">
              Sign In
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}