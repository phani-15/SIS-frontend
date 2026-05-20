// import React, { useState } from 'react';
// import { Eye, EyeOff, Phone, Mail, Lock, KeyRound, CheckCircle, AlertCircle } from 'lucide-react';

// const StudentLogin = () => {
//   const [activeTab, setActiveTab] = useState('phone'); // 'phone' | 'email'
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // Form State
//   const [formData, setFormData] = useState({
//     phone: '',
//     email: '',
//     password: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setError(''); // Clear errors on input change
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     // Basic Validation
//     if (activeTab === 'phone' && formData.phone.length !== 10) {
//       setError('Please enter a valid 10-digit phone number.');
//       setIsLoading(false);
//       return;
//     }
//     if (activeTab === 'email' && !/^\S+@\S+\.\S+$/.test(formData.email)) {
//       setError('Please enter a valid email address.');
//       setIsLoading(false);
//       return;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters.');
//       setIsLoading(false);
//       return;
//     }

//     // Simulate API Call
//     setTimeout(() => {
//       setIsLoading(false);
//       setSuccess('Login Successful! Redirecting to Dashboard...');
//       // Here you would typically handle the redirect or token storage
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center p-4 bg-linear-to-br from-[#E8D5F2] via-[#FCE8F0] to-[#D3CFF7]">
      
//       {/* Main Card */}
//       <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl shadow-[#8A2E88]/15 overflow-hidden relative animate-fade-in-up">
        
//         {/* Top Decorative Border */}
//         <div className="h-2 bg-linear-to-r from-[#8A2E88] via-[#BFA0D1] to-[#E8D5F2] w-full"></div>

//         <div className="p-8 md:p-10">
          
//           {/* Header Section */}
//           <div className="text-center mb-8">
//             <div className="w-20 h-20 mx-auto bg-linear-to-br from-[#8A2E88] to-[#BFA0D1] rounded-2xl flex items-center justify-center shadow-lg shadow-[#8A2E88]/30 mb-4 ">
//               <Lock size={40} className="text-white" />
//             </div>
            
//           <h2 className="font-['Comfortaa'] text-[#8A2E88] text-3xl font-bold text-center mb-8">
//             STUDENT LOGIN
//           </h2>

//           </div>

//           {/* Error/Success Messages */}
//           {error && (
//             <div className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-red-50 text-red-600 text-sm font-medium animate-shake">
//               <AlertCircle size={18} />
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-medium">
//               <CheckCircle size={18} />
//               {success}
//             </div>
//           )}

//           {/* Tabs */}
//           <div className="flex gap-2 p-1.5 bg-[#F8F4FC] rounded-2xl mb-8">
//             <button
//               onClick={() => setActiveTab('phone')}
//               className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
//                 activeTab === 'phone'
//                   ? 'bg-linear-to-r from-[#8A2E88] to-[#BFA0D1] text-white shadow-md shadow-[#8A2E88]/30'
//                   : 'text-[#6B5B7A] hover:bg-white/50'
//               }`}
//             >
//               <Phone size={16} /> Phone Number
//             </button>
//             <button
//               onClick={() => setActiveTab('email')}
//               className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
//                 activeTab === 'email'
//                   ? 'bg-linear-to-r from-[#8A2E88] to-[#BFA0D1] text-white shadow-md shadow-[#8A2E88]/30'
//                   : 'text-[#6B5B7A] hover:bg-white/50'
//               }`}
//             >
//               <Mail size={16} /> Email ID
//             </button>
//           </div>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             {/* Dynamic Input Field */}
//             <div className="space-y-2">
//               <label className="font-['Inter'] text-[#4A3B5A] text-sm font-semibold ml-1">
//                 {activeTab === 'phone' ? 'Phone Number' : 'University Email'}
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   {activeTab === 'phone' ? (
//                     <Phone size={18} className="text-[#9B8AA8] group-focus-within:text-[#8A2E88] transition-colors" />
//                   ) : (
//                     <Mail size={18} className="text-[#9B8AA8] group-focus-within:text-[#8A2E88] transition-colors" />
//                   )}
//                 </div>
//                 <input
//                   type={activeTab === 'phone' ? 'tel' : 'email'}
//                   name={activeTab === 'phone' ? 'phone' : 'email'}
//                   placeholder={activeTab === 'phone' ? 'Enter 10-digit number' : 'student@jntugvcev.in'}
//                   value={activeTab === 'phone' ? formData.phone : formData.email}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-4 py-4 bg-[#FAF8FC] border-2 border-[#E8D5F2] rounded-xl font-['Inter'] text-[#2D1B3E] placeholder-[#9B8AA8] focus:outline-none focus:border-[#BFA0D1] focus:bg-white focus:shadow-[0_0_0_4px_rgba(191,160,209,0.1)] transition-all"
//                   maxLength={activeTab === 'phone' ? 10 : undefined}
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div className="space-y-2">
//               <label className="font-['Inter'] text-[#4A3B5A] text-sm font-semibold ml-1">
//                 Password
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <KeyRound size={18} className="text-[#9B8AA8] group-focus-within:text-[#8A2E88] transition-colors" />
//                 </div>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-12 py-4 bg-[#FAF8FC] border-2 border-[#E8D5F2] rounded-xl font-['Inter'] text-[#2D1B3E] placeholder-[#9B8AA8] focus:outline-none focus:border-[#BFA0D1] focus:bg-white focus:shadow-[0_0_0_4px_rgba(191,160,209,0.1)] transition-all"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9B8AA8] hover:text-[#8A2E88] transition-colors"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             {/* Options Row */}
//             <div className="flex items-center justify-between text-sm font-['Inter']">
//               <label className="flex items-center gap-2 text-[#4A3B5A] cursor-pointer hover:text-[#8A2E88] transition-colors">
//                 <input type="checkbox" className="w-4 h-4 rounded accent-[#8A2E88] cursor-pointer" />
//                 Remember me
//               </label>
//               <a href="#" className="text-[#8A2E88] font-semibold hover:underline hover:text-[#BFA0D1] transition-colors">
//                 Forgot Password?
//               </a>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-4 bg-linear-to-r from-[#8A2E88] to-[#BFA0D1] text-white rounded-xl font-['Inter'] font-semibold text-lg shadow-lg shadow-[#8A2E88]/30 hover:shadow-xl hover:shadow-[#8A2E88]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Logging in...
//                 </span>
//               ) : 'Login to Portal'}
//             </button>
//           </form>

//           {/* Footer Links */}
//           <div className="mt-8 pt-6 border-t border-[#F3E8F9] text-center">
//             <p className="font-['Inter'] text-[#9B8AA8] text-xs mt-4">
//               © 2026 JNTU-GV Vizianagaram. All rights reserved.
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentLogin;

import React, { useState, useEffect } from 'react';
import {
  Eye, EyeOff, Phone, Mail, Lock,
  KeyRound, CheckCircle, AlertCircle, ArrowRight, Shield
} from 'lucide-react';

const StudentLogin = () => {
  const [activeTab, setActiveTab]     = useState('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]     = useState(false);
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState('');
  const [mounted, setMounted]         = useState(false);
  const [focused, setFocused]         = useState('');

  const [formData, setFormData] = useState({ phone: '', email: '', password: '' });

  useEffect(() => { setMounted(true); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (activeTab === 'phone' && formData.phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      setIsLoading(false); return;
    }
    if (activeTab === 'email' && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false); return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      setIsLoading(false); return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Login successful! Redirecting to dashboard…');
    }, 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* Keyframes Tailwind can't express */
        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,40px)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,-30px)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-20px)} }
        @keyframes shimmer   { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes badgePulse{
          0%,100%{box-shadow:0 4px 20px rgba(138,46,136,0.4),0 0 0 1px rgba(255,255,255,0.08) inset}
          50%    {box-shadow:0 4px 30px rgba(138,46,136,0.65),0 0 0 1px rgba(255,255,255,0.13) inset}
        }
        @keyframes cardIn { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes alertIn{ from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

        .orb-1 { animation: orbFloat1 8s ease-in-out infinite; }
        .orb-2 { animation: orbFloat2 10s ease-in-out infinite; }
        .orb-3 { animation: orbFloat3 12s ease-in-out infinite; }
        .shimmer-bar {
          background: linear-gradient(90deg,#8A2E88,#C084C8,#8A2E88);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        .badge-pulse { animation: badgePulse 3s ease-in-out infinite; }
        .card-in     { animation: cardIn 0.6s ease forwards; }
        .alert-in    { animation: alertIn 0.25s ease; }
      `}</style>

      {/* ── Page shell ── */}
      <div className="min-h-screen w-full flex items-center justify-center p-4
        bg-[#0f0a1a] font-['DM_Sans'] relative overflow-hidden">

        {/* Ambient orbs */}
        <div className="orb-1 absolute w-125 h-125 rounded-full pointer-events-none
          -top-30 -left-25"
          style={{ background: 'radial-gradient(circle, rgba(138,46,136,0.35) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="orb-2 absolute w-100 h-100 rounded-full pointer-events-none
          -bottom-25 -right-20"
          style={{ background: 'radial-gradient(circle, rgba(99,40,180,0.25) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="orb-3 absolute w-62.5 h-62.5 rounded-full pointer-events-none
          top-1/2 left-[60%]"
          style={{ background: 'radial-gradient(circle, rgba(200,100,210,0.18) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(138,46,136,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(138,46,136,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }} />

        {/* ── Card ── */}
        <div
          className={`relative w-full max-w-115 rounded-[28px] overflow-hidden
            border border-[#8A2E88]/25
            shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_32px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(138,46,136,0.12)]
            ${mounted ? 'card-in' : 'opacity-0'}`}
          style={{ background: 'rgba(20,10,35,0.75)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
        >
          {/* Shimmer top bar */}
          <div className="shimmer-bar h-0.75 w-full" />

          {/* Body */}
          <div className="px-10 pt-10 pb-8">

            {/* ── Header ── */}
            <div className="flex items-center gap-3.5 mb-7">
              <div
                className="badge-pulse w-13 h-13 shrink-0 flex items-center justify-center
                  rounded-2xl bg-linear-to-br from-[#8A2E88] to-[#C084C8]"
                style={{ boxShadow: '0 4px 20px rgba(138,46,136,0.4), 0 0 0 1px rgba(255,255,255,0.08) inset' }}
              >
                <Lock size={24} color="#fff" />
              </div>
              <div className="flex flex-col leading-[1.15]">
                <span className="font-['Comfortaa'] font-bold text-[1.5rem] text-white tracking-[-0.02em]">
                  Student Portal
                </span>
                <span className="text-[0.72rem] font-light text-[#C8A0D7]/60 tracking-[0.03em] mt-0.5">
                  JNTU-GV Vizianagaram
                </span>
              </div>
            </div>

            {/* ── Alerts ── */}
            {error && (
              <div className="alert-in flex items-center gap-2 px-3.5 py-3 mb-5 rounded-xl
                bg-red-500/10 border border-red-500/25 text-red-400 text-[0.84rem] font-medium">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}
            {success && (
              <div className="alert-in flex items-center gap-2 px-3.5 py-3 mb-5 rounded-xl
                bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[0.84rem] font-medium">
                <CheckCircle size={16} className="shrink-0" />
                {success}
              </div>
            )}

            {/* ── Tabs ── */}
            <div className="flex gap-1.5 p-1.25 rounded-2xl mb-7
              bg-white/4 border border-white/6">
              {[
                { key: 'phone', icon: <Phone size={15} />, label: 'Phone Number' },
                { key: 'email', icon: <Mail  size={15} />, label: 'Email ID'     },
              ].map(({ key, icon, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.75 rounded-xl
                    font-['DM_Sans'] text-[0.84rem] font-medium border-none cursor-pointer
                    transition-all duration-250
                    ${activeTab === key
                      ? 'bg-linear-to-br from-[#8A2E88] to-[#B060B8] text-white shadow-[0_4px_16px_rgba(138,46,136,0.35)]'
                      : 'bg-transparent text-[#B48AC2]/70 hover:bg-[#8A2E88]/10 hover:text-[#D2AAE0]/90'
                    }`}
                >
                  {icon}{label}
                </button>
              ))}
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Dynamic contact field */}
              <div className="flex flex-col gap-2">
                <label className="text-[0.76rem] font-semibold text-[#C8A0D7]/80 tracking-[0.06em] uppercase ml-0.5">
                  {activeTab === 'phone' ? 'Phone Number' : 'University Email'}
                </label>
                <div className="relative group">
                  <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none
                    transition-colors duration-200
                    ${focused === 'contact' ? 'text-[#C084C8]' : 'text-[#967AA5]/60'}`}>
                    {activeTab === 'phone' ? <Phone size={17} /> : <Mail size={17} />}
                  </span>
                  <input
                    type={activeTab === 'phone' ? 'tel' : 'email'}
                    name={activeTab === 'phone' ? 'phone' : 'email'}
                    placeholder={activeTab === 'phone' ? 'Enter 10-digit number' : 'student@jntugvcev.in'}
                    value={activeTab === 'phone' ? formData.phone : formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocused('contact')}
                    onBlur={() => setFocused('')}
                    maxLength={activeTab === 'phone' ? 10 : undefined}
                    autoComplete={activeTab === 'phone' ? 'tel' : 'email'}
                    className="w-full pl-11 pr-4 py-3.5 rounded-3.5
                      bg-white/4 border border-[#8A2E88]/20
                      font-['DM_Sans'] text-[0.92rem] text-white
                      placeholder:text-[#AA80BA]/40
                      outline-none transition-all duration-200
                      focus:border-[#C084C8]/60 focus:bg-[#8A2E88]/08
                      focus:shadow-[0_0_0_4px_rgba(138,46,136,0.12),0_1px_3px_rgba(0,0,0,0.3)_inset]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-[0.76rem] font-semibold text-[#C8A0D7]/80 tracking-[0.06em] uppercase ml-0.5">
                  Password
                </label>
                <div className="relative group">
                  <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none
                    transition-colors duration-200
                    ${focused === 'password' ? 'text-[#C084C8]' : 'text-[#967AA5]/60'}`}>
                    <KeyRound size={17} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                    autoComplete="current-password"
                    className="w-full pl-11 pr-12 py-3.5 rounded-3.5
                      bg-white/4 border border-[#8A2E88]/20
                      font-['DM_Sans'] text-[0.92rem] text-white
                      placeholder:text-[#AA80BA]/40
                      outline-none transition-all duration-200
                      focus:border-[#C084C8]/60 focus:bg-[#8A2E88]/08
                      focus:shadow-[0_0_0_4px_rgba(138,46,136,0.12),0_1px_3px_rgba(0,0,0,0.3)_inset]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center
                      bg-transparent border-none cursor-pointer p-1 rounded-md
                      text-[#967AA5]/50 hover:text-[#C084C8] transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Options row */}
              <div className="flex items-center justify-between -mt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none
                  text-[0.82rem] text-[#B48AC2]/70 hover:text-[#D2AAE0]/90 transition-colors duration-200">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer rounded accent-[#8A2E88]"
                  />
                  Remember me
                </label>
                <a href="#"
                  className="text-[0.82rem] font-semibold text-[#C084C8]
                    hover:text-[#D8A8E0] transition-colors duration-200 no-underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading || !!success}
                className="w-full flex items-center justify-center gap-2 py-3.75 rounded-3.5
                  bg-linear-to-br from-[#8A2E88] via-[#B060B8] to-[#C880D0]
                  font-['DM_Sans'] text-[1rem] font-semibold text-white tracking-[0.01em]
                  border-none cursor-pointer transition-all duration-250
                  shadow-[0_4px_24px_rgba(138,46,136,0.4),0_1px_0_rgba(255,255,255,0.12)_inset]
                  hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(138,46,136,0.55),0_1px_0_rgba(255,255,255,0.12)_inset]
                  active:translate-y-0 active:shadow-[0_2px_12px_rgba(138,46,136,0.35)]
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4.5 h-4.5 text-white shrink-0"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Logging in…
                  </>
                ) : (
                  <>
                    Login to Portal
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* ── Divider ── */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/[0.07]" />
              <span className="text-[0.7rem] font-medium text-[#967AA5]/50 tracking-[0.04em] uppercase">
                Secure Access
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between pt-5 border-t border-white/6">
              <div className="flex items-center gap-1.5 text-[0.72rem] text-[#967AA5]/50">
                <Shield size={12} />
                256-bit SSL encrypted
              </div>
              <span className="text-[0.7rem] text-[#967AA5]/40">
                © 2026 JNTU-GV
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;