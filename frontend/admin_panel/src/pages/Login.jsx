import { useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle login
    console.log('Login attempt', { email, password });
  };

  return (
    <div className="min-h-screen bg-canvas-default flex items-center justify-center p-space-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-space-8">
          <h1 className="text-3xl font-[480] text-white-text tracking-wide">FastAdmin</h1>
          <p className="text-muted-gray-text text-sm mt-space-2">Sign in to your admin panel</p>
        </div>

        {/* Card */}
        <div className="bg-canvas-default border border-muted-green-gray/30 rounded-radius-xl p-space-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-space-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-[400] text-light-blue-text mb-space-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-space-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-muted-gray-text" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm pl-space-10 pr-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50 placeholder:text-muted-gray-text/60"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-[400] text-light-blue-text mb-space-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-space-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-muted-gray-text" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm pl-space-10 pr-space-12 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50 placeholder:text-muted-gray-text/60"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-space-3 flex items-center text-muted-gray-text hover:text-white-text transition"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password (optional) */}
            {/* <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-space-2 text-muted-gray-text hover:text-light-blue-text cursor-pointer">
                <input type="checkbox" className="rounded-radius-sm border-muted-green-gray/50 bg-canvas-default text-github-blue-primary focus:ring-2 focus:ring-github-blue-primary/50" />
                Remember me
              </label>
              <a href="#" className="text-github-blue-primary hover:underline hover:text-sky-blue-accent transition">
                Forgot password?
              </a>
            </div> */}

            {/* Login button */}
            <button
              type="submit"
              className="w-full py-space-3 bg-github-blue-primary text-white font-[500] text-sm rounded-radius-sm hover:opacity-90 transition shadow-sm"
            >
              Sign in
            </button>
          </form>

          {/* Footer */}
          <p className="mt-space-6 text-center text-xs text-muted-gray-text">
            &copy; {new Date().getFullYear()} FastAdmin. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}