'use client';
import Link from 'next/link';
import React, { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const LoginPage = () => {
  const {addUser} = useUser();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleLogin = async () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    let valid = true;

    const newErrors = { email: '', password: '' };

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address.';
      valid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required.';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      valid = false;
    }

    setErrors(newErrors);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
  
      const response = await fetch('https://backendmedibot.onrender.com/doctor/login', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Signup failed');
      }
  
      const result = await response.json();
      try {
        const url = "https://backendmedibot.onrender.com/doctor/change-activity";
        const data = new FormData();
        data.append('id', result.doctor.id);
        data.append('status', 'active');
        fetch(url, {
          method: 'POST',
          body: data,
        });
      }
      catch(err) {
        console.error('Signup Error:', err.message);
        setErrors({ form: err.message });
        return;
      }
      addUser(result.doctor.id);
      const username = email.split('@')[0];
      router.push(`/room/${username}`);
    } catch (error) {
      console.error('Signup Error:', error.message);
      setErrors({ form: error.message });
      return;
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-[#191d30] px-4">
      <div className="flex flex-col gap-6 w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-[#191d30] text-center">Welcome Back</h1>
        <p className="text-sm text-gray-600 text-center">
          Log in to access your account.
        </p>
        <div className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col gap-1">
            {errors.email && (
              <span className="text-sm text-red-600">{errors.email}</span>
            )}
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              className={`input-custom ${
                errors.email ? 'border-red-600' : 'border-gray-300'
              }`}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1">
            {errors.password && (
              <span className="text-sm text-red-600">{errors.password}</span>
            )}
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className={`input-custom ${
                errors.password ? 'border-red-600' : 'border-gray-300'
              }`}
            />
          </div>
        </div>

        <button
          className="w-full bg-[#191d30] text-white py-2 rounded-md font-medium hover:bg-[#222640] transition"
          onClick={handleLogin}
        >
          Log In
        </button>
        <p className="text-sm text-gray-500 text-center mt-4">
          Don’t have an account?{' '}
          <Link href="/api/signin" className="text-[#191d30] font-medium hover:underline">
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
