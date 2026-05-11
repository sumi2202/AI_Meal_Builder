'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
        } else {
          router.push('/chat');
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setError(error.message);
        } else {
          setSuccessMessage('Check your email for the confirmation link!');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-ivory-mist-50 to-vintage-grape-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-vintage-grape-900 mb-2">
            Welcome to PCOS Meal Planner
          </h1>
          <p className="text-lg text-vintage-grape-700">
            Your personalized nutrition journey starts here
          </p>
        </div>

        {/* Toggle */}
        <div className="flex rounded-lg bg-ivory-mist-100 p-1">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isLogin
                ? 'bg-vintage-grape-600 text-ivory-mist-50'
                : 'text-vintage-grape-700 hover:text-vintage-grape-900'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isLogin
                ? 'bg-vintage-grape-600 text-ivory-mist-50'
                : 'text-vintage-grape-700 hover:text-vintage-grape-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-ivory-mist-50 rounded-2xl shadow-lg p-8 border border-powder-petal-200">
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-vintage-grape-900 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-powder-petal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vintage-grape-500 focus:border-transparent bg-ivory-mist-50 text-vintage-grape-900 placeholder-vintage-grape-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-vintage-grape-900 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-powder-petal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vintage-grape-500 focus:border-transparent bg-ivory-mist-50 text-vintage-grape-900 placeholder-vintage-grape-400"
                placeholder="Enter your password"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-pink-mist-50 border border-pink-mist-200 text-pink-mist-900 rounded-lg p-4 text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="bg-jungle-teal-50 border border-jungle-teal-200 text-jungle-teal-900 rounded-lg p-4 text-sm">
                {successMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-vintage-grape-600 hover:bg-vintage-grape-700 text-ivory-mist-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-vintage-grape-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-ivory-mist-50 border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-vintage-grape-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-vintage-grape-700 hover:text-vintage-grape-900 underline"
            >
              {isLogin ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}