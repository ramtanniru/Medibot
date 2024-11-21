'use client';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const SignUpPage = () => {
  const {addUser} = useUser();
  const emailRef = useRef('');
  const nameRef = useRef('');
  const specializationRef = useRef('');
  const phoneRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const imageInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validatePassword = (password) => password && password.length >= 6;

  const handleSignup = async () => {
    const email = emailRef.current.value.trim();
    const name = nameRef.current.value.trim();
    const specialization = specializationRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();
    const imageFile = imageInputRef.current?.files[0];
  
    let valid = true;
    const newErrors = {};
  
    // Validate inputs
    if (!validateEmail(email)) {
      newErrors.email = 'Enter a valid email address.';
      valid = false;
    }
    if (!name) {
      newErrors.name = 'Name is required.';
      valid = false;
    }
    if (!specialization) {
      newErrors.specialization = 'Specialization is required.';
      valid = false;
    }
    if (!validatePhone(phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number.';
      valid = false;
    }
    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters.';
      valid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }
  
    // Validate image file
    if (imageFile && !['image/jpeg', 'image/png'].includes(imageFile.type)) {
      newErrors.image = 'Only JPG/PNG files are allowed.';
      valid = false;
    }
  
    setErrors(newErrors);
    if (!valid) return;
  
    try {
      let imageUrl = '';
  
      // Upload image to Cloudinary if provided
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'dealsdray'); // Replace with your Cloudinary preset
  
        const cloudinaryResponse = await fetch(
          'https://api.cloudinary.com/v1_1/dqdzhdspe/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
  
        if (!cloudinaryResponse.ok) {
          throw new Error('Image upload failed');
        }
  
        const data = await cloudinaryResponse.json();
        imageUrl = data.secure_url;
      }
  
      // Prepare form data for the signup API
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', name);
      formData.append('specialization', specialization);
      formData.append('phone', phone);
      formData.append('image', imageUrl);
      formData.append('password', password);
      formData.append('status', 'active');
  
      // Send user data to backend
      const response = await fetch('https://backendmedibot.onrender.com/doctor/signup', {
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
      addUser(result.id);
      const username = email.split('@')[0];
      router.push(`/room/${username}`);
    } catch (error) {
      console.error('Signup Error:', error.message);
      setErrors({ form: error.message });
    }
  };
  

  return (
    <div className="flex min-h-screen justify-center items-center bg-[#191d30] px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-[#191d30]">Create an Account</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Join us today! Fill in the details below to get started.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              ref={emailRef}
              placeholder="Enter your email"
              className={`input-custom ${errors.email ? 'border-red-600' : 'border-gray-300'}`}
            />
            {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              ref={nameRef}
              placeholder="Enter your name"
              className={`input-custom ${errors.name ? 'border-red-600' : 'border-gray-300'}`}
            />
            {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
          </div>

          {/* Specialization */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Specialization</label>
            <input
              type="text"
              ref={specializationRef}
              placeholder="Enter specialization"
              className={`input-custom ${errors.specialization ? 'border-red-600' : 'border-gray-300'}`}
            />
            {errors.specialization && <span className="text-sm text-red-600">{errors.specialization}</span>}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Phone Number</label>
            <input
              type="text"
              ref={phoneRef}
              placeholder="Enter your phone number"
              className={`input-custom ${errors.phone ? 'border-red-600' : 'border-gray-300'}`}
            />
            {errors.phone && <span className="text-sm text-red-600">{errors.phone}</span>}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm text-gray-600 mb-1">Profile Picture</label>
            <input
              type="file"
              ref={imageInputRef}
              accept="image/jpeg, image/png"
              className="input-custom"
            />
            {errors.image && <span className="text-sm text-red-600">{errors.image}</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
              className={`input-custom ${errors.password ? 'border-red-600' : 'border-gray-300'}`}
            />
            {errors.password && <span className="text-sm text-red-600">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              ref={confirmPasswordRef}
              placeholder="Re-enter your password"
              className={`input-custom ${errors.confirmPassword ? 'border-red-600' : 'border-gray-300'}`}
            />
            {errors.confirmPassword && <span className="text-sm text-red-600">{errors.confirmPassword}</span>}
          </div>
        </form>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleSignup}
            className="w-full bg-[#191d30] text-white py-2 rounded-md font-medium hover:bg-[#222640] transition"
          >
            Sign Up
          </button>
          <p className="text-sm text-gray-500 text-center">
            Already have an account?{' '}
            <Link href="login" className="text-[#191d30] font-medium hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
