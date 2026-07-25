import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, GraduationCap, Compass } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`sis-page-shell flex items-center justify-center px-4 py-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] sis-panel grid lg:grid-cols-[1fr_0.9fr]">
        <div className="p-8 lg:p-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] text-white">
              <Compass size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">Lost in the portal</p>
              <h1 className="text-2xl font-semibold text-[var(--primary)]">Page not found</h1>
            </div>
          </div>

          <div className={`mb-6 text-[5rem] font-semibold leading-none text-[var(--primary)] ${glitchActive ? 'scale-105' : ''}`}>
            404
          </div>
          <p className="max-w-xl text-base leading-7 text-[var(--on-surface-variant)]">
            The page you’re looking for may have moved or no longer exists. Use one of the quick links below to get back to the student information experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--primary-container)]">
              <Home size={16} /> Go home
            </button>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-4 py-2.5 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--surface-container-low)]">
              <ArrowLeft size={16} /> Go back
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="sis-accent-pill"><GraduationCap size={15} /> Student login</span>
            <span className="sis-accent-pill"><Search size={15} /> HOD portal</span>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <img src="/images/home.webp" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/80 via-[var(--primary)]/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-white/15 p-5 text-white backdrop-blur-md">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary-fixed)]">Need a hand?</p>
            <h2 className="mt-2 text-2xl font-semibold">The portal is still here — just follow the path back home.</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;