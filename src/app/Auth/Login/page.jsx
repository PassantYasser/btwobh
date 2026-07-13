'use client'
import React, { useState } from 'react'
import API from '@/app/Redux/Api/axios'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await API.get('/users');
      const users = response.data;

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('token', user.token);
        window.location.href = '/Page/Home';
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-100'>
        <div className='flex justify-center items-center '>
        <form onSubmit={handleLogin} className='bg-[white] w-[40%] h-screen p-25 rounded-4xl flex flex-col justify-center'>
          <p className='text-center text-2xl font-normal '>Welcome back</p>
          <p className='text-center text-2xl mb-10 mt-2 font-bold'>Login</p>

          {error && (
            <div className="mb-4 text-sm font-semibold text-red-600 bg-red-50 py-2.5 rounded-lg text-center">
              {error}
            </div>
          )}

          <div>
            <label className='text-[black] text-base font-medium'>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@reservex.com"
              className='bg-gray-100 h-12 w-full rounded-sm outline-0 px-4' 
            />
          </div>

          <div className='mt-4'>
            <label className='text-[black] text-base font-medium'>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className='bg-gray-100 h-12 w-full rounded-sm outline-0 px-4' 
            />
          </div>

          <p className="text-gray-500 my-2 text-right text-xs font-semibold cursor-pointer hover:underline">
            Forgot your password?
          </p>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-12 bg-[blue] text-xl text-[white] py-2.5 px-4 rounded-sm cursor-pointer disabled:bg-gray-400"  
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <button type="button" className="mt-25 flex gap-1.5 rounded-[3px] justify-center w-full">
            <p className="text-black text-sm font-normal">
              Don't have an account?
            </p>
            <p className="text-[blue] text-sm font-bold">
              Create account
            </p>
          </button>
            
        </form>
    </div>
    </div>
  
  )
}

export default LoginPage