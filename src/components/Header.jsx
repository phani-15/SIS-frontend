import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home',        path: '/'          },
  { label: 'HOD',   path: '/hodboard'  },
  { label: 'administrators',  path: '/administrator' },
  { label: 'Admin',     path: '/admin'    },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {/* Desktop bar */}
      <div
        className="flex justify-between items-center h-16 mx-auto"
        style={{ maxWidth: '1280px', padding: '0 32px' }}
      >
        {/* Brand */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer border-none bg-transparent p-0"
        >
          <span
            className="material-symbols-outlined fill text-[28px]"
            style={{ color: 'var(--primary)' }}
          >
            school
          </span>
          <span
            className="text-[1.15rem] font-bold font-['Inter'] tracking-tight"
            style={{ color: 'var(--primary)' }}
          >
            Student Information System
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 h-full">
          {navLinks.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative px-3 py-1 text-sm font-medium transition-colors duration-200 cursor-pointer border-none bg-transparent rounded"
              style={{
                color: isActive(item.path)
                  ? 'var(--primary)'
                  : 'var(--on-surface-variant)',
                borderBottom: isActive(item.path)
                  ? '2px solid var(--primary)'
                  : '2px solid transparent',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop Sign In */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 text-sm font-semibold rounded-lg cursor-pointer border-none transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)',
            }}
          >
            Sign In
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg border-none bg-transparent cursor-pointer"
          style={{ color: 'var(--primary)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden flex flex-col px-4 pb-4 pt-2 gap-1 slide-down"
          style={{
            borderTop: '1px solid var(--outline-variant)',
            backgroundColor: 'var(--surface)',
          }}
        >
          {navLinks.map((item) => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setMobileOpen(false); }}
              className="text-left px-4 py-3 rounded-lg text-sm font-medium border-none cursor-pointer transition-colors"
              style={{
                color: isActive(item.path) ? 'var(--primary)' : 'var(--on-surface-variant)',
                backgroundColor: isActive(item.path) ? 'var(--surface-container)' : 'transparent',
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { navigate('/login'); setMobileOpen(false); }}
            className="mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold border-none cursor-pointer"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
          >
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
}