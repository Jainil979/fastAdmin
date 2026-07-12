// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { EnvelopeIcon, UserIcon, LockClosedIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

// export default function CreateAdmin() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(false);

//     // Validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }
//     if (formData.password.length < 8) {
//       setError('Password must be at least 8 characters.');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Call your API endpoint to create a superuser
//       const res = await fetch('/api/admin/create-superuser', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//           role: 'admin',
//           is_active: true,
//         }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.detail || 'Failed to create admin.');
//       }
//       setSuccess(true);
//       setFormData({ username: '', email: '', password: '', confirmPassword: '' });
//       // Optionally redirect after a delay
//       setTimeout(() => navigate('/'), 3000);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-canvas-default flex items-center justify-center p-space-4">
//       <div className="w-full max-w-md">
//         {/* Brand */}
//         <div className="text-center mb-space-8">
//           <h1 className="text-3xl font-[480] text-white-text tracking-wide">FastAdmin</h1>
//           <p className="text-muted-gray-text text-sm mt-space-2">Create the first superuser</p>
//         </div>

//         {/* Card */}
//         <div className="bg-canvas-default border border-muted-green-gray/30 rounded-radius-xl p-space-8 shadow-2xl">
//           <form onSubmit={handleSubmit} className="space-y-space-6">
//             {/* Username */}
//             <div>
//               <label htmlFor="username" className="block text-sm font-[400] text-light-blue-text mb-space-1">
//                 Username
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-space-3 flex items-center pointer-events-none">
//                   <UserIcon className="h-5 w-5 text-muted-gray-text" />
//                 </div>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm pl-space-10 pr-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50 placeholder:text-muted-gray-text/60"
//                   placeholder="admin"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-[400] text-light-blue-text mb-space-1">
//                 Email address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-space-3 flex items-center pointer-events-none">
//                   <EnvelopeIcon className="h-5 w-5 text-muted-gray-text" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm pl-space-10 pr-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50 placeholder:text-muted-gray-text/60"
//                   placeholder="admin@example.com"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-[400] text-light-blue-text mb-space-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-space-3 flex items-center pointer-events-none">
//                   <LockClosedIcon className="h-5 w-5 text-muted-gray-text" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   minLength={8}
//                   className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm pl-space-10 pr-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50 placeholder:text-muted-gray-text/60"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-[400] text-light-blue-text mb-space-1">
//                 Confirm password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-space-3 flex items-center pointer-events-none">
//                   <LockClosedIcon className="h-5 w-5 text-muted-gray-text" />
//                 </div>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm pl-space-10 pr-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50 placeholder:text-muted-gray-text/60"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             {/* Error message */}
//             {error && (
//               <div className="p-space-3 bg-danger-red/10 text-danger-red border border-danger-red/30 rounded-radius-sm text-sm">
//                 ❌ {error}
//               </div>
//             )}

//             {/* Success message */}
//             {success && (
//               <div className="p-space-3 bg-success-green/10 text-success-green border border-success-green/30 rounded-radius-sm text-sm flex items-center gap-space-2">
//                 <CheckBadgeIcon className="w-5 h-5" />
//                 Superuser created successfully! Redirecting…
//               </div>
//             )}

//             {/* Submit button */}
//             <button
//               type="submit"
//               disabled={loading || success}
//               className="w-full py-space-3 bg-github-blue-primary text-white font-[500] text-sm rounded-radius-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
//             >
//               {loading ? 'Creating…' : 'Create Superuser'}
//             </button>
//           </form>

//           {/* Footer */}
//           <p className="mt-space-6 text-center text-xs text-muted-gray-text">
//             &copy; {new Date().getFullYear()} FastAdmin. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }






import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, UserIcon, LockClosedIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { createSuperuser } from '../api';  // <-- import the API function

export default function CreateAdmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await createSuperuser(formData.username, formData.email, formData.password);
      setSuccess(true);
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas-default flex items-center justify-center p-space-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-space-8">
          <h1 className="text-3xl font-[480] text-white-text tracking-wide">FastAdmin</h1>
          <p className="text-muted-gray-text text-sm mt-space-2">Create the first superuser</p>
        </div>

        {/* Card */}
        <div className="bg-canvas-default border border-muted-green-gray/30 rounded-radius-xl p-space-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-space-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-[400] text-light-blue-text mb-space-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-space-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-muted-gray-text" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm pl-space-10 pr-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50 placeholder:text-muted-gray-text/60"
                  placeholder="admin"
                />
              </div>
            </div>

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
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm pl-space-10 pr-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50 placeholder:text-muted-gray-text/60"
                  placeholder="admin@example.com"
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm pl-space-10 pr-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50 placeholder:text-muted-gray-text/60"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-[400] text-light-blue-text mb-space-1">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-space-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-muted-gray-text" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm pl-space-10 pr-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50 placeholder:text-muted-gray-text/60"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-space-3 bg-danger-red/10 text-danger-red border border-danger-red/30 rounded-radius-sm text-sm">
                ❌ {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="p-space-3 bg-success-green/10 text-success-green border border-success-green/30 rounded-radius-sm text-sm flex items-center gap-space-2">
                <CheckBadgeIcon className="w-5 h-5" />
                Superuser created successfully! Redirecting…
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-space-3 bg-github-blue-primary text-white font-[500] text-sm rounded-radius-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Creating…' : 'Create Superuser'}
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