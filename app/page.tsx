"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react'

export default function Register() {
   const { data: session } = useSession()
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  console.log(session)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setMessage('Email is required');
      return;
    }

    // Placeholder for submitting the email (e.g., to an API)
    console.log('Email submitted:', email);
    setMessage('Registration successful');
    setEmail('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h1 className="text-xl font-bold text-gray-700 mb-4">Register</h1>

        {message && (
          <p className="text-sm text-center text-green-600 mb-4">{message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}