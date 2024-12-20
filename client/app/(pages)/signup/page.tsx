'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface SignUpInput {
  label: string;
  type: string;
  placeholder: string;
  name: string;
}

const signUpInputs: SignUpInput[] = [
  {
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter your first name',
    name: 'firstName',
  },
  {
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter your last name',
    name: 'lastName',
  },
  {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
  },
  {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    name: 'password',
  },
  {
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your password',
    name: 'confirmPassword',
  },
];

export default function SignUp() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // State to handle show/hide password
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', {
        email,
        password,
        firstName,
        lastName,
      });

      alert('Registration successful');
      // Handle successful registration (e.g., redirect, clear form)
    } catch (error: any) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'firstName') setFirstName(value);
    if (name === 'lastName') setLastName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  // Toggle show password
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center text-white flex flex-col"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <main className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 flex-grow">
        <div className="hidden lg:block w-1/2 text-center">
          <div className="relative">
            <img
              src="/calendar.png"
              alt="Calendar"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>

        <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Sign Up</h2>
          <p className="text-sm text-center text-gray-600 mb-6">Register to start playing</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {signUpInputs.map((input) => (
              <div key={input.name} className="relative">
                <label htmlFor={input.name} className="block text-sm font-medium mb-1">
                  {input.label}
                </label>
                <input
                  id={input.name}
                  type={input.name === 'password' && showPassword ? 'text' : input.name === 'confirmPassword' && showConfirmPassword ? 'text' : input.type}
                  placeholder={input.placeholder}
                  name={input.name}
                  value={{
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                  }[input.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {(input.name === 'password' || input.name === 'confirmPassword') && (
                  <span
                    onClick={input.name === 'password' ? toggleShowPassword : toggleShowConfirmPassword}
                    className="absolute right-3 top-[45px] transform -translate-y-1/2 cursor-pointer text-gray-500"
                  >
                    {input.name === 'password' && (
                      showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )
                    )}
                    {input.name === 'confirmPassword' && (
                      showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )
                    )}
                  </span>
                )}
              </div>
            ))}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Already a member? <a href="/signin" className="text-blue-600 font-semibold">Sign In</a>
          </p>
        </div>
      </main>
    </div>
  );
}
