import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../core/auth';

export default function Login() {
  const [studentId, setStudentId]   = useState('1234567990');
  const [password,  setPassword]    = useState('misteran');
  const [isLoading, setIsLoading]   = useState(false);
  const [error,     setError]       = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!studentId.trim()) {
      setError('Please enter your Student ID.');
      return;
    }
    if (password.length < 4) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      await loginUser(studentId, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex-grow flex items-center justify-center relative overflow-hidden"
      style={{
        padding: '32px 16px',
        backgroundColor: 'var(--background)',
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute pointer-events-none -z-10 rounded-full"
        style={{
          top: '-10%', left: '-10%',
          width: '40%', height: '40%',
          backgroundColor: 'rgba(214, 227, 255, 0.3)',
          filter: 'blur(72px)',
        }}
      />
      <div
        className="absolute pointer-events-none -z-10 rounded-full"
        style={{
          bottom: '-10%', right: '-10%',
          width: '40%', height: '40%',
          backgroundColor: 'rgba(165, 239, 240, 0.2)',
          filter: 'blur(72px)',
        }}
      />

      {/* Two-column layout */}
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 items-center fade-in-up"
        style={{ maxWidth: '960px', gap: '48px' }}
      >
        {/* ── LEFT: Login form glass card ── */}
        <div
          className="glass-panel rounded-xl shadow-sm flex flex-col justify-center"
          style={{
            padding: '32px',
            minHeight: '440px',
            maxWidth: '460px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          {/* Brand header */}
          <div style={{ marginBottom: '24px' }}>
            <div className="flex items-center gap-3" style={{ marginBottom: '6px' }}>
              <span
                className="material-symbols-outlined fill text-[32px]"
                style={{ color: 'var(--primary)' }}
              >
                school
              </span>
              <h1
                className="font-['Inter'] font-semibold text-2xl m-0"
                style={{ color: 'var(--primary)' }}
              >
                Student Information System
              </h1>
            </div>
            <p className="text-sm m-0" style={{ color: 'var(--on-surface-variant)' }}>
              Welcome back. Please enter your credentials to access your dashboard.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="flex items-center gap-2 text-sm rounded-lg mb-4 px-3 py-2"
              style={{
                backgroundColor: 'var(--error-container)',
                color: 'var(--on-error-container)',
              }}
            >
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Student ID */}
            <div>
              <label
                htmlFor="student-id"
                className="block text-xs font-semibold mb-1"
                style={{ color: 'var(--on-surface)' }}
              >
                Student ID
              </label>
              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  style={{ paddingLeft: '12px' }}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: 'var(--outline-variant)' }}
                  >
                    badge
                  </span>
                </div>
                <input
                  id="student-id"
                  type="text"
                  placeholder="Enter your ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="block w-full text-sm rounded-lg transition-all"
                  style={{
                    paddingLeft: '44px',
                    paddingRight: '12px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    border: '1px solid var(--outline-variant)',
                    backgroundColor: 'var(--surface-container-lowest)',
                    color: 'var(--on-surface)',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 0 0 2px var(--primary)';
                    e.target.style.borderColor = 'var(--primary)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = 'var(--outline-variant)';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold no-underline hover:underline"
                  style={{ color: 'var(--primary)' }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  style={{ paddingLeft: '12px' }}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: 'var(--outline-variant)' }}
                  >
                    lock
                  </span>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full text-sm rounded-lg transition-all"
                  style={{
                    paddingLeft: '44px',
                    paddingRight: '12px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    border: '1px solid var(--outline-variant)',
                    backgroundColor: 'var(--surface-container-lowest)',
                    color: 'var(--on-surface)',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 0 0 2px var(--primary)';
                    e.target.style.borderColor = 'var(--primary)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = 'var(--outline-variant)';
                  }}
                />
              </div>
            </div>

            {/* Submit */}
            <div style={{ paddingTop: '4px' }}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-60"
                style={{
                  padding: '10px 24px',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)',
                  border: 'none',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer link */}
          <div
            className="text-center mt-6 pt-5"
            style={{ borderTop: '1px solid rgba(196, 198, 207, 0.3)' }}
          >
            <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
              Need help accessing your account?{' '}
              <a
                href="#"
                className="font-medium hover:underline no-underline"
                style={{ color: 'var(--primary)' }}
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* ── RIGHT: Illustration ── */}
        <div className="hidden md:flex justify-center items-center">
          <div
            className="relative w-full"
            style={{ maxWidth: '420px' }}
          >
            <video 
              src="/vids/Login.mp4"
              autoPlay loop muted
              className="rounded-xl shadow-lg"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
}